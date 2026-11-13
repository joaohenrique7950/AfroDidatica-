
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
    // Characterized limitation: "c." prefix causes numeric extraction to fail
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

    // kush_meroe config: startYear: -2500, peakStartYear: -750,
    // peakEndYear: 350, endYear: 400, maxRadius: 52

    // 1. Outside timeline range before start
    const beforeResult = getEmpireStrength(kush, -3000);
    assert.strictEqual(beforeResult.strength, 0);
    assert.strictEqual(beforeResult.r, 0);

    // 2. Growth ramp: midpoint between -2500 and -750 is -1625
    const rampResult = getEmpireStrength(kush, -1625);
    assert.strictEqual(rampResult.strength, 0.5);

    // r = 52 * (0.35 + 0.65 * 0.5) = 35.1
    assert.strictEqual(Math.round(rampResult.r * 10) / 10, 35.1);

    // 3. Peak plateau
    const peakResult = getEmpireStrength(kush, 0);
    assert.strictEqual(peakResult.strength, 1);
    assert.strictEqual(peakResult.r, 52);

    // 4. Decay ramp
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
    // peakStart = -825, peakEnd = -675.
    // At year -750: strength = 1, r = 30
    const result = getEmpireStrength(mockPoint, -750);
    assert.strictEqual(result.strength, 1);
    assert.strictEqual(result.r, 30);
    assert.strictEqual(result.color, '#c5a880');
  });

  await t.test('pointMatchesOverlay supports exact defined overlay identifiers', () => {
    const kush = defaultHistoricalPoints.find(p => p.id === 'kush_meroe')!;
    const kemet = defaultHistoricalPoints.find(p => p.id === 'egypt_kemet')!;

    assert.strictEqual(pointMatchesOverlay(kush, 'metallurgy'), true, 'Kush matches metallurgy');
    assert.strictEqual(pointMatchesOverlay(kush, 'matriarchy'), true, 'Kush matches matriarchy');
    assert.strictEqual(pointMatchesOverlay(kemet, 'writing_systems'), true, 'Kemet matches writing_systems');
    assert.strictEqual(pointMatchesOverlay(kemet, 'hydraulic_agriculture'), true, 'Kemet matches hydraulic_agriculture');

    // Negative / unsupported overlay check
    assert.strictEqual(pointMatchesOverlay(kush, 'unknown_overlay_id'), false, 'Unknown overlay must return false');
  });

  // NEW: Trade and Currency overlay regression tests
  await t.test('trade_currency overlay regression', () => {
    const mali = defaultHistoricalPoints.find(p => p.id === 'mali_empire');
    assert.ok(mali, 'mali_empire must exist in default points');

    // Positive: match by known historical entity ID
    assert.strictEqual(
      pointMatchesOverlay(mali, 'trade_currency'),
      true,
      'Mali Empire must match trade_currency by ID'
    );

    // Positive: match by trade-related description
    const tradePoint: HistoricalPoint = {
      ...mali,
      id: 'test_trade_point',
      description: {
        pt: 'Rota comercial',
        en: 'Trade route'
      }
    };

    assert.strictEqual(
      pointMatchesOverlay(tradePoint, 'trade_currency'),
      true,
      'Trade-related description must match trade_currency'
    );

    // Negative: no matching ID or trade-related keywords
    const neutralPoint: HistoricalPoint = {
      ...mali,
      id: 'test_neutral_point',
      description: {
        pt: 'Local histórico',
        en: 'Historical site'
      }
    };

    assert.strictEqual(
      pointMatchesOverlay(neutralPoint, 'trade_currency'),
      false,
      'Unrelated historical point must not match trade_currency'
    );
  });

  //Monumental Architecture overlay regression tests
  await t.test('monumental_architecture overlay regression', () => {
    const zimbabwe = defaultHistoricalPoints.find(p => p.id === 'great_zimbabwe');
    assert.ok(zimbabwe, 'great_zimbabwe must exist in default points');

    // Positive: match by known historical entity ID
    assert.strictEqual(
      pointMatchesOverlay(zimbabwe, 'monumental_architecture'),
      true,
      'Great Zimbabwe must match monumental_architecture by ID'
    );

    // Positive: match by architecture-related description
    const architecturePoint: HistoricalPoint = {
      ...zimbabwe,
      id: 'test_architecture_point',
      description: {
        pt: 'Construção em pedra',
        en: 'Stone construction'
      }
    };

    assert.strictEqual(
      pointMatchesOverlay(architecturePoint, 'monumental_architecture'),
      true,
      'Architecture-related description must match monumental_architecture'
    );

    // Negative: no matching ID or architecture-related keywords
    const neutralPoint: HistoricalPoint = {
      ...zimbabwe,
      id: 'test_neutral_point',
      description: {
        pt: 'Local histórico',
        en: 'Historical site'
      }
    };

    assert.strictEqual(
      pointMatchesOverlay(neutralPoint, 'monumental_architecture'),
      false,
      'Unrelated historical point must not match monumental_architecture'
    );
  });
});
