import test from 'node:test';
import assert from 'node:assert';
import { parsePeriodToYears, getEmpireStrength, pointMatchesOverlay } from '../src/components/InteractiveMap';
import { defaultHistoricalPoints } from '../src/data/defaultDataset';
import { HistoricalPoint } from '../src/types';

test('InteractiveMap - Mathematical and period transforms characterization', async (t) => {
  await t.test('parsePeriodToYears correctly parses standard historical date ranges', () => {
    // BCE range
    const bceResult = parsePeriodToYears('3000 BCE - 30 BCE');
    assert.strictEqual(bceResult.startYear, -3000);
    assert.strictEqual(bceResult.endYear, -30);

    // CE range
    const ceResult = parsePeriodToYears('100 CE - 940 CE');
    assert.strictEqual(ceResult.startYear, 100);
    assert.strictEqual(ceResult.endYear, 940);

    // Cross-era range (BCE to CE)
    const crossResult = parsePeriodToYears('300 BCE - 100 CE');
    assert.strictEqual(crossResult.startYear, -300);
    assert.strictEqual(crossResult.endYear, 100);

    // Inverted ordering auto-reversal
    const invertedResult = parsePeriodToYears('30 BCE - 3000 BCE');
    assert.strictEqual(invertedResult.startYear, -3000);
    assert.strictEqual(invertedResult.endYear, -30);
  });

  await t.test('parsePeriodToYears characterized behavior for prefixes and edge cases', () => {
    // Characterized limitation: "c." prefix causes numeric extraction to fail on start part
    const circaResult = parsePeriodToYears('c. 100 CE - 940 CE');
    assert.strictEqual(circaResult.startYear, 0, 'Characterized behavior: "c." prefix parses to 0');
    assert.strictEqual(circaResult.endYear, 940);

    // Non-range single strings return 0, 0
    const singleResult = parsePeriodToYears('Single Year Only');
    assert.strictEqual(singleResult.startYear, 0);
    assert.strictEqual(singleResult.endYear, 0);

    // Empty string returns 0, 0
    const emptyResult = parsePeriodToYears('');
    assert.strictEqual(emptyResult.startYear, 0);
    assert.strictEqual(emptyResult.endYear, 0);
  });

  await t.test('getEmpireStrength calculation for configured empire (kush_meroe)', () => {
    const kush = defaultHistoricalPoints.find(p => p.id === 'kush_meroe');
    assert.ok(kush, 'kush_meroe must exist in default points');

    // kush_meroe config: startYear: -2500, peakStartYear: -750, peakEndYear: 350, endYear: 400, maxRadius: 52
    // 1. Outside timeline range before start
    const beforeResult = getEmpireStrength(kush, -3000);
    assert.strictEqual(beforeResult.strength, 0);
    assert.strictEqual(beforeResult.r, 0);

    // 2. Growth ramp: midpoint between -2500 and -750 is -1625
    const rampResult = getEmpireStrength(kush, -1625);
    assert.strictEqual(rampResult.strength, 0.5);
    // r = maxRadius * (0.35 + 0.65 * 0.5) = 52 * 0.675 = 35.1
    assert.strictEqual(Math.round(rampResult.r * 10) / 10, 35.1);

    // 3. Peak plateau (year 0, within [-750, 350])
    const peakResult = getEmpireStrength(kush, 0);
    assert.strictEqual(peakResult.strength, 1);
    assert.strictEqual(peakResult.r, 52);

    // 4. Decay ramp: midpoint between 350 and 400 is 375
    const decayResult = getEmpireStrength(kush, 375);
    assert.strictEqual(decayResult.strength, 0.5);
    assert.strictEqual(Math.round(decayResult.r * 10) / 10, 35.1);

    // 5. Outside timeline range after end
    const afterResult = getEmpireStrength(kush, 500);
    assert.strictEqual(afterResult.strength, 0);
    assert.strictEqual(afterResult.r, 0);
  });

  await t.test('getEmpireStrength fallback for unconfigured point', () => {
    const mockPoint: HistoricalPoint = {
      id: 'mock_unconfigured',
      name: { pt: 'Teste', en: 'Test' },
      region: 'west_africa',
      regionLabel: { pt: 'África Ocidental', en: 'West Africa' },
      era: 'antiquity',
      eraLabel: { pt: 'Antiguidade', en: 'Antiquity' },
      coordinates: { x: 50, y: 50 },
      period: { en: '1000 BCE - 500 BCE', pt: '1000 a.C. - 500 a.C.' },
      description: { pt: 'Descrição', en: 'Description' },
      primaryDocuments: [],
      bibliography: []
    };

    // start: -1000, end: -500. Range: 500.
    // peakStart = -1000 + 500 * 0.35 = -825.
    // peakEnd = -1000 + 500 * 0.65 = -675.
    // At year -750 (midpoint plateau): strength = 1, r = 30 (default maxRadius)
    const result = getEmpireStrength(mockPoint, -750);
    assert.strictEqual(result.strength, 1);
    assert.strictEqual(result.r, 30);
    assert.strictEqual(result.color, '#c5a880'); // antiquity color
  });

  await t.test('pointMatchesOverlay supports exact defined overlay identifiers', () => {
    const kush = defaultHistoricalPoints.find(p => p.id === 'kush_meroe')!;
    const kemet = defaultHistoricalPoints.find(p => p.id === 'egypt_kemet')!;

    // Supported overlay IDs:
    assert.strictEqual(pointMatchesOverlay(kush, 'metallurgy'), true, 'Kush matches metallurgy');
    assert.strictEqual(pointMatchesOverlay(kush, 'matriarchy'), true, 'Kush matches matriarchy');
    assert.strictEqual(pointMatchesOverlay(kemet, 'writing_systems'), true, 'Kemet matches writing_systems');
    assert.strictEqual(pointMatchesOverlay(kemet, 'hydraulic_agriculture'), true, 'Kemet matches hydraulic_agriculture');

    // Negative / unsupported overlay check
    assert.strictEqual(pointMatchesOverlay(kush, 'unknown_overlay_id'), false, 'Unknown overlay must return false');
  });
});
