process.env.NODE_ENV = 'test';
import test from 'node:test';
import assert from 'node:assert';
import { app, __setAiClientForTesting } from '../server';
import type { Server } from 'node:http';

let server: Server;
let baseUrl: string;

test.before(async () => {
  // Listen on ephemeral port (0) so tests never collide with port 3000
  await new Promise<void>((resolve) => {
    server = app.listen(0, '127.0.0.1', () => {
      const address = server.address();
      if (address && typeof address === 'object') {
        baseUrl = `http://127.0.0.1:${address.port}`;
      }
      resolve();
    });
  });
});

test.after(async () => {
  __setAiClientForTesting(null);
  await new Promise<void>((resolve, reject) => {
    server.close((err) => (err ? reject(err) : resolve()));
  });
});

test('HTTP API Contracts for Gemini Endpoints', async (t) => {
  await t.test('POST /api/gemini/generate-pedagogy returns 400 when missing required parameters', async () => {
    const res = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(res.status, 400);
    const body = (await res.json()) as { error?: string };
    assert.strictEqual(body.error, 'Missing required parameters (language, pointName, format).');
  });

  await t.test('POST /api/gemini/generate-pedagogy returns 400 on invalid language code', async () => {
    const res = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'invalid_code!!!',
        pointName: 'Mali Empire',
        format: 'lesson_plan'
      })
    });
    assert.strictEqual(res.status, 400);
    const body = (await res.json()) as { error?: string };
    assert.strictEqual(body.error, 'Invalid language code.');
  });

  await t.test('POST /api/gemini/generate-quiz returns 400 when missing required parameters', async () => {
    const res = await fetch(`${baseUrl}/api/gemini/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({})
    });
    assert.strictEqual(res.status, 400);
    const body = (await res.json()) as { error?: string };
    assert.strictEqual(body.error, 'Missing required parameters (language, pointName).');
  });

  await t.test('POST /api/gemini/generate-quiz returns 400 on invalid language code', async () => {
    const res = await fetch(`${baseUrl}/api/gemini/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: '999',
        pointName: 'Mali Empire'
      })
    });
    assert.strictEqual(res.status, 400);
    const body = (await res.json()) as { error?: string };
    assert.strictEqual(body.error, 'Invalid language code.');
  });

  await t.test('GET /api/gemini/generate-pedagogy returns 404 (method not allowed)', async () => {
    const res = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, { method: 'GET' });
    assert.strictEqual(res.status, 404);
  });

  await t.test('POST /api/gemini/generate-pedagogy handles missing API key cleanly', async () => {
    __setAiClientForTesting(null);
    const originalKey = process.env.GEMINI_API_KEY;
    delete process.env.GEMINI_API_KEY;
    try {
      const res = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language: 'pt',
          pointName: 'Reino de Kush',
          format: 'lesson_plan'
        })
      });
      assert.strictEqual(res.status, 500);
      const body = (await res.json()) as { error?: string };
      assert.ok(body.error && body.error.includes('GEMINI_API_KEY'));
    } finally {
      if (originalKey) {
        process.env.GEMINI_API_KEY = originalKey;
      }
    }
  });

  await t.test('POST /api/gemini/generate-pedagogy returns valid response contract with mock', async () => {
    const mockOutput = '## Plano de Aula - Reino de Kush\n\nConteúdo didático estruturado.';
    __setAiClientForTesting({
      models: {
        generateContent: async () => ({ text: mockOutput })
      }
    });

    const res = await fetch(`${baseUrl}/api/gemini/generate-pedagogy`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'pt',
        pointName: 'Reino de Kush',
        format: 'lesson_plan',
        eraLabel: 'Antiguidade',
        regionLabel: 'Vale do Nilo',
        period: '1070 AEC - 350 EC',
        description: 'Reino africano soberano na Núbia',
        gradeLevel: 'middle',
        curriculum: 'História'
      })
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as { title?: string; text?: string; htmlContent?: string };
    assert.ok(body.title && body.title.includes('Reino de Kush'));
    assert.strictEqual(body.text, mockOutput);
    assert.strictEqual(body.htmlContent, mockOutput);
  });

  await t.test('POST /api/gemini/generate-quiz returns valid response contract with mock', async () => {
    const mockQuestions = [
      {
        question: 'Qual era uma das principais inovações do Reino de Kush?',
        options: ['Metalurgia do ferro', 'Pólvora', 'Construção em gelo', 'Moinhos a vapor'],
        answerIndex: 0,
        explanation: 'Kush foi um dos maiores centros de metalurgia e fundição de ferro da África Antiga.'
      }
    ];

    __setAiClientForTesting({
      models: {
        generateContent: async () => ({ text: JSON.stringify(mockQuestions) })
      }
    });

    const res = await fetch(`${baseUrl}/api/gemini/generate-quiz`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        language: 'pt',
        pointName: 'Reino de Kush',
        description: 'Reino soberano na Núbia',
        gradeLevel: 'middle'
      })
    });

    assert.strictEqual(res.status, 200);
    const body = (await res.json()) as { questions?: any[] };
    assert.ok(Array.isArray(body.questions));
    assert.strictEqual(body.questions.length, 1);
    assert.strictEqual(body.questions[0].answerIndex, 0);
  });
});
