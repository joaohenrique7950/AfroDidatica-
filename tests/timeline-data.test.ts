import test from 'node:test';
import assert from 'node:assert';
import crypto from 'node:crypto';
import { parallelPeriods } from '../src/components/ParallelTimeline';

// Canonical content hash of the untouched parallelPeriods dataset
const EXPECTED_TIMELINE_JSON_HASH = '26046E12BC6B7384AB44A072BCA4E21F809BD3AA05E705A1DB351D821BFCACA6';
const EXPECTED_PERIOD_YEARS = [-3000, -2000, -1000, -300, 300, 900, 1300];
const REQUIRED_LANGUAGES = ['pt', 'en', 'fr', 'es'] as const;

test('ParallelTimeline - Domain dataset integrity and narrative preservation', async (t) => {
  await t.test('parallelPeriods contains exactly 7 chronological anchor periods in ascending order', () => {
    assert.strictEqual(parallelPeriods.length, 7, 'Timeline must contain exactly 7 periods');
    const actualYears = parallelPeriods.map(p => p.year);
    assert.deepStrictEqual(actualYears, EXPECTED_PERIOD_YEARS, 'Timeline years must match canonical chronological sequence');
  });

  await t.test('parallelPeriods matches canonical serialized content hash (regression invariant)', () => {
    const serialized = JSON.stringify(parallelPeriods);
    const hash = crypto.createHash('sha256').update(Buffer.from(serialized, 'utf-8')).digest('hex').toUpperCase();
    assert.strictEqual(
      hash,
      EXPECTED_TIMELINE_JSON_HASH,
      'Timeline serialized dataset content hash mismatch! A narrative string or structure was modified.'
    );
  });

  await t.test('All periods contain complete multilingual labels and titles across pt, en, fr, and es', () => {
    for (const period of parallelPeriods) {
      for (const lang of REQUIRED_LANGUAGES) {
        assert.ok(
          period.label && period.label[lang] && period.label[lang].trim().length > 0,
          `Period ${period.year} is missing non-empty label for language ${lang}`
        );
        assert.ok(
          period.title && period.title[lang] && period.title[lang].trim().length > 0,
          `Period ${period.year} is missing non-empty title for language ${lang}`
        );
      }
    }
  });

  await t.test('All periods contain narrative details for Africa, Europe, and Asia across all languages', () => {
    for (const period of parallelPeriods) {
      assert.ok(
        period.africanDetails && Object.keys(period.africanDetails).length > 0,
        `Period ${period.year} missing africanDetails`
      );

      for (const lang of REQUIRED_LANGUAGES) {
        assert.ok(
          period.europeDetails && period.europeDetails[lang] && period.europeDetails[lang].trim().length > 0,
          `Period ${period.year} missing europeDetails for language ${lang}`
        );
        assert.ok(
          period.asiaDetails && period.asiaDetails[lang] && period.asiaDetails[lang].trim().length > 0,
          `Period ${period.year} missing asiaDetails for language ${lang}`
        );
        assert.ok(
          period.generalAfricaDetails && period.generalAfricaDetails[lang] && period.generalAfricaDetails[lang].trim().length > 0,
          `Period ${period.year} missing generalAfricaDetails for language ${lang}`
        );
      }
    }
  });
});
