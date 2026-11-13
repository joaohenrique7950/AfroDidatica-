import test from 'node:test';
import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';

const EXPECTED_CHECKSUMS: Record<string, string> = {
  'src/data/defaultDataset.ts': 'D7FE654FEC21C39DADF2D48D012B71F65E125971449A2F6B5D6C7B51017DF117',
  'src/data/extractionsDataset.ts': '3B666590B47DCE934AC3196CF59815B5D279E9C463D1103171C2AD87C5CAA0FE',
  'src/data/polarisPoints.ts': 'A709475C08C393B63E6E51EA11348F96B6333273213E12342405CB7874590C76',
  'src/data/polarisRaw.json': '4FE0D9124B5EDE816A8F482E7E35331F1E62B10E2A35A1A41C7B908811380F64',
  'src/data/africa.json': '4AA1B7A4915DE0E218ED3BCFF4CE4C81090FF55F8103DBA7978B8FCE35A39373',
  'src/data/extracted_african.json': '95E1BDDDE6F4B3A1A9FEAEB833ED60A84491238135761F5587681EDAF913446F',
  'src/data/strict_african_polities.json': 'A63D86EE298A97FFA9A387C36811DD78E5B3B1B01B2263BF745E5FC8575A0716',
  'Polaris2026.xlsx': 'A3D518CBF83C30604D00C76B1D10E7D4D3280E16A485CD7E10E3653E22D6CF6E',
  'fetch_polaris.ts': '6C90329082D3FC91C1A06CEEB78E5AD2EABBE6114172BFC75A75108CF5B0F161',
  'extract_all_african.ts': 'CA5AC52AFA645A97422B5F17FF0AF97E03EA6CAD08DB19DD9A08F1C7B0466464',
  'filter_african.ts': 'D650F6E6EEDD00AE49FAC5427A4DA34F9952B6F2968E1EEEBF9D818ADD8ABE20',
  'inspect_sheets.ts': 'BBA94AE564907683AACA2122BB63A5F4A7666A742D01134A6431ABEC9A88045F'
};

function computeSha256(filePath: string): string {
  const fileBuffer = fs.readFileSync(filePath);
  return crypto.createHash('sha256').update(fileBuffer).digest('hex').toUpperCase();
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
