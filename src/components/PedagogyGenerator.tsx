import React, { useState } from 'react';
import { HistoricalPoint, Language, PedagogicalFormat, GeneratedPedagogy } from '../types';
import { translations } from '../utils/translations';
import { Sparkles, FileText, Check, ChevronRight, AlertCircle, Edit3, Save, Download, Globe } from 'lucide-react';
import { generatePedagogyPDF } from '../utils/pdfGenerator';
import { translateText, WORLD_LANGUAGES } from '../utils/translator';

interface PedagogyGeneratorProps {
  language: Language;
  point: HistoricalPoint | null;
  selectedDocId: string | null;
  selectedBibId: string | null;
  gradeLevel: 'primary' | 'middle' | 'high' | 'university';
  focusTopics: string[];
  onSaveResource: (resource: GeneratedPedagogy) => void;
}

export default function PedagogyGenerator({
  language,
  point,
  selectedDocId,
  selectedBibId,
  gradeLevel,
  focusTopics,
  onSaveResource
}: PedagogyGeneratorProps) {
  const t = translations[language];

  const [format, setFormat] = useState<PedagogicalFormat>('lesson_plan');
  const [duration, setDuration] = useState<string>('50');
  const [curriculum, setCurriculum] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  
  // Storage for the active editable AI-generated content
  const [aiDraft, setAiDraft] = useState<string | null>(null);
  const [draftTitle, setDraftTitle] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);
  const [isTranslating, setIsTranslating] = useState<boolean>(false);

  // Reassuring animated messages during generation
  const [loadingStep, setLoadingStep] = useState<number>(0);

  const loadingMessages = [
    { pt: "Analisando fontes primárias e artefatos arqueológicos da civilização...", en: "Analyzing primary sources and archaeological artifacts for grounding...", fr: "Analyse des sources primaires et des vestiges archéologiques...", es: "Analizando fuentes primarias y evidencias arqueológicas..." },
    { pt: "Estruturando cronologia precisa do sítio...", en: "Structuring correct temporal and historical timeline metrics...", fr: "Mise en adéquation de la frise chronologique...", es: "Estructurando la cronología exacta del yacimiento..." },
    { pt: "Vinculando referências bibliográficas historiográficas sugeridas pelo educador...", en: "Weaving selected academic bibliography frameworks directly into pedagogy...", fr: "Liaison avec les recommandations historiographiques de l'éducateur...", es: "Enlazando las recomendaciones bibliográficas sugeridas por el educador..." },
    { pt: "Redigindo planos de ação de aula de viés multicultural, inclusivo e analítico...", en: "Drafting lesson instructions aiming for inclusive, plural, and rich historical analysis...", fr: "Formulation d'activités inclusives et de démarches méthodologiques...", es: "Redactando metodologías para una clase multicultural e inclusiva..." }
  ];

  const triggerGeneration = async () => {
    if (!point) {
      setErrorMsg(language === 'pt' ? "Selecione primeiro um ponto no mapa." : "Please select a historical point on the map first.");
      return;
    }

    setLoading(true);
    setErrorMsg(null);
    setSaveSuccess(false);
    setAiDraft(null);
    setLoadingStep(0);

    // Dynamic timer to rotate reassuring message steps
    const timer = setInterval(() => {
      setLoadingStep((prev) => (prev + 1) % loadingMessages.length);
    }, 2800);

    try {
      const payload = {
        language,
        pointId: point.id,
        pointName: point.name[language],
        eraLabel: point.eraLabel[language],
        regionLabel: point.regionLabel[language],
        period: point.period[language],
        description: point.description[language],
        format,
        duration: `${duration} ${format === 'didactic_sequence' ? t.lessons : t.minutes}`,
        gradeLevel: gradeLevel,
        curriculum: curriculum || translations[language].curriculumPlaceholder,
        // Send selected documents values
        selectedDoc: point.primaryDocuments?.find(d => d.id === selectedDocId) || null,
        // Send selected bibliography
        selectedBib: point.bibliography?.find((b, i) => `${b.author}_${i}` === selectedBibId) || null,
        onboardingFocus: focusTopics
      };

      const response = await fetch('/api/gemini/generate-pedagogy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate tool from server.");
      }

      const responseData = await response.json();
      
      const generatedMarkdown = responseData.htmlContent || responseData.text;
      const cleanTitle = responseData.title || `${t[format]} - ${point.name[language]}`;

      setAiDraft(generatedMarkdown);
      setDraftTitle(cleanTitle);
      
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Error executing server AI generation.');
    } finally {
      clearInterval(timer);
      setLoading(false);
    }
  };

  const handleSaveResult = () => {
    if (!aiDraft || !point) return;

    const resource: GeneratedPedagogy = {
      id: `saved_res_${Date.now()}`,
      format,
      pointId: point.id,
      pointName: point.name[language],
      title: draftTitle,
      content: aiDraft,
      createdAt: new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US'),
      language
    };

    onSaveResource(resource);
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleDownloadPDF = () => {
    if (!aiDraft || !point) return;

    const tempResource: GeneratedPedagogy = {
      id: `temp_${Date.now()}`,
      format,
      pointId: point.id,
      pointName: point.name[language],
      title: draftTitle,
      content: aiDraft,
      createdAt: new Date().toLocaleDateString(language === 'pt' ? 'pt-BR' : 'en-US'),
      language
    };

    generatePedagogyPDF(tempResource, gradeLevel);
  };

  const handleTranslateDraft = async (targetLangCode: string) => {
    if (!aiDraft) return;
    setIsTranslating(true);
    setErrorMsg(null);
    try {
      const translatedTitle = await translateText(draftTitle, targetLangCode);
      const translatedBody = await translateText(aiDraft, targetLangCode);
      if (translatedTitle) setDraftTitle(translatedTitle);
      if (translatedBody) setAiDraft(translatedBody);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(language === 'pt' ? 'Falha na tradução automática.' : 'Automatic translation failed.');
    } finally {
      setIsTranslating(false);
    }
  };

  return (
    <div id="pedagogy-generator-wrapper" className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5] p-6 shadow-sm text-slate-800 font-sans">
      <div className="flex items-center gap-2 mb-4 border-b border-[#e5dfd5]/85 pb-3">
        <Sparkles className="h-5 w-5 text-[#ba9a6f] animate-pulse" />
        <div>
          <h3 className="text-sm font-serif font-bold text-[#7a2c22] uppercase tracking-wider">
            {t.generatorTitle}
          </h3>
          <p className="text-[10px] text-[#5c544d] font-mono leading-tight">
            {point ? `${point.name[language]} (${point.period[language]})` : "Aguardando ancoragem espacial"}
          </p>
        </div>
      </div>

      {!point ? (
        <div className="p-5 bg-[#faf8f4] rounded border border-[#e5dfd5]/60 text-xs text-[#8c8273] text-center font-serif italic">
          Selecione primeiro uma civilização histórica no mapa para habilitar o gerador didático.
        </div>
      ) : (
        <div className="space-y-4">
          <p className="text-[11.5px] text-[#5c544d] leading-relaxed text-justify italic">
            {t.generatorDesc}
          </p>

          {/* Active educational focus guidance badges */}
          {focusTopics && focusTopics.length > 0 && (
            <div className="bg-[#faf9f4] p-2.5 rounded border border-[#ebdcc5]/40">
              <span className="text-[9.5px] uppercase font-bold text-[#7a2c22] font-mono block mb-1.5">
                🎯 Focos Temáticos Ativos (Guia da IA):
              </span>
              <div className="flex flex-wrap gap-1.5">
                {focusTopics.map((topicId) => {
                  const getTopicLabel = (id: string, lang: Language) => {
                    const map: Record<string, Record<Language, string>> = {
                      social_scale: { pt: "📊 Escala & População", en: "📊 Scale & Population", fr: "📊 Échelle & Population", es: "📊 Escala y Población" },
                      administration: { pt: "🏛️ Governo & Burocracia", en: "🏛️ Government & Bureaucracy", fr: "🏛️ Gouvernement & Lois", es: "🏛️ Gobierno y Leyes" },
                      writing_sources: { pt: "📜 Escrita & Fontes", en: "📜 Writing & Sources", fr: "📜 Écriture & Sources", es: "📜 Escritura y Fuentes" },
                      religions: { pt: "☀️ Filosofia & Crenças", en: "☀️ Beliefs & Philosophy", fr: "☀️ Croyances & Philosophie", es: "☀️ Creencias y Filosofía" },
                      trade_networks: { pt: "🐪 Rotas Comerciais", en: "🐪 Trade Networks", fr: "🐪 Réseaux Commerciaux", es: "🐪 Redes Comerciales" },
                      gender_history: { pt: "👑 Sociedades de Rainhas", en: "👑 Queen Societies", fr: "👑 Lignes de Reines", es: "👑 Sociedades de Reinas" }
                    };
                    return map[id]?.[lang] || id;
                  };

                  return (
                    <span
                      key={topicId}
                      className="px-2 py-1 bg-white border border-[#ebdcc5] rounded text-[10px] text-[#5c544d] font-sans shadow-xs"
                    >
                      {getTopicLabel(topicId, language)}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Form controls */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Format choice */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[#211a15] font-bold uppercase tracking-wider font-mono">
                {t.formatLabel}
              </label>
              <select
                id="select-peds-format"
                value={format}
                onChange={(e) => setFormat(e.target.value as PedagogicalFormat)}
                className="bg-white border border-[#d5cebf] text-[#2c231e] text-[11.5px] rounded p-2.5 outline-none focus:border-[#7a2c22] transition-colors cursor-pointer"
              >
                <option value="lesson_plan">{t.lesson_plan}</option>
                <option value="activity">{t.activity}</option>
                <option value="didactic_sequence">{t.didactic_sequence}</option>
              </select>
            </div>

            {/* Class Duration choice */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] text-[#211a15] font-bold uppercase tracking-wider font-mono">
                {t.durationLabel}
              </label>
              <input
                id="input-peds-duration"
                type="number"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder={format === 'didactic_sequence' ? "3" : "50"}
                className="bg-white border border-[#d5cebf] text-[#2c231e] text-[11.5px] rounded p-2.5 outline-none focus:border-[#7a2c22] font-mono"
              />
            </div>
          </div>

          {/* Curricular syllabus rules */}
          <div className="flex flex-col gap-1.5 font-sans">
            <label className="text-[10px] text-[#211a15] font-bold uppercase tracking-wider font-mono">
              {t.alignLabel}
            </label>
            <input
              id="input-peds-curriculum"
              type="text"
              value={curriculum}
              onChange={(e) => setCurriculum(e.target.value)}
              placeholder={t.curriculumPlaceholder}
              className="bg-white border border-[#d5cebf] text-[#2c231e] text-[11.5px] rounded p-2.5 outline-none focus:border-[#7a2c22]"
            />
          </div>

          {/* Prompt modifiers explanation of grounding values */}
          <div className="p-3 bg-[#faf9f4] rounded border border-[#d5cebf]/50 flex flex-col gap-1.5 text-[10px] font-mono text-[#5c544d] shadow-inner">
            <div className="flex justify-between border-b border-[#e5dfd5]/40 pb-1">
              <span>Grounding Archeotype:</span>
              <span className="text-[#7a2c22] font-bold">{point.name[language].slice(0, 24)}...</span>
            </div>
            <div className="flex justify-between border-b border-[#e5dfd5]/40 pb-1">
              <span>Primary Doc Bound:</span>
              <span className={selectedDocId ? "text-[#3e5a4d] font-bold" : "text-[#9c8262] italic"}>
                {selectedDocId ? "✓ Linked / Excerpt" : "No Segment selected"}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Historiography Ref:</span>
              <span className={selectedBibId ? "text-[#3e5a4d] font-bold" : "text-[#9c8262] italic"}>
                {selectedBibId ? "✓ Linked / Bibliography" : "No Reference selected"}
              </span>
            </div>
          </div>

          {errorMsg && (
            <div className="p-3 bg-[#fdf2f2] border border-[#f8b4b4] rounded flex items-center gap-2 text-[11px] text-[#9c2b2b]">
              <AlertCircle className="h-4 w-4 text-[#9c2b2b] shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Loading status indicator with rotating historical reassurance */}
          {loading && (
            <div className="p-5 bg-[#faf9f4] rounded border border-[#edf3ef] text-center flex flex-col items-center justify-center gap-3">
              <div className="w-8 h-8 border-3 border-[#7a2c22] border-t-transparent rounded-full animate-spin" />
              <div className="text-xs font-serif font-bold text-[#7a2c22] animate-pulse">
                {t.generating}
              </div>
              <p className="text-[10.5px] text-[#5c544d] font-sans italic max-w-sm">
                "{loadingMessages[loadingStep][language]}"
              </p>
            </div>
          )}

          {/* Build action trigger */}
          {!loading && (
            <button
              id="btn-generate-ai"
              type="button"
              onClick={triggerGeneration}
              className="w-full py-3 bg-[#7a2c22] hover:bg-[#8e3328] text-white font-serif font-bold text-xs uppercase tracking-wider rounded transition-all shadow-sm active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-white" />
              {t.generateBtn}
            </button>
          )}

          {/* AI generated sheet preview + Rich Editor inline so teachers do not have text cut-off */}
          {aiDraft && (
            <div className="border-t border-[#e5dfd5]/85 pt-5 mt-4 flex flex-col gap-3">
              <div className="flex flex-wrap items-center justify-between gap-2 bg-[#faf9f4] p-2.5 rounded border border-[#e5dfd5]">
                <div className="flex items-center gap-2">
                  <FileText className="h-4 w-4 text-[#7a2c22]" />
                  <span className="text-[11px] font-bold text-[#211a15] font-serif truncate max-w-[120px] sm:max-w-[180px]">
                    {draftTitle}
                  </span>
                </div>
                
                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Custom seamless Translator widget with global world coverage */}
                  <div className="flex items-center gap-1 bg-[#fffaf0] border border-[#f0e2cd] rounded px-1.5 py-0.5 text-[9.5px]">
                    <Globe className={`h-3 w-3 text-[#ba9a6f] ${isTranslating ? 'animate-spin' : ''}`} />
                    <select
                      id="pedagogy-inline-translator"
                      disabled={isTranslating}
                      onChange={(e) => {
                        if (e.target.value) {
                          handleTranslateDraft(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="bg-transparent border-none text-[#2c231e] font-sans font-bold cursor-pointer outline-none max-w-[105px]"
                    >
                      <option value="">{isTranslating ? "..." : t.globalTranslation.split(' ')[0]}</option>
                      {WORLD_LANGUAGES.map((wl) => (
                        <option key={wl.code} value={wl.code} disabled={isTranslating}>
                          {wl.flag} {wl.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    id="btn-draft-edit"
                    onClick={() => setIsEditing(!isEditing)}
                    className="text-[10px] px-2 py-1 bg-white text-[#5c544d] hover:text-[#211a15] border border-[#d5cebf] rounded flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <Edit3 className="h-3 w-3" />
                    {isEditing ? "View" : "Edit"}
                  </button>

                  <button
                    id="btn-draft-download-pdf"
                    onClick={handleDownloadPDF}
                    className="text-[10px] px-2 py-1 bg-[#fff8eb] text-[#7a2c22] hover:bg-[#ebdcc5]/20 border border-[#ba9a6f]/40 rounded flex items-center gap-1 transition-colors cursor-pointer font-bold"
                  >
                    <Download className="h-3 w-3" />
                    PDF
                  </button>

                  <button
                    id="btn-draft-save"
                    onClick={handleSaveResult}
                    className="text-[10px] px-2 py-1 bg-[#edf3ef] text-[#3e5a4d] border border-[#cfdfd4] rounded flex items-center gap-1 transition-colors cursor-pointer font-bold"
                  >
                    {saveSuccess ? <Check className="h-3 w-3" /> : <Save className="h-3 w-3" />}
                    {saveSuccess ? "Saved!" : "Store Plan"}
                  </button>
                </div>
              </div>

              {isEditing ? (
                <div className="flex flex-col gap-2">
                  <input
                    id="edit-draft-title-input"
                    type="text"
                    value={draftTitle}
                    onChange={(e) => setDraftTitle(e.target.value)}
                    className="bg-white border border-[#d5cebf] text-[#2c231e] text-[11px] font-bold font-serif rounded p-2 outline-none focus:border-[#7a2c22]"
                  />
                  <textarea
                    id="edit-draft-body-textarea"
                    rows={12}
                    value={aiDraft}
                    onChange={(e) => setAiDraft(e.target.value)}
                    className="w-full bg-white text-[#2c231e] text-[11px] font-mono p-3.5 rounded border border-[#d5cebf] focus:border-[#7a2c22] focus:outline-none leading-relaxed"
                  />
                </div>
              ) : (
                <div 
                  id="rendered-ai-preview" 
                  className="bg-white p-5 rounded border border-[#e5dfd5] text-[12px] text-[#2c231e] font-serif leading-relaxed max-h-[380px] overflow-y-auto overflow-x-hidden text-justify prose select-text break-words pr-2"
                >
                  <h3 className="text-[#7a2c22] font-serif font-bold text-sm mb-3.5 border-b border-[#e5dfd5]/40 pb-1.5">{draftTitle}</h3>
                  <div className="whitespace-pre-line leading-relaxed antialiased font-serif">
                    {aiDraft}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
