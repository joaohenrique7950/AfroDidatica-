import * as fs from 'fs';

const rawData = JSON.parse(fs.readFileSync('src/data/polarisRaw.json', 'utf8'));

const politiesToInspect = ['ml_mali_emp', 'zi_great_zimbabwe', 'et_aksum_emp_1', 'gh_ashanti_emp', 'cd_kanem', 'dz_numidia'];

politiesToInspect.forEach(pid => {
  console.log(`\n================== POLITY: ${pid} ==================`);
  
  // Look in General
  const generalRows = rawData['General']?.filter((r: any) => r.polity_id === pid) || [];
  console.log(`General rows: ${generalRows.length}`);
  const genVars = Array.from(new Set(generalRows.map((r: any) => r.variable_name)));
  console.log('Sample General vars:', genVars.slice(0, 10));

  // Look in Social Complexity
  const scRows = rawData['Social complexity']?.filter((r: any) => r.polity_id === pid) || [];
  console.log(`Social complexity rows: ${scRows.length}`);
  const scVars = Array.from(new Set(scRows.map((r: any) => r.variable_name)));
  console.log('Sample Social complexity vars:', scVars.slice(0, 10));
  
  // Print some interesting social complexity values
  scRows.slice(0, 5).forEach((r: any) => {
    console.log(`  - ${r.variable_name}: ${r.value_from} to ${r.value_to} (Years: ${r.year_from} - ${r.year_to})`);
  });

  // Look in Religion
  const relRows = rawData['Religion']?.filter((r: any) => r.polity_id === pid) || [];
  console.log(`Religion rows: ${relRows.length}`);
  const relVars = Array.from(new Set(relRows.map((r: any) => r.variable_name)));
  console.log('Sample Religion vars:', relVars.slice(0, 15));
});
