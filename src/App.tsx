import React, { useState, useEffect } from 'react';
import { OnboardingState, HistoricalPoint, Language, GeneratedPedagogy } from './types';
import Onboarding from './components/Onboarding';
import InteractiveMap from './components/InteractiveMap';
import DetailsPanel from './components/DetailsPanel';
import PedagogyGenerator from './components/PedagogyGenerator';
import ExportPanel from './components/ExportPanel';
import EmpireComparison from './components/EmpireComparison';
import QuizSimulator from './components/QuizSimulator';
import ParallelTimeline from './components/ParallelTimeline';
import { defaultHistoricalPoints } from './data/defaultDataset';
import { polarisHistoricalPoints } from './data/polarisPoints';
import { translations } from './utils/translations';
import { BookOpen, Map, HelpCircle, LogOut, Compass } from 'lucide-react';
import { translateDictionary, translatePoint, WORLD_LANGUAGES } from './utils/translator';

export default function App() {
  const [profile, setProfile] = useState<OnboardingState | null>(null);
  
  // Dynamic Translation System states
  const [customTranslations, setCustomTranslations] = useState<Record<string, Record<string, string>>>({});
  const [translatingInterface, setTranslatingInterface] = useState<boolean>(false);
  const [translatedPoint, setTranslatedPoint] = useState<HistoricalPoint | null>(null);
  const [translatingPoint, setTranslatingPoint] = useState<boolean>(false);

  // Historical database toggling between curated highlights and broad Polaris database
  const [datasetType, setDatasetType] = useState<'curated' | 'polaris'>('curated');
  
  const points = datasetType === 'curated' ? defaultHistoricalPoints : polarisHistoricalPoints;
  
  const [selectedPoint, setSelectedPoint] = useState<HistoricalPoint | null>(null);
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);
  const [selectedBibId, setSelectedBibId] = useState<string | null>(null);

  // Map Filter states
  const [activeEra, setActiveEra] = useState<'all' | 'pre_bronze' | 'antiquity' | 'classical_era'>('all');
  const [activeRegion, setActiveRegion] = useState<'all' | 'nile_valley' | 'horn_of_africa' | 'west_africa' | 'north_africa' | 'central_sahara' | 'custom'>('all');

  // List of generated materials (stored in localStorage for persistence)
  const [savedResources, setSavedResources] = useState<GeneratedPedagogy[]>([]);
  const [activeResource, setActiveResource] = useState<GeneratedPedagogy | null>(null);
  const [activeTab, setActiveTab] = useState<'generator' | 'timeline' | 'comparison' | 'quiz'>('generator');

  // Load resources from localStorage on first client render
  useEffect(() => {
    const cached = localStorage.getItem('ancient_africa_pedagogies');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setSavedResources(parsed);
        if (parsed.length > 0) {
          setActiveResource(parsed[parsed.length - 1]);
        }
      } catch (err) {
        console.error("Failed to parse cached resources", err);
      }
    }
  }, []);

  // 1. Dynamic Translator for Custom Interface strings
  useEffect(() => {
    if (!profile) return;
    const langCode = profile.language;
    
    // If it's a natively supported language or already translated, skip background processing
    const isNative = ['pt', 'en', 'fr', 'es'].includes(langCode);
    if (isNative || customTranslations[langCode]) {
      setTranslatingInterface(false);
      return;
    }

    let active = true;
    const loadTranslation = async () => {
      setTranslatingInterface(true);
      try {
        // Translate from Portuguese (original highly structural baseline)
        const translatedDict = await translateDictionary(translations['pt'], langCode, 'pt');
        if (active) {
          setCustomTranslations((prev) => ({
            ...prev,
            [langCode]: translatedDict,
          }));
        }
      } catch (e) {
        console.error("Failed to dynamically translate system dictionary:", e);
      } finally {
        if (active) {
          setTranslatingInterface(false);
        }
      }
    };

    loadTranslation();
    return () => {
      active = false;
    };
  }, [profile?.language]);

  // 2. Dynamic Point, Document, & bibliography Translator
  useEffect(() => {
    if (!profile || !selectedPoint) {
      setTranslatedPoint(null);
      return;
    }
    const langCode = profile.language;
    const isNative = ['pt', 'en', 'fr', 'es'].includes(langCode);
    
    // If native language is selected, use original straight static mapping
    if (isNative) {
      setTranslatedPoint(null);
      setTranslatingPoint(false);
      return;
    }

    // Check if the current translatedPoint state already matches selectedPoint and has the translated code
    if (translatedPoint?.id === selectedPoint.id && translatedPoint.name[langCode]) {
      return;
    }

    let active = true;
    const loadPointTranslation = async () => {
      setTranslatingPoint(true);
      try {
        const result = await translatePoint(selectedPoint, langCode);
        if (active) {
          setTranslatedPoint(result);
        }
      } catch (err) {
        console.error("Failed to translate selected map point details:", err);
      } finally {
        if (active) {
          setTranslatingPoint(false);
        }
      }
    };

    loadPointTranslation();
    return () => {
      active = false;
    };
  }, [profile?.language, selectedPoint]);

  // Auto-select initial curated point once user completes onboarding
  useEffect(() => {
    if (profile && !selectedPoint && defaultHistoricalPoints.length > 0) {
      const pt = defaultHistoricalPoints[0];
      setSelectedPoint(pt);
      setSelectedDocId(pt.primaryDocuments?.length > 0 ? pt.primaryDocuments[0].id : null);
      setSelectedBibId(pt.bibliography?.length > 0 ? `${pt.bibliography[0].author}_0` : null);
    }
  }, [profile, selectedPoint]);

  // Sync selection when switching dataset types
  const handleDatasetTypeChange = (type: 'curated' | 'polaris') => {
    setDatasetType(type);
    const newPoints = type === 'curated' ? defaultHistoricalPoints : polarisHistoricalPoints;
    if (newPoints.length > 0) {
      // Auto-select first point of selected set for user convenience
      const pt = newPoints[0];
      setSelectedPoint(pt);
      setSelectedDocId(pt.primaryDocuments?.length > 0 ? pt.primaryDocuments[0].id : null);
      setSelectedBibId(pt.bibliography?.length > 0 ? `${pt.bibliography[0].author}_0` : null);
    } else {
      setSelectedPoint(null);
      setSelectedDocId(null);
      setSelectedBibId(null);
    }
  };

  // Update localStorage when savedResources change
  const saveResourcesToStorage = (updated: GeneratedPedagogy[]) => {
    setSavedResources(updated);
    localStorage.setItem('ancient_africa_pedagogies', JSON.stringify(updated));
  };

  const handleSelectPoint = (pt: HistoricalPoint) => {
    setSelectedPoint(pt);
    // Reset selected grounding document or bibliography when site selection shifts
    setSelectedDocId(pt.primaryDocuments?.length > 0 ? pt.primaryDocuments[0].id : null);
    setSelectedBibId(pt.bibliography?.length > 0 ? `${pt.bibliography[0].author}_0` : null);
  };

  const handleSaveResource = (res: GeneratedPedagogy) => {
    const updated = [...savedResources, res];
    saveResourcesToStorage(updated);
    setActiveResource(res);
  };

  const handleDeleteResource = (id: string) => {
    const updated = savedResources.filter(r => r.id !== id);
    saveResourcesToStorage(updated);
    if (activeResource?.id === id) {
      setActiveResource(updated.length > 0 ? updated[updated.length - 1] : null);
    }
  };

  // Skip onboarding step if profile was selected
  if (!profile) {
    return <Onboarding onComplete={(state) => setProfile(state)} />;
  }

  const t = customTranslations[profile.language] || translations[profile.language] || translations['pt'];
  const activePoint = translatedPoint || selectedPoint;

  return (
    <div id="application-container" className="min-h-screen bg-[#faf6ee] text-[#2c231e] flex flex-col font-sans select-none antialiased pb-12">
      {/* Upper Navigation Header Bar containing dynamic settings configurations */}
      <header id="app-header" className="bg-[#fcfbf7] border-b border-[#e5dfd5] sticky top-0 z-40 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-[#f6f2ea] rounded border border-[#d5cebf] text-[#7a2c22]">
              <BookOpen className="h-5 w-5 text-[#ba9a6f]" />
            </div>
            <div>
              <h1 id="header-main-title" className="text-base font-serif font-bold text-[#7a2c22] leading-none">
                {t.appTitle}
              </h1>
              <p className="text-[10px] text-[#5c544d] mt-1.5 font-mono uppercase tracking-wider">
                {t.appSubtitle}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            {/* Quick Profile Indicators */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-white rounded border border-[#d5cebf] text-[10px] font-mono text-[#5c544d]">
              <span>{t.gradeLevel}:</span>
              <span className="text-[#7a2c22] font-bold uppercase">{t[profile.gradeLevel]}</span>
            </div>

            {/* Dynamic Globe Dropdown for any world language, separated by continent */}
            <div className="flex items-center gap-1.5 bg-white rounded border border-[#d5cebf] px-2.5 py-1.5 select-none relative">
              <span className="text-xs flex items-center gap-1">
                {translatingInterface ? (
                  <span className="h-2 w-2 rounded-full bg-amber-500 animate-pulse" />
                ) : (
                  <span>🌐</span>
                )}
                <span className="text-[10px] font-mono text-[#8c8273] font-bold uppercase hidden sm:inline">{t.selectLanguage || "Idioma"}:</span>
              </span>
              <select
                id="header-global-selector"
                value={profile.language}
                onChange={(e) => setProfile({ ...profile, language: e.target.value })}
                className="bg-transparent border-none text-xs text-[#2c231e] font-sans font-bold cursor-pointer outline-none max-w-[130px] sm:max-w-none"
              >
                {/* Core Hardcoded options */}
                <option value="pt">🇧🇷 Português</option>
                <option value="en">🇺🇸 English</option>
                <option value="fr">🇫🇷 Français</option>
                <option value="es">🇪🇸 Español</option>
                
                {/* Dynamically select current custom language if it isn't hardcoded */}
                {!['pt', 'en', 'fr', 'es'].includes(profile.language) && (
                  <option value={profile.language}>
                    {WORLD_LANGUAGES.find(w => w.code === profile.language)?.flag || "🌍"}{' '}
                    {WORLD_LANGUAGES.find(w => w.code === profile.language)?.name || profile.language}
                  </option>
                )}

                {/* Continental categories */}
                <optgroup label="África">
                  <option value="sw">🇰🇪 Kiswahili</option>
                  <option value="yo">🇳🇬 Yorùbá</option>
                  <option value="zu">🇿🇦 isiZulu</option>
                  <option value="am">🇪🇹 Amharic</option>
                  <option value="ar">🇪🇬 العربية</option>
                </optgroup>
                <optgroup label="Europa">
                  <option value="it">🇮🇹 Italiano</option>
                  <option value="de">🇩🇪 Deutsch</option>
                </optgroup>
                <optgroup label="Ásia & Oceania">
                  <option value="hi">🇮🇳 Hindi</option>
                  <option value="bn">🇧🇩 Bengali</option>
                  <option value="zh-CN">🇨🇳 Mandarin</option>
                  <option value="ja">🇯🇵 日本語</option>
                  <option value="ko">🇰🇷 한국어</option>
                  <option value="vi">🇻🇳 Tiếng Việt</option>
                  <option value="id">🇮🇩 Bahasa Indonesia</option>
                </optgroup>
              </select>
            </div>

            {/* Log out / Reset button */}
            <button
              id="reset-profile-btn"
              onClick={() => setProfile(null)}
              className="p-1.5 bg-white hover:bg-[#faf9f4] border border-[#d5cebf] rounded text-[#8c8273] hover:text-[#7a2c22] text-xs flex items-center gap-1 transition-all cursor-pointer shadow-sm"
              title="Voltar para configuração"
            >
              <LogOut className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </header>

      {/* Primary Dashboard Area divided systematically inside Desktop-first Bento Grid columns */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start flex-1">
        
        {/* Dynamic translation feedback banner */}
        {translatingInterface && (
          <div className="col-span-12 bg-amber-50 border border-amber-200 text-amber-800 rounded-lg p-3 text-xs flex items-center justify-between shadow-xs animate-pulse font-sans">
            <span className="flex items-center gap-2 font-medium">
              <span className="inline-block animate-spin">⏳</span>
              Traduzindo interface acadêmica para o idioma curricular selecionado ({WORLD_LANGUAGES.find(w => w.code === profile.language)?.name || profile.language.toUpperCase()})...
            </span>
            <span className="font-mono text-[9px] text-amber-600 uppercase tracking-widest hidden sm:inline">IA Ativa</span>
          </div>
        )}

        {translatingPoint && (
          <div className="col-span-12 bg-teal-50 border border-teal-200 text-teal-800 rounded-lg p-3 text-xs flex items-center justify-between shadow-xs animate-pulse font-sans">
            <span className="flex items-center gap-2 font-medium">
              <span className="inline-block h-2 w-2 rounded-full bg-teal-500 animate-ping" />
              Obtendo evidências e traduzindo registros de {selectedPoint?.name['en']} para {WORLD_LANGUAGES.find(w => w.code === profile.language)?.name || profile.language.toUpperCase()}...
            </span>
            <span className="font-mono text-[9px] text-teal-600 uppercase tracking-widest hidden sm:inline">Seshat Live API</span>
          </div>
        )}
        
        {/* Left Column (7/12 grid cells): Map Canvas Visualizer, Layers, and XLSX Spreadsheet processor */}
        <div className="lg:col-span-7 flex flex-col gap-6 h-full">
          {/* SVG Map anchor */}
          <div className="flex-1">
            <InteractiveMap
              language={profile.language}
              points={points}
              selectedPointId={selectedPoint ? selectedPoint.id : null}
              onSelectPoint={handleSelectPoint}
              activeEra={activeEra}
              onChangeEra={setActiveEra}
              activeRegion={activeRegion}
              onChangeRegion={setActiveRegion}
              datasetType={datasetType}
              onChangeDatasetType={handleDatasetTypeChange}
            />
          </div>

          {/* Academic Atlas Information (Atlas Acadêmico) */}
          <div className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5] p-5 shadow-sm text-slate-800 font-sans">
            <h4 className="text-xs uppercase font-serif font-bold tracking-wider text-[#7a2c22] mb-2 flex items-center gap-1.5">
              <Compass className="h-4 w-4 text-[#7a2c22]" />
              {t.methodologicalTitle}
            </h4>
            <p className="text-[11px] text-[#5c544d] leading-relaxed text-justify mb-3">
              {t.methodologicalDesc}
            </p>
            <div className="flex justify-between items-center text-[10px] text-[#8c8273] font-mono border-t border-[#e5dfd5]/85 pt-3">
              <span>{t.libraryActive.replace('{count}', points.length.toString())}</span>
              <span className="text-[#3e5a4d] font-bold">● Grounded in Seshat</span>
            </div>
          </div>
        </div>

        {/* Right Column (5/12 grid cells): Historical Sources, AI Generation triggers, Draft editors, and Exports */}
        <div className="lg:col-span-5 flex flex-col gap-6 h-full">
          
          {/* Tab selector bar styled with terracotta borders and elegant spacing */}
          <div className="flex border-b border-[#e5dfd5] bg-[#fcfbf7] p-1.5 rounded-lg border shadow-3xs gap-2 overflow-x-auto scrollbar-none">
            {(['generator', 'timeline', 'comparison', 'quiz'] as const).map((tab) => {
              const isActive = activeTab === tab;
              return (
                <button
                  key={tab}
                  id={`tab-button-${tab}`}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 py-3 px-2 text-center rounded text-xs font-serif font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-[#7a2c22] text-white shadow-xs'
                      : 'text-[#5c544d] hover:text-[#7a2c22] hover:bg-[#faf6ee]'
                  }`}
                >
                  {tab === 'generator' && t.tabGenerator}
                  {tab === 'timeline' && t.tabTimeline}
                  {tab === 'comparison' && t.tabComparison}
                  {tab === 'quiz' && t.tabQuiz}
                </button>
              );
            })}
          </div>

          {/* Tab contents */}
          {activeTab === 'generator' && (
            <div className="flex flex-col gap-6 animate-fade-in">
              {/* Site details with documents and suggestions */}
              <div>
                <DetailsPanel
                  language={profile.language}
                  point={activePoint}
                  selectedDocId={selectedDocId}
                  onSelectDoc={setSelectedDocId}
                  selectedBibId={selectedBibId}
                  onSelectBib={setSelectedBibId}
                />
              </div>

              {/* Grounded AI Pedagogical resource generator tool */}
              <div>
                <PedagogyGenerator
                  language={profile.language}
                  point={activePoint}
                  selectedDocId={selectedDocId}
                  selectedBibId={selectedBibId}
                  gradeLevel={profile.gradeLevel}
                  focusTopics={profile.focusTopics}
                  onSaveResource={handleSaveResource}
                />
              </div>

              {/* Stored materials repository + high quality exporters center */}
              <div>
                <ExportPanel
                  language={profile.language}
                  savedResources={savedResources}
                  onDeleteResource={handleDeleteResource}
                  activeResource={activeResource}
                  onSelectResource={setActiveResource}
                />
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div className="animate-fade-in">
              <ParallelTimeline
                language={profile.language}
                selectedPoint={activePoint}
                points={points}
                onSelectPoint={handleSelectPoint}
              />
            </div>
          )}

          {activeTab === 'comparison' && (
            <div className="animate-fade-in">
              <EmpireComparison
                language={profile.language}
                points={points}
              />
            </div>
          )}

          {activeTab === 'quiz' && (
            <div className="animate-fade-in">
              <QuizSimulator
                language={profile.language}
                point={activePoint}
                onboardingFocus={profile.focusTopics}
              />
            </div>
          )}

        </div>

      </main>
    </div>
  );
}
