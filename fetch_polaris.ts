import * as fs from 'fs';
import * as path from 'path';
import * as XLSX from 'xlsx';

async function downloadAndParse() {
  const urls = [
    'https://github.com/joaohenrique7950/LEHH-AfroDidatica/raw/main/Polaris2026.xlsx',
    'https://github.com/joaohenrique7950/LEHH-AfroDidatica/raw/master/Polaris2026.xlsx'
  ];

  let buffer: Buffer | null = null;
  let successUrl = '';

  for (const url of urls) {
    try {
      console.log(`Trying to download from: ${url}`);
      const response = await fetch(url);
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        buffer = Buffer.from(arrayBuffer);
        successUrl = url;
        break;
      } else {
        console.error(`Status ${response.status} for ${url}`);
      }
    } catch (e) {
      console.error(`Error downloading from ${url}:`, e);
    }
  }

  if (!buffer) {
    console.error('Failed to download from both master and main branches.');
    process.exit(1);
  }

  console.log(`Successfully downloaded Polaris2026.xlsx from ${successUrl}`);

  // Write the file locally for verification or backup
  fs.writeFileSync('Polaris2026.xlsx', buffer);

  // Parse using xlsx
  const workbook = XLSX.read(buffer, { type: 'buffer' });
  console.log('Sheets found:', workbook.SheetNames);

  // Let's inspect some of the sheets
  workbook.SheetNames.forEach(sheetName => {
    const sheet = workbook.Sheets[sheetName];
    const rows = XLSX.utils.sheet_to_json(sheet);
    console.log(`Sheet "${sheetName}" has ${rows.length} rows.`);
    if (rows.length > 0) {
      console.log('Sample row structure:', Object.keys(rows[0]));
    }
  });

  // Convert the sheet data into our Structured HistoricalPoint[] format
  // We'll write code below to extract the data cleanly. Let's first dump the raw sheets as a JSON backup
  const rawData: Record<string, any[]> = {};
  workbook.SheetNames.forEach(sheetName => {
    rawData[sheetName] = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);
  });

  fs.writeFileSync('src/data/polarisRaw.json', JSON.stringify(rawData, null, 2));
  console.log('Saved raw sheets data to src/data/polarisRaw.json');
}

downloadAndParse().catch(err => {
  console.error('Error in script:', err);
  process.exit(1);
});
