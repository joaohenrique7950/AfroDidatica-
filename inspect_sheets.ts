import * as fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('src/data/polarisRaw.json', 'utf8'));

console.log('--- SHEETS IN DATASET ---');
console.log(Object.keys(rawData));

const sheets = ['General', 'Social complexity', 'Religion'];
sheets.forEach(sheet => {
  if (rawData[sheet]) {
    const vars = new Set();
    rawData[sheet].forEach((r: any) => {
      if (r.variable_name) vars.add(r.variable_name);
    });
    console.log(`\nSheet "${sheet}" has ${rawData[sheet].length} rows and ${vars.size} unique variables:`);
    console.log(Array.from(vars).slice(0, 30));
  }
});
