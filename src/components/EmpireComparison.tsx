import React, { useState } from 'react';
import { HistoricalPoint, Language } from '../types';
import { translations } from '../utils/translations';
import { Columns, ArrowLeftRight, Landmark, Globe, Users, Shield, Languages, AwardIcon, Compass, Sparkles } from 'lucide-react';

interface EmpireComparisonProps {
  language: Language;
  points: HistoricalPoint[];
}

export default function EmpireComparison({ language, points }: EmpireComparisonProps) {
  const [empireAId, setEmpireAId] = useState<string>('');
  const [empireBId, setEmpireBId] = useState<string>('');

  const t = translations[language];

  // Map to select active points with seshatData
  const activePoints = points.filter(p => p.seshatData);

  // Set default selection
  React.useEffect(() => {
    if (activePoints.length >= 2) {
      if (!empireAId) setEmpireAId(activePoints[0].id);
      if (!empireBId) setEmpireBId(activePoints[1].id);
    }
  }, [activePoints, empireAId, empireBId]);

  const empireA = activePoints.find(p => p.id === empireAId);
  const empireB = activePoints.find(p => p.id === empireBId);

  // Ready-to-use cross-curriculum comparatives
  const getDiscussionPrompts = (eA: HistoricalPoint, eB: HistoricalPoint) => {
    const ppts: Record<string, string[]> = {
      pt: [
        `Como a escala territorial de ${eA.name.pt} comparada a ${eB.name.pt} moldou seus respectivos sistemas de tributação e burocracia governamental?`,
        `Analise as crenças rituais de ${eA.name.pt} e ${eB.name.pt}. Como cada civilização aplicava sanções espirituais (ex: Ma'at ou crenças tradicionais) para manter a coesão social?`,
        `De que maneira as línguas faladas e os registros escritos documentados de ambos os reinos influenciaram suas transações de comércio regional?`
      ],
      en: [
        `How did the territorial scale of ${eA.name.en} compared to ${eB.name.en} shape their respective government taxation and bureaucracy systems?`,
        `Analyze the ritual beliefs of ${eA.name.en} and ${eB.name.en}. How did each civilization leverage spiritual sanctions (e.g., Ma’at or traditional rules) to maintain cohesion?`,
        `How did the languages spoken and documented scriptures of both polities influence their regional trade transactions?`
      ],
      fr: [
        `Comment l'échelle territoriale de ${eA.name.fr} comparée à celle de ${eB.name.fr} a-t-elle façonné leurs systèmes de taxation et d'administration ?`,
        `Analysez les rituels et croyances de ${eA.name.fr} et ${eB.name.fr}. Comment chaque civilisation utilisait-elle la justice spirituelle pour maintenir l'ordre ?`,
        `De quelle manière les langues et les écritures de ces deux royaumes ont-elles facilité ou structuré le commerce régional ?`
      ],
      es: [
        `¿Cómo influyó la escala territorial de ${eA.name.es} apoyada en la burocracia en comparación con la de ${eB.name.es} en la contabilidad y recaudación?`,
        `Analice las creencias rituales de ${eA.name.es} y de ${eB.name.es}. ¿De qué modo la justicia cívica o espiritual mantenía la paz comunal?`,
        `¿Cómo facilitaron las lenguas o los escritos imperiales las rutas comerciales regionales de ambos señoríos?`
      ]
    };
    return ppts[language] || ppts['en'];
  };

  const labels = {
    pt: {
      title: "Bancada de Comparação Multidimensional de Impérios",
      subtitle: "Workspace comparativo baseado em dados arqueológicos e variáveis do banco Seshat",
      selectA: "Selecione o Império A",
      selectB: "Selecione o Império B",
      capital: "Capital / Principais Sítios",
      territory: "Extensão Territorial Máxima",
      population: "População Estimada",
      govType: "Estrutura Estatal e Governança",
      languages: "Sistemas de Comunicação / Línguas",
      religion: "Crenças Cosmopolitas & Punibilidade Sobrenatural",
      promptsTitle: "Questões Historiográficas Comparativas (Foco no Aluno)",
      promptsDesc: "Instigue o debate em sala de aula propondo estas diretrizes analíticas baseadas no currículo UNESCO:",
      insufficientData: "Selecione dois reinos diferentes com dados científicos Seshat para iniciar o workbench comparativo."
    },
    en: {
      title: "Empire Multidimensional Comparison Workbench",
      subtitle: "Comparative workspace based on archaeological context and Seshat variables",
      selectA: "Select Empire A",
      selectB: "Select Empire B",
      capital: "Capital / Key Archaeological Sites",
      territory: "Maximum Territorial Expansion",
      population: "Estimated Population",
      govType: "State Structure & Governance Type",
      languages: "Communication Systems & Languages",
      religion: "Moralized Beliefs & Supernatural Sanctions",
      promptsTitle: "Comparative Historiographical Prompts (For Classroom)",
      promptsDesc: "Drive deep critical reading in class by raising these curricular debate inquiries:",
      insufficientData: "Select two different polities with valid scientific Seshat datasets to start comparison."
    },
    fr: {
      title: "Banc de Comparaison Multidimensionnelle des Empires",
      subtitle: "Espace comparatif basé sur les variables scientifiques de la base de données Seshat",
      selectA: "Choisir l'Empire A",
      selectB: "Choisir l'Empire B",
      capital: "Capitale / Sîtes Archéologiques Clés",
      territory: "Extension Territoriale Maximale",
      population: "Population Estimée",
      govType: "Structure de l'État & Type de Gouvernement",
      languages: "Systèmes d'Écriture & Langues",
      religion: "Croyances & Sanctions Surnaturelles",
      promptsTitle: "Sujets de Débats Historiographiques Comparatifs",
      promptsDesc: "Encouragez la pensée critique en posant ces questions analytiques basées sur l'UNESCO :",
      insufficientData: "Veuillez sélectionner deux royaumes distincts avec des données Seshat."
    },
    es: {
      title: "Consola de Comparación Multidimensional de Imperios",
      subtitle: "Mesa de análisis comparativo de variables del banco científico Seshat",
      selectA: "Seleccione Imperio A",
      selectB: "Seleccione Imperio B",
      capital: "Capital / Sitios Arqueológicos",
      territory: "Extensión Territorial Máxima",
      population: "Población Estimada",
      govType: "Estructura Estatal y Gobernanza",
      languages: "Medios de Comunicación y Escritura",
      religion: "Cosmovisión Religiosa y Orden Divino",
      promptsTitle: "Ejes de Debate de Educación por Competencias",
      promptsDesc: "Proponga estos interrogantes didácticos en sus guías de trabajo integrales:",
      insufficientData: "Seleccione dos dominios distintos con datos de la biblioteca para comparar."
    }
  };

  const l = labels[language] || labels['pt'];

  return (
    <div id="empire-comparison-card" className="bg-[#fcfbf7] rounded-lg border border-[#ebdcc5] p-6 shadow-sm font-sans text-slate-850">
      
      {/* Header */}
      <div className="border-b border-[#ebdcc5]/40 pb-4 mb-5">
        <h3 className="text-sm font-serif font-bold text-[#7a2c22] uppercase tracking-wider flex items-center gap-2">
          <Columns className="h-4.5 w-4.5 text-[#ba9a6f]" />
          {l.title}
        </h3>
        <p className="text-[11px] text-[#5c544d] mt-1">
          {l.subtitle}
        </p>
      </div>

      {activePoints.length < 2 && (
        <div className="p-4 bg-yellow-50/55 rounded border border-yellow-200 text-xs text-yellow-800 text-center">
          {l.insufficientData}
        </div>
      )}

      {activePoints.length >= 2 && (
        <div className="space-y-6">
          {/* Empire Pickers */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Pick A */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#9c8262] font-mono">{l.selectA}</label>
              <select
                id="select-empire-a"
                value={empireAId}
                onChange={(e) => setEmpireAId(e.target.value)}
                className="p-2.5 bg-white border border-[#ebdcc5] rounded text-xs text-[#2c231e] font-serif font-bold shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#7a2c22]"
              >
                {activePoints.map(p => (
                  <option key={p.id} value={p.id} disabled={p.id === empireBId}>
                    {p.name[language] || p.name.pt} ({p.period[language] || p.period.pt})
                  </option>
                ))}
              </select>
            </div>

            {/* Pick B */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold uppercase tracking-wider text-[#9c8262] font-mono">{l.selectB}</label>
              <select
                id="select-empire-b"
                value={empireBId}
                onChange={(e) => setEmpireBId(e.target.value)}
                className="p-2.5 bg-white border border-[#ebdcc5] rounded text-xs text-[#2c231e] font-serif font-bold shadow-xs cursor-pointer focus:outline-none focus:ring-1 focus:ring-[#3e5a4d]"
              >
                {activePoints.map(p => (
                  <option key={p.id} value={p.id} disabled={p.id === empireAId}>
                    {p.name[language] || p.name.pt} ({p.period[language] || p.period.pt})
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Matrix Bench */}
          {empireA && empireB && (
            <div className="border border-[#ebdcc5]/40 rounded-lg overflow-hidden shadow-xs">
              
              {/* Matrix Headings */}
              <div className="grid grid-cols-12 bg-[#faf9f4] border-b border-[#ebdcc5]/45 text-center items-center py-2.5 px-3">
                <div className="col-span-4 text-left text-[9px] font-bold uppercase tracking-widest text-[#7a2c22] font-mono">
                  Dimensão Analítica
                </div>
                <div className="col-span-4 text-center text-xs font-serif font-bold text-[#7a2c22] truncate px-1">
                  {empireA.name[language]}
                </div>
                <div className="col-span-4 text-center text-xs font-serif font-bold text-[#3e5a4d] truncate px-1">
                  {empireB.name[language]}
                </div>
              </div>

              {/* Rows */}
              <div className="divide-y divide-[#ebdcc5]/20">
                {/* Capital */}
                <div className="grid grid-cols-12 items-center py-3.5 px-3 min-h-[50px]">
                  <div className="col-span-12 md:col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-[#5c544d] uppercase font-mono mb-2 md:mb-0">
                    <Landmark className="h-4 w-4 text-[#ba9a6f] shrink-0" />
                    {l.capital}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] font-serif font-bold text-[#201a15] border-r border-[#ebdcc5]/25 pr-3 line-clamp-3">
                    {empireA.seshatData?.capital?.[language] || '-'}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] font-serif font-bold text-[#201a15] pl-3 line-clamp-3">
                    {empireB.seshatData?.capital?.[language] || '-'}
                  </div>
                </div>

                {/* Territory */}
                <div className="grid grid-cols-12 items-center py-3.5 px-3 min-h-[50px]">
                  <div className="col-span-12 md:col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-[#5c544d] uppercase font-mono mb-2 md:mb-0">
                    <Globe className="h-4 w-4 text-[#ba9a6f] shrink-0" />
                    {l.territory}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11.5px] font-bold text-[#7a2c22] border-r border-[#ebdcc5]/25 pr-3">
                    {empireA.seshatData?.territory?.[language] || '-'}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11.5px] font-bold text-[#3e5a4d] pl-3">
                    {empireB.seshatData?.territory?.[language] || '-'}
                  </div>
                </div>

                {/* Population */}
                <div className="grid grid-cols-12 items-center py-3.5 px-3 min-h-[50px]">
                  <div className="col-span-12 md:col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-[#5c544d] uppercase font-mono mb-2 md:mb-0">
                    <Users className="h-4 w-4 text-[#ba9a6f] shrink-0" />
                    {l.population}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] font-serif text-[#2a231e] border-r border-[#ebdcc5]/25 pr-3">
                    {empireA.seshatData?.population?.[language] || '-'}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] font-serif text-[#2a231e] pl-3">
                    {empireB.seshatData?.population?.[language] || '-'}
                  </div>
                </div>

                {/* Government structure */}
                <div className="grid grid-cols-12 items-center py-3.5 px-3 min-h-[55px]">
                  <div className="col-span-12 md:col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-[#5c544d] uppercase font-mono mb-2 md:mb-0">
                    <Shield className="h-4 w-4 text-[#ba9a6f] shrink-0" />
                    {l.govType}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] text-[#2c231e] border-r border-[#ebdcc5]/25 pr-3 leading-relaxed">
                    {empireA.seshatData?.governmentType?.[language] || '-'}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] text-[#2c231e] pl-3 leading-relaxed">
                    {empireB.seshatData?.governmentType?.[language] || '-'}
                  </div>
                </div>

                {/* Spoken Languages */}
                <div className="grid grid-cols-12 items-center py-3.5 px-3 min-h-[50px]">
                  <div className="col-span-12 md:col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-[#5c544d] uppercase font-mono mb-2 md:mb-0">
                    <Languages className="h-4 w-4 text-[#ba9a6f] shrink-0" />
                    {l.languages}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] font-mono text-[#7a2c22] border-r border-[#ebdcc5]/25 pr-3 text-xs leading-snug">
                    {empireA.seshatData?.languages?.[language] || '-'}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[11px] font-mono text-[#3e5a4d] pl-3 text-xs leading-snug">
                    {empireB.seshatData?.languages?.[language] || '-'}
                  </div>
                </div>

                {/* Supernatural beliefs */}
                <div className="grid grid-cols-12 items-center py-3.5 px-3 min-h-[55px]">
                  <div className="col-span-12 md:col-span-4 flex items-center gap-1.5 text-[10px] font-bold text-[#5c544d] uppercase font-mono mb-2 md:mb-0">
                    <AwardIcon className="h-4 w-4 text-[#ba9a6f] shrink-0" />
                    {l.religion}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[10.5px] italic text-[#5c544d] border-r border-[#ebdcc5]/25 pr-3 leading-relaxed">
                    {empireA.seshatData?.religionInfo?.[language] || '-'}
                  </div>
                  <div className="col-span-6 md:col-span-4 text-center text-[10.5px] italic text-[#5c544d] pl-3 leading-relaxed">
                    {empireB.seshatData?.religionInfo?.[language] || '-'}
                  </div>
                </div>
              </div>

            </div>
          )}

          {/* Dynamic Discussion Prompts to Spark Engagement */}
          {empireA && empireB && (
            <div className="bg-[#fafbf9] border border-[#ebdcc5]/40 rounded-lg p-4 shadow-sm">
              <h4 className="text-[11px] uppercase font-bold text-[#7a2c22] font-mono mb-2.5 flex items-center gap-1.5">
                <Sparkles className="h-3.5 w-3.5 text-[#ba9a6f]" />
                {l.promptsTitle}
              </h4>
              <p className="text-[10px] text-[#5c544d] mb-3 leading-snug">
                {l.promptsDesc}
              </p>
              <div className="space-y-2.5">
                {getDiscussionPrompts(empireA, empireB).map((prm, idx) => (
                  <div key={idx} className="p-3 bg-white rounded border border-[#ebdcc5]/30 flex items-start gap-2.5 text-xs text-[#2c231e] leading-relaxed shadow-3xs hover:border-[#ba9a6f]/50 transition-colors">
                    <span className="w-4 h-4 bg-[#f6f2ea] text-[#7a2c22] rounded-full flex items-center justify-center text-[9px] font-bold font-mono shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <p className="font-sans italic">{prm}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
