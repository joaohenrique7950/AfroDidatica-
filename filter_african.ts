import * as fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('src/data/polarisRaw.json', 'utf8'));
const polities = rawData['Polities'];

const africanRegions = [
  'northeast africa', 'west africa', 'maghreb', 'east africa', 'sahel', 'central africa', 'southern africa'
];

const parsed: any[] = [];

polities.forEach((p: any) => {
  const reg = (p.seshat_region || '').toLowerCase();
  
  const isAfrican = africanRegions.some(ar => reg.includes(ar));

  if (isAfrican) {
    parsed.push(p);
  }
});

console.log('Strict African Polities count:', parsed.length);
console.log('Distinct regional values:', Array.from(new Set(parsed.map(p => p.seshat_region))));
fs.writeFileSync('src/data/strict_african_polities.json', JSON.stringify(parsed, null, 2));
