import * as fs from 'fs';

interface Polity {
  polity_number: number;
  polity_id: string;
  long_name: string;
  seshat_region: string;
  homeNGA: string;
  start_year: string | number;
  end_year: string | number;
}

const rawData = JSON.parse(fs.readFileSync('src/data/polarisRaw.json', 'utf8'));
const polities: Polity[] = rawData['Polities'];

console.log('Total polities:', polities.length);

// Let's see some unique regions in Polities
const regions = new Set<string>();
polities.forEach(p => {
  if (p.seshat_region) regions.add(p.seshat_region);
});
console.log('Unique seshat regions in dataset:', Array.from(regions));

// Filter polities related to African Natural Geographic Areas (NGAs) or regions
// Seshat regions for Africa: "Upper Egypt", "Ghana", "Niger", "Ethiopia", "Mali", etc. Let's find out which ones exist in the data.
const africanPolities = polities.filter(p => {
  const name = (p.long_name || '').toLowerCase();
  const region = (p.seshat_region || '').toLowerCase();
  const id = (p.polity_id || '').toLowerCase();
  
  return (
    region.includes('egypt') ||
    region.includes('ghana') ||
    region.includes('mali') ||
    region.includes('niger') ||
    region.includes('ethiopia') ||
    region.includes('sudan') ||
    region.includes('nubia') ||
    region.includes('tunisia') ||
    region.includes('maghreb') ||
    region.includes('zimbabwe') ||
    region.includes('congo') ||
    region.includes('benin') ||
    region.includes('kanem') ||
    // check names too
    name.includes('egypt') ||
    name.includes('ghana') ||
    name.includes('mali') ||
    name.includes('songhai') ||
    name.includes('axum') ||
    name.includes('kush') ||
    name.includes('nubia') ||
    name.includes('carthage') ||
    name.includes('kanem') ||
    name.includes('zimbabwe') ||
    name.includes('ashanti') ||
    name.includes('benin') ||
    name.includes('yoruba') ||
    name.includes('oyo') ||
    name.includes('ifa')
  );
});

console.log('\nFound African Polities count:', africanPolities.length);
console.log('Sample African Polities:');
africanPolities.slice(0, 40).forEach(p => {
  console.log(`- ID: ${p.polity_id} | Name: ${p.long_name} | Region: ${p.seshat_region} | Period: ${p.start_year} to ${p.end_year}`);
});
