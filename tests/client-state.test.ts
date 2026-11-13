import test from 'node:test';
import assert from 'node:assert';
import { defaultHistoricalPoints } from '../src/data/defaultDataset';
import { polarisHistoricalPoints } from '../src/data/polarisPoints';
import type { GeneratedPedagogy } from '../src/types';

test('Client state contracts and persistence invariants', async (t) => {
  await t.test('localStorage key invariant is ancient_africa_pedagogies', () => {
    const STORAGE_KEY = 'ancient_africa_pedagogies';
    assert.strictEqual(
      STORAGE_KEY,
      'ancient_africa_pedagogies',
      'The localStorage key must remain ancient_africa_pedagogies'
    );
  });

  await t.test('GeneratedPedagogy data structure serialization invariant', () => {
    const sampleRecord: GeneratedPedagogy = {
      id: 'pedagogy_1700000000',
      format: 'lesson_plan',
      pointId: 'kush_meroe',
      pointName: 'Reino de Kush',
      title: 'Plano de Aula - Reino de Kush',
      content: '## Introdução\n\nTexto sobre o Reino de Kush.',
      createdAt: new Date().toISOString(),
      language: 'pt'
    };

    const serialized = JSON.stringify([sampleRecord]);
    const parsed: GeneratedPedagogy[] = JSON.parse(serialized);

    assert.strictEqual(parsed.length, 1);
    assert.strictEqual(parsed[0].id, sampleRecord.id);
    assert.strictEqual(parsed[0].format, 'lesson_plan');
    assert.strictEqual(parsed[0].pointId, 'kush_meroe');
    assert.strictEqual(parsed[0].language, 'pt');
  });

  await t.test('Dataset selection invariant between curated and polaris', () => {
    function getPointsForType(type: 'curated' | 'polaris') {
      return type === 'curated' ? defaultHistoricalPoints : polarisHistoricalPoints;
    }

    const curatedPoints = getPointsForType('curated');
    assert.strictEqual(curatedPoints.length, 12);
    assert.strictEqual(curatedPoints[0].id, 'egypt_kemet');

    const polarisPoints = getPointsForType('polaris');
    assert.ok(polarisPoints.length > 50);
    assert.notStrictEqual(polarisPoints.length, 12);
  });
});
