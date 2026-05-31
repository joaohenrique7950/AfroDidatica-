import * as fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('src/data/polarisRaw.json', 'utf8'));
const polities = rawData['Polities'];

const africanRegions = [
  'northeast africa', 'west africa', 'maghreb', 'east africa', 'sahel', 'central africa', 'southern africa'
];

interface PolityDetail {
  id: string;
  name: string;
  region: string;
  start_year: number;
  end_year: number;
  capital?: string;
  language?: string;
  territory?: string;
  population?: string;
  religion?: string;
}

const resList: PolityDetail[] = [];

polities.forEach((p: any) => {
  const reg = (p.seshat_region || '').toLowerCase();
  const name = (p.long_name || '').toLowerCase();
  const id = p.polity_id;
  
  const isAfrican = africanRegions.some(ar => reg.includes(ar)) || 
                    name.includes('egypt') || name.includes('songhai') || name.includes('kush') || 
                    name.includes('nubia') || name.includes('carthage') || name.includes('axum') ||
                    name.includes('zimbabwe') || name.includes('kanem') || name.includes('ashanti') || 
                    name.includes('ghana') || name.includes('numidia') || name.includes('tahert') ||
                    name.includes('almoravid') || name.includes('almohad') || name.includes('mamluk') ||
                    name.includes('fatimid');

  if (isAfrican) {
    // Get general vars
    const genRows = rawData['General']?.filter((r: any) => r.polity_id === id) || [];
    const capitalRow = genRows.find((r: any) => r.variable_name === 'polity_capital');
    const langRow = genRows.find((r: any) => r.variable_name === 'polity_language');
    const relRow = genRows.find((r: any) => r.variable_name === 'polity_religion');

    // Get social complexity
    const scRows = rawData['Social complexity']?.filter((r: any) => r.polity_id === id) || [];
    const terrRow = scRows.find((r: any) => r.variable_name === 'polity_territory');
    const popRow = scRows.find((r: any) => r.variable_name === 'polity_population');

    resList.push({
      id,
      name: p.long_name,
      region: p.seshat_region,
      start_year: Number(p.start_year),
      end_year: Number(p.end_year),
      capital: capitalRow?.value_from || capitalRow?.value_to || 'N/A',
      language: langRow?.value_from || langRow?.value_to || 'N/A',
      religion: relRow?.value_from || relRow?.value_to || 'N/A',
      territory: terrRow ? `${terrRow.value_from} - ${terrRow.value_to} km²` : 'N/A',
      population: popRow ? `${popRow.value_from} - ${popRow.value_to}` : 'N/A'
    });
  }
});

console.log(`Extracted ${resList.length} African polities:`);
console.log(JSON.stringify(resList.slice(0, 15), null, 2));

fs.writeFileSync('src/data/extracted_african.json', JSON.stringify(resList, null, 2));
