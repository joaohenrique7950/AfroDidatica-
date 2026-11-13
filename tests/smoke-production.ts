import net from 'node:net';
import path from 'node:path';
import fs from 'node:fs';
import { spawn, execSync, ChildProcess } from 'node:child_process';

interface ServerInstance {
  child: ChildProcess;
  port: number;
  stdout: string[];
  stderr: string[];
}

// Pre-allocate an available free ephemeral TCP port
async function getFreePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.on('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const address = server.address() as net.AddressInfo;
      const port = address.port;
      server.close((err) => {
        if (err) return reject(err);
        resolve(port);
      });
    });
  });
}

// Cross-platform process termination helper (SIGTERM -> SIGKILL / taskkill fallback)
async function terminateProcess(child: ChildProcess): Promise<void> {
  if (child.exitCode !== null) return;

  return new Promise<void>((resolve) => {
    const pid = child.pid;
    if (!pid) return resolve();

    let resolved = false;
    const safeResolve = () => {
      if (!resolved) {
        resolved = true;
        resolve();
      }
    };

    const killTimeout = setTimeout(() => {
      if (child.exitCode === null) {
        if (process.platform === 'win32') {
          try {
            execSync(`taskkill /pid ${pid} /T /F`, { stdio: 'ignore' });
          } catch {
            // Process may have already exited
          }
        } else {
          try {
            child.kill('SIGKILL');
          } catch {
            // Ignore kill errors
          }
        }
      }
      safeResolve();
    }, 1500);

    child.once('exit', () => {
      clearTimeout(killTimeout);
      safeResolve();
    });

    try {
      child.kill('SIGTERM');
    } catch {
      safeResolve();
    }
  });
}

// Spawn server with retry loop to resolve potential free-port race conditions
async function startServerWithRetry(maxAttempts = 3): Promise<ServerInstance> {
  const distServerPath = path.resolve(process.cwd(), 'dist', 'server.cjs');
  if (!fs.existsSync(distServerPath)) {
    throw new Error(`Compiled server bundle not found at ${distServerPath}. Did you run 'npm run build'?`);
  }

  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const port = await getFreePort();
    const stdoutLogs: string[] = [];
    const stderrLogs: string[] = [];

    const child = spawn(process.execPath, [distServerPath], {
      cwd: process.cwd(),
      env: {
        ...process.env,
        NODE_ENV: 'production',
        PORT: String(port)
      },
      stdio: ['ignore', 'pipe', 'pipe']
    });

    child.stdout?.on('data', (data) => stdoutLogs.push(data.toString()));
    child.stderr?.on('data', (data) => stderrLogs.push(data.toString()));

    let earlyExit = false;
    let exitCode: number | null = null;
    const exitListener = (code: number | null) => {
      earlyExit = true;
      exitCode = code;
    };
    child.once('exit', exitListener);

    try {
      await waitForServerReady(port, child, () => earlyExit, () => exitCode, stderrLogs);
      child.removeListener('exit', exitListener);
      return { child, port, stdout: stdoutLogs, stderr: stderrLogs };
    } catch (err) {
      await terminateProcess(child);
      if (attempt === maxAttempts) {
        throw new Error(
          `Failed to start production server after ${maxAttempts} attempts. Last error: ${
            err instanceof Error ? err.message : String(err)
          }\nCaptured stderr:\n${stderrLogs.join('')}`
        );
      }
      console.warn(`[SMOKE] Port ${port} failed on attempt ${attempt}. Retrying with a new port...`);
      await new Promise((r) => setTimeout(r, 500));
    }
  }

  throw new Error('Unexpected termination of startServerWithRetry loop.');
}

// Poll readiness endpoint with timeout and early crash detection
async function waitForServerReady(
  port: number,
  child: ChildProcess,
  isEarlyExit: () => boolean,
  getExitCode: () => number | null,
  stderrLogs: string[],
  timeoutMs = 15000
): Promise<void> {
  const start = Date.now();
  const url = `http://127.0.0.1:${port}/`;

  while (Date.now() - start < timeoutMs) {
    if (isEarlyExit() || child.exitCode !== null) {
      throw new Error(
        `Server process exited prematurely with code ${getExitCode() ?? child.exitCode}.\nStderr:\n${stderrLogs.join('')}`
      );
    }

    try {
      const res = await fetch(url);
      if (res.status === 200) {
        return;
      }
    } catch {
      // Server not ready yet; wait and poll again
    }

    await new Promise((r) => setTimeout(r, 150));
  }

  throw new Error(`Timed out waiting for production server to respond on ${url} within ${timeoutMs}ms.`);
}

// Main smoke test execution
async function runSmokeTest(): Promise<void> {
  console.log('--- AfroDidática Production HTTP Smoke Test ---');
  let instance: ServerInstance | null = null;

  // Global safety hook to terminate child on unexpected test runner termination
  const cleanup = async () => {
    if (instance) {
      await terminateProcess(instance.child);
      instance = null;
    }
  };
  process.on('SIGINT', cleanup);
  process.on('SIGTERM', cleanup);

  try {
    console.log('[SMOKE] Starting compiled server from dist/server.cjs...');
    instance = await startServerWithRetry();
    const { port, child } = instance;
    const baseUrl = `http://127.0.0.1:${port}`;
    console.log(`[SMOKE] Server confirmed responsive at ${baseUrl} (PID: ${child.pid})`);

    // 1. Root SPA HTML verification
    console.log('[SMOKE] Verifying GET / (Root SPA HTML)...');
    const rootRes = await fetch(`${baseUrl}/`);
    if (rootRes.status !== 200) {
      throw new Error(`Expected GET / to return 200, received ${rootRes.status}`);
    }
    const contentType = rootRes.headers.get('content-type') || '';
    if (!contentType.includes('text/html')) {
      throw new Error(`Expected text/html content-type for /, received "${contentType}"`);
    }
    const htmlBody = await rootRes.text();
    if (!htmlBody.includes('<div id="root">')) {
      throw new Error('GET / HTML body missing <div id="root"> mount point.');
    }
    if (!htmlBody.includes('AfroDidática')) {
      throw new Error('GET / HTML body missing expected AfroDidática page title.');
    }
    console.log('[SMOKE] PASS: GET / returns 200 OK with valid SPA HTML');

    // 2. Dynamic Asset Discovery & Verification from index.html references
    console.log('[SMOKE] Dynamically parsing asset references from HTML response...');
    const distPath = path.resolve(process.cwd(), 'dist');
    const scriptSrcMatches = Array.from(htmlBody.matchAll(/<script[^>]+src="([^">]+)"/gi)).map((m) => m[1]);
    const cssHrefMatches = Array.from(htmlBody.matchAll(/<link[^>]+href="([^">]+)"[^>]*rel="stylesheet"/gi)).map(
      (m) => m[1]
    );
    const altCssMatches = Array.from(htmlBody.matchAll(/<link[^>]+rel="stylesheet"[^>]*href="([^">]+)"/gi)).map(
      (m) => m[1]
    );
    const allCssMatches = Array.from(new Set([...cssHrefMatches, ...altCssMatches]));

    if (scriptSrcMatches.length === 0) {
      throw new Error('No <script src="..."> references found in SPA index.html.');
    }
    if (allCssMatches.length === 0) {
      throw new Error('No <link rel="stylesheet"> references found in SPA index.html.');
    }

    // Verify scripts referenced in HTML
    for (const scriptUrl of scriptSrcMatches) {
      const assetPath = path.join(distPath, scriptUrl.replace(/^\//, ''));
      if (!fs.existsSync(assetPath)) {
        throw new Error(`Referenced script asset does not exist on disk: ${assetPath}`);
      }
      const assetRes = await fetch(`${baseUrl}${scriptUrl}`);
      if (assetRes.status !== 200) {
        throw new Error(`Expected 200 for ${scriptUrl}, received ${assetRes.status}`);
      }
      const assetType = assetRes.headers.get('content-type') || '';
      if (!assetType.includes('javascript')) {
        throw new Error(`Expected javascript content-type for ${scriptUrl}, received "${assetType}"`);
      }
      const assetBody = await assetRes.text();
      if (assetBody.length === 0) {
        throw new Error(`Asset payload is empty for ${scriptUrl}`);
      }
      console.log(`[SMOKE] PASS: Script asset "${scriptUrl}" (${assetBody.length} bytes, ${assetType})`);
    }

    // Verify stylesheets referenced in HTML
    for (const cssUrl of allCssMatches) {
      const assetPath = path.join(distPath, cssUrl.replace(/^\//, ''));
      if (!fs.existsSync(assetPath)) {
        throw new Error(`Referenced stylesheet does not exist on disk: ${assetPath}`);
      }
      const assetRes = await fetch(`${baseUrl}${cssUrl}`);
      if (assetRes.status !== 200) {
        throw new Error(`Expected 200 for ${cssUrl}, received ${assetRes.status}`);
      }
      const assetType = assetRes.headers.get('content-type') || '';
      if (!assetType.includes('text/css')) {
        throw new Error(`Expected text/css content-type for ${cssUrl}, received "${assetType}"`);
      }
      const assetBody = await assetRes.text();
      if (assetBody.length === 0) {
        throw new Error(`Asset payload is empty for ${cssUrl}`);
      }
      console.log(`[SMOKE] PASS: Stylesheet "${cssUrl}" (${assetBody.length} bytes, ${assetType})`);
    }

    // 3. API Contract Validation: Pedagogy Generator (Empty payload -> 400 Bad Request)
    console.log('[SMOKE] Verifying POST /api/gemini/generate-pedagogy input validation contract...');
    const pedagogyRes = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (pedagogyRes.status !== 400) {
      throw new Error(`Expected POST /api/gemini/generate-pedagogy to return 400, got ${pedagogyRes.status}`);
    }
    const pedagogyJson = (await pedagogyRes.json()) as { error?: string };
    const expectedPedagogyError = 'Missing required parameters (language, pointName, format).';
    if (pedagogyJson.error !== expectedPedagogyError) {
      throw new Error(
        `Expected pedagogy validation error "${expectedPedagogyError}", received "${pedagogyJson.error}"`
      );
    }
    console.log('[SMOKE] PASS: POST /api/gemini/generate-pedagogy validation returns 400 with expected error message');

    // 4. API Contract Validation: Quiz Generator (Empty payload -> 400 Bad Request)
    console.log('[SMOKE] Verifying POST /api/gemini/generate-quiz input validation contract...');
    const quizRes = await fetch(`${baseUrl}/api/gemini/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    if (quizRes.status !== 400) {
      throw new Error(`Expected POST /api/gemini/generate-quiz to return 400, got ${quizRes.status}`);
    }
    const quizJson = (await quizRes.json()) as { error?: string };
    const expectedQuizError = 'Missing required parameters (language, pointName).';
    if (quizJson.error !== expectedQuizError) {
      throw new Error(`Expected quiz validation error "${expectedQuizError}", received "${quizJson.error}"`);
    }
    console.log('[SMOKE] PASS: POST /api/gemini/generate-quiz validation returns 400 with expected error message');

    // 5. API Contract Validation: Invalid language code guards
    console.log('[SMOKE] Verifying language code validation guards on API endpoints...');
    const invalidLangRes = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ language: 'invalid-lang-code', pointName: 'Kush', format: 'activity' })
    });
    if (invalidLangRes.status !== 400) {
      throw new Error(`Expected 400 for invalid language code, got ${invalidLangRes.status}`);
    }
    const invalidLangJson = (await invalidLangRes.json()) as { error?: string };
    if (invalidLangJson.error !== 'Invalid language code.') {
      throw new Error(`Expected "Invalid language code.", received "${invalidLangJson.error}"`);
    }
    console.log('[SMOKE] PASS: Invalid language code rejected with 400 Bad Request');

    console.log('[SMOKE] All production HTTP smoke assertions PASSED.');
  } finally {
    if (instance) {
      console.log(`[SMOKE] Gracefully shutting down production server PID ${instance.child.pid}...`);
      await terminateProcess(instance.child);
      console.log('[SMOKE] Server process cleanup confirmed.');
    }
    process.removeListener('SIGINT', cleanup);
    process.removeListener('SIGTERM', cleanup);
  }
}

// Execute smoke test
runSmokeTest()
  .then(() => {
    console.log('[SMOKE] Production HTTP smoke test completed successfully.');
    process.exit(0);
  })
  .catch((err) => {
    console.error('[SMOKE] FAILED:', err);
    process.exit(1);
  });
