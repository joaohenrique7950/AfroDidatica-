import React, { useState } from 'react';
import { OnboardingState, Language } from '../types';
import { translations } from '../utils/translations';
import { Globe, GraduationCap, Compass, BookOpen, Layers } from 'lucide-react';
import { motion } from 'motion/react';

interface OnboardingProps {
  onComplete: (state: OnboardingState) => void;
}

interface LangItem {
  code: string;
  name: string;
  flag: string;
  desc: string;
}

interface SubGroup {
  subregion: string;
  langs: LangItem[];
}

interface ContinentGroup {
  continent: string;
  icon: string;
  subgroups: SubGroup[];
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [lang, setLang] = useState<Language>('pt');
  const [step, setStep] = useState<1 | 2>(1);
  const [grade, setGrade] = useState<'primary' | 'middle' | 'high' | 'university'>('middle');
  const [selectedTopics, setSelectedTopics] = useState<string[]>([]);

  const t = translations[lang] || translations['pt'];

  const topicsList = [
    { id: 'social_scale', label: { pt: 'Complexidade de Escala, Território & População', en: 'Scale Complexity, Territory & Population', fr: 'Échelle Sociale, Territoire & Population', es: 'Escala de Complejidad, Territorio y Población' } },
    { id: 'administration', label: { pt: 'Sistemas de Governo, Burocracia & Leis (Seshat)', en: 'Systems of Government, Bureaucracy & Laws (Seshat)', fr: 'Systèmes de Gouvernement, Bureaucratie & Lois', es: 'Sistemas de Gobierno, Burocracia y Leyes' } },
    { id: 'writing_sources', label: { pt: 'Sistemas de Escrita & Fontes Primárias', en: 'Writing Systems & Primary Sources', fr: 'Systèmes d\'Écriture & Sources Primaires', es: 'Sistemas de Escritura y Fuentes Primarias' } },
    { id: 'religions', label: { pt: 'Sistemas de Crença & Filosofia Sagrada (ex: Ma\'at)', en: 'Belief Systems & Sacred Philosophy (e.g. Ma\'at)', fr: 'Systèmes de Croyance & Philosophie Sacrée', es: 'Sistemas de Creencias y Filosofía Sagrada' } },
    { id: 'trade_networks', label: { pt: 'Rotas de Comércio & Interconexões Globais', en: 'Trade Routes & Global Interconnections', fr: 'Réseaux Commerciaux & Connexions Globales', es: 'Rutas Comerciales e Interconexiones Globales' } },
    { id: 'gender_history', label: { pt: 'Gênero & Sociedades de Rainhas-Mães (Kandakes)', en: 'Gender & Queen Mother Societies (Kandakes)', fr: 'Genre & Sociétés de Reines-Mères (Kandakes)', es: 'Género y Sociedades de Reinas Madres' } }
  ];

  // Global structured continent and sub-continent directory
  const languageGroups: ContinentGroup[] = [
    {
      continent: 'África',
      icon: '🌍',
      subgroups: [
        {
          subregion: 'Ocidental & Central',
          langs: [
            { code: 'yo', name: 'Yorùbá', flag: '🇳🇬', desc: 'Nigéria & Benin' },
            { code: 'fr', name: 'Français (Af.)', flag: '🇨🇮', desc: 'Francofonia' }
          ]
        },
        {
          subregion: 'Oriental & Chifre-Afro',
          langs: [
            { code: 'sw', name: 'Kiswahili', flag: '🇰🇪', desc: 'Leste do Continente' },
            { code: 'am', name: 'Amharic (አማርኛ)', flag: '🇪🇹', desc: 'Etiópia & Chifre' }
          ]
        },
        {
          subregion: 'Austral & Setentrional',
          langs: [
            { code: 'zu', name: 'isiZulu', flag: '🇿🇦', desc: 'África do Sul' },
            { code: 'ar', name: 'العربية / Arabic', flag: '🇪🇬', desc: 'Norte da África' }
          ]
        }
      ]
    },
    {
      continent: 'Américas & Europa',
      icon: '🌎',
      subgroups: [
        {
          subregion: 'Península Ibérica / L.A.',
          langs: [
            { code: 'pt', name: 'Português', flag: '🇧🇷', desc: 'Brasil & Angola' },
            { code: 'es', name: 'Español', flag: '🇪🇸', desc: 'América Latina' }
          ]
        },
        {
          subregion: 'América do Norte / Global',
          langs: [
            { code: 'en', name: 'English', flag: '🇺🇸', desc: 'Global Standard' }
          ]
        },
        {
          subregion: 'Europa Ocidental',
          langs: [
            { code: 'fr', name: 'Français (Eu.)', flag: '🇫🇷', desc: 'França & Bélgica' },
            { code: 'it', name: 'Italiano', flag: '🇮🇹', desc: 'Itália' },
            { code: 'de', name: 'Deutsch', flag: '🇩🇪', desc: 'Alemanha' }
          ]
        }
      ]
    },
    {
      continent: 'Ásia & Oceania',
      icon: '🌏',
      subgroups: [
        {
          subregion: 'Subcontinente Indiano',
          langs: [
            { code: 'hi', name: 'Hindi (हिन्दी)', flag: '🇮🇳', desc: 'Índia Setentrional' },
            { code: 'bn', name: 'Bengali (বাংলা)', flag: '🇧🇩', desc: 'Bangladesh / Bengala' }
          ]
        },
        {
          subregion: 'Leste Asiático',
          langs: [
            { code: 'zh-CN', name: '简体中文', flag: '🇨🇳', desc: 'China' },
            { code: 'ja', name: '日本語', flag: '🇯🇵', desc: 'Japão' },
            { code: 'ko', name: '한국어', flag: '🇰🇷', desc: 'Coreia' }
          ]
        },
        {
          subregion: 'Sudeste Asiático',
          langs: [
            { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳', desc: 'Vietnã' },
            { code: 'id', name: 'Bahasa Indonesia', flag: '🇮🇩', desc: 'Indonésia' }
          ]
        }
      ]
    }
  ];

  const handleLanguageSelect = (selectedLang: Language) => {
    setLang(selectedLang);
    setStep(2);
  };

  const toggleTopic = (id: string) => {
    if (selectedTopics.includes(id)) {
      setSelectedTopics(selectedTopics.filter(t => t !== id));
    } else {
      setSelectedTopics([...selectedTopics, id]);
    }
  };

  const handleFinish = () => {
    onComplete({
      language: lang,
      gradeLevel: grade,
      focusTopics: selectedTopics.length > 0 ? selectedTopics : ['social_scale', 'writing_sources']
    });
  };

  return (
    <div id="onboarding-root" className="min-h-screen w-full bg-[#faf6ee] flex items-center justify-center p-4 relative overflow-y-auto font-sans text-[#2c231e] py-12">
      {/* Background detailed compass shadow lines */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#ebdcc5]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#cfdfd4]/20 rounded-full blur-3xl pointer-events-none" />

      <motion.div 
         initial={{ opacity: 0, scale: 0.98 }} 
         animate={{ opacity: 1, scale: 1 }}
         transition={{ duration: 0.4 }}
         className={`w-full bg-[#fcfbf7] rounded-lg p-6 sm:p-8 border border-[#e5dfd5] shadow-md relative z-10 ${
           step === 1 ? 'max-w-5xl' : 'max-w-xl'
         }`}
      >
        {/* Step 1: Continent Grouped Language selection */}
        {step === 1 && (
          <div className="text-center font-sans">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-white rounded-full text-[#7a2c22] border border-[#d5cebf] shadow-sm">
                <Globe className="h-7 w-7 animate-pulse" />
              </div>
            </div>
            
            <h1 className="text-2xl font-serif font-bold tracking-tight text-[#7a2c22] mb-1">
              AfroDidática Atlas
            </h1>
            <p className="text-[#5c544d] text-xs italic mb-8 font-serif max-w-lg mx-auto">
              Selecione o idioma curricular escolar. O atlas se adaptará e traduzirá todos os conteúdos, fontes acadêmicas e diagnósticos quantitativos do Seshat para o idioma escolhido.
            </p>

            {/* Continents Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8 text-left">
              {languageGroups.map((group) => (
                <div 
                  key={group.continent}
                  className="bg-[#faf9f4] rounded-lg border border-[#e5dfd5]/85 p-5 flex flex-col gap-4 shadow-inner"
                >
                  <div className="flex items-center gap-2 pb-2.5 border-b border-[#e5dfd5]/75">
                    <span className="text-xl">{group.icon}</span>
                    <h2 className="font-serif font-bold text-[#7a2c22] text-[13.5px] uppercase tracking-wider">
                      {group.continent}
                    </h2>
                  </div>

                  <div className="space-y-4 flex-1">
                    {group.subgroups.map((sub) => (
                      <div key={sub.subregion} className="space-y-1.5 animate-fadeIn">
                        <div className="text-[9px] uppercase font-bold tracking-wider text-[#9c8262] font-mono leading-none">
                          {sub.subregion}
                        </div>
                        <div className="grid grid-cols-1 gap-1.5">
                          {sub.langs.map((langItem) => (
                            <button
                              key={langItem.code}
                              id={`lang-btn-${langItem.code}`}
                              onClick={() => handleLanguageSelect(langItem.code)}
                              className="flex items-center gap-2.5 p-2 bg-white hover:bg-[#faf6f0] border border-[#d5cebf] hover:border-[#7a2c22] rounded text-left transition-all cursor-pointer shadow-sm w-full group active:scale-[0.98]"
                            >
                              <span className="text-lg shrink-0 group-hover:scale-110 transition-transform">{langItem.flag}</span>
                              <div className="min-w-0">
                                <div className="font-bold text-[#211a15] text-[11px] leading-tight truncate">
                                  {langItem.name}
                                </div>
                                <div className="text-[9px] text-[#5c544d] font-mono leading-none truncate mt-0.5">
                                  {langItem.desc}
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-[9px] text-[#8c8273] font-mono border-t border-[#e5dfd5]/85 pt-4 flex flex-wrap justify-between items-center gap-2">
              <span>© LEHH-AfroDidática • Alinhado à História Geral da África da UNESCO</span>
              <span className="text-[#3e5a4d] font-bold">● Tradução Automática Curricular Ativa</span>
            </div>
          </div>
        )}

        {/* Step 2: Educator Setup */}
        {step === 2 && (
          <div>
            <h2 id="onb-title" className="text-lg font-serif font-bold text-[#7a2c22] mb-1">
              {t.onboardingTitle}
            </h2>
            <p className="text-[#5c544d] text-xs mb-6 italic">
              {t.onboardingSubtitle}
            </p>

            {/* Target Grade level */}
            <div className="mb-6 font-sans">
              <label className="text-[10px] uppercase tracking-wider font-bold font-mono text-[#7a2c22] mb-2.5 flex items-center gap-2">
                <GraduationCap className="h-4 w-4 text-[#ba9a6f]" />
                {t.gradeLevel}
              </label>

              <div className="grid grid-cols-2 gap-2 text-slate-800">
                {(['primary', 'middle', 'high', 'university'] as const).map((g) => (
                  <button
                    key={g}
                    id={`grade-btn-${g}`}
                    type="button"
                    onClick={() => setGrade(g)}
                    className={`p-3 text-[11px] text-left rounded border transition-all cursor-pointer ${
                      grade === g
                        ? 'bg-[#faf6ee] border-[#7a2c22] text-[#7a2c22] font-bold shadow-sm'
                        : 'bg-white border-[#d5cebf] text-[#5c544d] hover:bg-[#faf9f4]'
                    }`}
                  >
                    {t[g]}
                  </button>
                ))}
              </div>
            </div>

            {/* Focus Topics */}
            <div className="mb-8 font-sans">
              <label className="text-[10px] uppercase tracking-wider font-bold font-mono text-[#7a2c22] mb-2.5 flex items-center gap-2">
                <Compass className="h-4 w-4 text-[#ba9a6f]" />
                {t.focusAreas}
              </label>
              
              <div className="space-y-2 text-slate-800">
                {topicsList.map((topic) => {
                  const isSel = selectedTopics.includes(topic.id);
                  return (
                    <button
                      key={topic.id}
                      id={`topic-btn-${topic.id}`}
                      type="button"
                      onClick={() => toggleTopic(topic.id)}
                      className={`w-full flex items-center justify-between p-3 text-[11px] rounded border transition-all cursor-pointer ${
                        isSel
                          ? 'bg-[#ecf3ee] border-[#3e5a4d] text-[#3e5a4d] font-semibold'
                          : 'bg-white border-[#d5cebf] text-[#5c544d] hover:bg-[#faf9f4]'
                      }`}
                    >
                      <span>{topic.label[lang as 'pt'] || topic.label['pt']}</span>
                      <span className={`w-2.5 h-2.5 rounded-full transition-all ${isSel ? 'bg-[#3e5a4d] scale-110' : 'bg-[#d5cebf]'}`} />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Navigation buttons */}
            <div className="flex items-center justify-between pt-4 border-t border-[#e5dfd5]/80">
              <button
                id="btn-back"
                onClick={() => setStep(1)}
                className="text-xs text-[#5c544d] hover:text-[#211a15] transition-colors cursor-pointer"
              >
                ← Voltar
              </button>
              
              <button
                id="btn-explore"
                onClick={handleFinish}
                className="px-6 py-2.5 bg-[#7a2c22] hover:bg-[#8e3328] text-white font-serif font-bold text-xs uppercase tracking-widest rounded transition-all transform active:scale-95 cursor-pointer shadow-sm"
              >
                {t.startExploring}
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
