import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

// Canonical LF-based expected hashes derived from the git repository objects
const EXPECTED_CHECKSUMS: Record<string, string> = {
  'src/data/defaultDataset.ts': '52D1C2EE3943202F6FACC176B73CA7109E1DCFF27160D16D49F30F8A2FA78686',
  'src/data/extractionsDataset.ts': '7A1D6035A47717C842431663168C85DD3805691DC774894034201A677A7D8082',
  'src/data/polarisPoints.ts': 'F938B308393C79B67601D4A6958B008BF92A1019FC1E509D1C58A2F562E85688',
  'src/data/polarisRaw.json': '742382BE06DA5FB3718B149D5BF368CD97FC0CF8E470B73259CB3B2FEDE6BD79',
  'src/data/africa.json': '4AA1B7A4915DE0E218ED3BCFF4CE4C81090FF55F8103DBA7978B8FCE35A39373',
  'src/data/extracted_african.json': '1D927DED1DA089EA32BBEC340C6F325D6FFB60C3B4EEB42F456CA9FE08E00B24',
  'src/data/strict_african_polities.json': 'C22208025A6EC527119A285C37BEAF04852BF1E1142C09063883B13C80D572DF',
  'Polaris2026.xlsx': 'A3D518CBF83C30604D00C76B1D10E7D4D3280E16A485CD7E10E3653E22D6CF6E',
  'fetch_polaris.ts': '1318BB357D60D64330E072F2740C661CB199A8F88F4CFB23A1612C4EE0E107C9',
  'extract_all_african.ts': '7438BA0DAF3141A4B3B0CEFBD2D0B857B94137EA8EB96E8EF5D8821D3A7D8033',
  'filter_african.ts': '060E65340614CAD0DF246AEACAE6E5CC1BEE7F760DC4984656B17046552357D2',
  'inspect_sheets.ts': '4A433FB089E00BAAE3021DE723A3FCDEA8EFA4CB8BC4FA131CB17AEC75B051EF'
};

export function normalizeTextForHashing(text: string): Buffer {
  // Normalize CRLF to LF in memory only to guarantee cross-platform hash equivalence
  return Buffer.from(text.replace(/\r\n/g, '\n'), 'utf-8');
}

export function computeSha256(filePath: string): string {
  // Binary files (like .xlsx) are hashed byte-exact without normalization
  if (filePath.endsWith('.xlsx')) {
    const fileBuffer = fs.readFileSync(filePath);
    return crypto.createHash('sha256').update(fileBuffer).digest('hex').toUpperCase();
  }

  // UTF-8 text files are normalized in-memory from CRLF to LF
  const rawText = fs.readFileSync(filePath, 'utf-8');
  const normalizedBuffer = normalizeTextForHashing(rawText);
  return crypto.createHash('sha256').update(normalizedBuffer).digest('hex').toUpperCase();
}

test('Historical and scientific datasets checksum integrity', async (t) => {
  for (const [relativePath, expectedHash] of Object.entries(EXPECTED_CHECKSUMS)) {
    await t.test(`Preserved file integrity: ${relativePath}`, () => {
      const fullPath = path.resolve(process.cwd(), relativePath);
      assert.ok(fs.existsSync(fullPath), `File must exist: ${relativePath}`);
      const actualHash = computeSha256(fullPath);
      assert.strictEqual(
        actualHash,
        expectedHash,
        `Checksum mismatch in protected historical file ${relativePath}!`
      );
    });
  }
});

test('Checksum normalization and mutation regression invariants', async (t) => {
  await t.test('CRLF and LF text inputs produce identical canonical SHA-256 hashes', () => {
    const sampleLf = 'First line of ancient history\nSecond line of ancient history\n';
    const sampleCrlf = 'First line of ancient history\r\nSecond line of ancient history\r\n';

    const hashLf = crypto.createHash('sha256').update(normalizeTextForHashing(sampleLf)).digest('hex').toUpperCase();
    const hashCrlf = crypto.createHash('sha256').update(normalizeTextForHashing(sampleCrlf)).digest('hex').toUpperCase();

    assert.strictEqual(hashLf, hashCrlf, 'LF and CRLF must produce identical normalized hash');
  });

  await t.test('Actual content modification alters hash and fails verification', () => {
    const originalText = 'First line of ancient history\nSecond line of ancient history\n';
    const modifiedText = 'First line of ancient history\nMODIFIED line of ancient history\n';

    const originalHash = crypto.createHash('sha256').update(normalizeTextForHashing(originalText)).digest('hex').toUpperCase();
    const modifiedHash = crypto.createHash('sha256').update(normalizeTextForHashing(modifiedText)).digest('hex').toUpperCase();

    assert.notStrictEqual(originalHash, modifiedHash, 'Modified content must produce a distinct hash');
  });

  await t.test('Binary assets bypass text normalization and are hashed byte-exact', () => {
    const xlsxPath = path.resolve(process.cwd(), 'Polaris2026.xlsx');
    assert.ok(fs.existsSync(xlsxPath), 'Polaris2026.xlsx must exist');
    const rawBuffer = fs.readFileSync(xlsxPath);
    const directHash = crypto.createHash('sha256').update(rawBuffer).digest('hex').toUpperCase();
    const helperHash = computeSha256(xlsxPath);

    assert.strictEqual(helperHash, directHash, 'Binary file hash must match direct buffer hash');
    assert.strictEqual(helperHash, EXPECTED_CHECKSUMS['Polaris2026.xlsx'], 'Binary file hash must match expected');
  });
});
