import test from 'node:test';
import assert from 'node:assert';
import { defaultHistoricalPoints } from '../src/data/defaultDataset';
import { polarisHistoricalPoints } from '../src/data/polarisPoints';
import { getLonLat } from '../src/components/InteractiveMap';

test('Data structural invariants and mathematical transforms', async (t) => {
  await t.test('defaultHistoricalPoints has exactly 12 top-level entities', () => {
    assert.strictEqual(defaultHistoricalPoints.length, 12, 'Curated dataset must contain exactly 12 entities');
  });

  await t.test('defaultHistoricalPoints entities have valid fields and coordinate bounds', () => {
    const validEras = new Set(['pre_bronze', 'antiquity', 'classical_era']);
    const validRegions = new Set([
      'nile_valley',
      'horn_of_africa',
      'west_africa',
      'north_africa',
      'central_sahara',
      'custom'
    ]);

    for (const point of defaultHistoricalPoints) {
      assert.ok(point.id && typeof point.id === 'string', `Invalid ID on point ${JSON.stringify(point)}`);
      assert.ok(point.name && point.name.pt && point.name.en, `Missing bilingual name on point ${point.id}`);
      assert.ok(validEras.has(point.era), `Invalid era ${point.era} on point ${point.id}`);
      assert.ok(validRegions.has(point.region), `Invalid region ${point.region} on point ${point.id}`);
      assert.ok(point.period && (point.period.pt || point.period.en), `Missing period on point ${point.id}`);

      // Coordinates must be valid percentages between 0 and 100
      assert.ok(
        point.coordinates.x >= 0 && point.coordinates.x <= 100,
        `Coordinate X out of bounds (0-100) on point ${point.id}: ${point.coordinates.x}`
      );
      assert.ok(
        point.coordinates.y >= 0 && point.coordinates.y <= 100,
        `Coordinate Y out of bounds (0-100) on point ${point.id}: ${point.coordinates.y}`
      );

      assert.ok(Array.isArray(point.primaryDocuments), `primaryDocuments must be an array on point ${point.id}`);
      assert.ok(Array.isArray(point.bibliography), `bibliography must be an array on point ${point.id}`);
    }
  });

  await t.test('polarisHistoricalPoints is populated with valid structural entities', () => {
    assert.ok(polarisHistoricalPoints.length > 50, 'Polaris dataset should contain more than 50 historical points');
    for (const point of polarisHistoricalPoints) {
      assert.ok(point.id, 'Polaris point must have an id');
      assert.ok(
        point.coordinates.x >= 0 && point.coordinates.x <= 100,
        `Polaris coordinate X out of bounds on ${point.id}`
      );
      assert.ok(
        point.coordinates.y >= 0 && point.coordinates.y <= 100,
        `Polaris coordinate Y out of bounds on ${point.id}`
      );
    }
  });

  await t.test('InteractiveMap getLonLat calculation invariants', () => {
    // getLonLat(x, y) formula: lon = 0.97 * x - 27.4, lat = -0.864 * y + 45.4
    const [lon0, lat0] = getLonLat(0, 0);
    assert.strictEqual(Math.round(lon0 * 10) / 10, -27.4);
    assert.strictEqual(Math.round(lat0 * 10) / 10, 45.4);

    const [lon100, lat100] = getLonLat(100, 100);
    assert.strictEqual(Math.round(lon100 * 10) / 10, 69.6);
    assert.strictEqual(Math.round(lat100 * 10) / 10, -41.0);

    const [lonMid, latMid] = getLonLat(50, 50);
    assert.strictEqual(Math.round(lonMid * 10) / 10, 21.1);
    assert.strictEqual(Math.round(latMid * 10) / 10, 2.2);
  });
});
