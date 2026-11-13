import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

test('Build artifacts presence and integrity', async (t) => {
  const distDir = path.resolve(process.cwd(), 'dist');
  const serverPath = path.join(distDir, 'server.cjs');

  // If dist or server.cjs does not exist, build cleanly to guarantee test self-sufficiency
  if (!fs.existsSync(distDir) || !fs.existsSync(serverPath)) {
    execSync('npm run build', { stdio: 'pipe' });
  }

  assert.ok(fs.existsSync(distDir), 'dist/ directory must exist');

  await t.test('dist/index.html exists and is well-formed', () => {
    const indexPath = path.join(distDir, 'index.html');
    assert.ok(fs.existsSync(indexPath), 'dist/index.html must exist');
    const content = fs.readFileSync(indexPath, 'utf-8');
    assert.ok(content.includes('<div id="root">'), 'index.html must contain root element');
    assert.ok(content.includes('AfroDidática'), 'index.html must contain page title');
  });

  await t.test('dist/server.cjs exists and does not statically require vite', () => {
    const serverPath = path.join(distDir, 'server.cjs');
    assert.ok(fs.existsSync(serverPath), 'dist/server.cjs must exist');
    const content = fs.readFileSync(serverPath, 'utf-8');
    // Ensure require("vite") does not exist at top level
    assert.strictEqual(
      content.includes('require("vite")') || content.includes("require('vite')"),
      false,
      'dist/server.cjs must not contain static require("vite")'
    );
  });

  await t.test('dist/assets contains compiled CSS and JS assets', () => {
    const assetsDir = path.join(distDir, 'assets');
    assert.ok(fs.existsSync(assetsDir), 'dist/assets directory must exist');
    const files = fs.readdirSync(assetsDir);
    const cssFiles = files.filter((f) => f.endsWith('.css'));
    const jsFiles = files.filter((f) => f.endsWith('.js'));

    assert.ok(cssFiles.length >= 1, 'At least one compiled CSS file must exist');
    assert.ok(jsFiles.length >= 1, 'At least one compiled JS file must exist');
  });
});
