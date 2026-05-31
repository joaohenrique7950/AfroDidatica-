import React from 'react';
import { HistoricalPoint, Language, PrimaryDocument, BibliographyEntry } from '../types';
import { translations } from '../utils/translations';
import { FileText, BookOpen, Clock, Globe, Award, Compass, HeartHandshake, Landmark, Users, Shield, Languages, AwardIcon, Sparkles, Scroll, Crown } from 'lucide-react';
import { politiesExtractionsData } from '../data/extractionsDataset';

interface DetailsPanelProps {
  language: Language;
  point: HistoricalPoint | null;
  selectedDocId: string | null;
  onSelectDoc: (docId: string | null) => void;
  selectedBibId: string | null; // using author or index
  onSelectBib: (bibAuthor: string | null) => void;
}

export default function DetailsPanel({
  language,
  point,
  selectedDocId,
  onSelectDoc,
  selectedBibId,
  onSelectBib
}: DetailsPanelProps) {
  const t = translations[language];

  if (!point) {
    return (
      <div id="no-point-panel" className="bg-[#faf8f4] rounded-lg border border-[#e5dfd5] p-8 h-full flex flex-col items-center justify-center text-center shadow-sm">
        <div className="p-4 bg-white rounded-full text-[#c5a880] mb-4 border border-[#e5dfd5] animate-pulse">
          <Compass className="h-9 w-9" />
        </div>
        <h4 className="font-serif text-[#7a2c22] font-bold text-sm uppercase tracking-wider">
          Explorador de Arquivos Históricos
        </h4>
        <p className="text-[#5c544d] text-xs max-w-sm leading-relaxed mt-2 italic">
          {t.noPointSelected}
        </p>
      </div>
    );
  }

  return (
    <div id="details-panel-wrapper" className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5] p-6 shadow-sm flex flex-col gap-6 max-h-[90vh] overflow-y-auto scrollbar-thin scrollbar-thumb-slate-200">
      
      {/* Title block */}
      <div className="border-b border-[#e5dfd5]/85 pb-4">
        <div className="flex gap-2 items-center flex-wrap mb-2">
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-[#f6f2ea] border border-[#d5cebf] text-[#7a2c22] rounded font-mono">
            {point.regionLabel[language]}
          </span>
          <span className="text-[10px] uppercase font-bold tracking-widest px-2.5 py-0.5 bg-[#edf3ef] border border-[#cfdfd4] text-[#3e5a4d] rounded font-mono">
            {point.eraLabel[language]}
          </span>
        </div>
        
        <h2 id="point-details-title" className="text-xl font-serif font-bold text-[#211a15] flex items-center gap-2">
          {point.name[language]}
        </h2>
        
        <div className="text-xs text-[#5c544d] mt-2 flex items-center gap-1.5 font-mono">
          <Clock className="h-3.5 w-3.5 text-[#9c8262]" />
          <span>{t.period}:</span>
          <span className="text-[#7a2c22] font-bold">{point.period[language]}</span>
        </div>
      </div>

      {/* Narrative Description */}
      <div>
        <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#9c8262] font-mono mb-2">
          {t.aboutPoint}
        </h4>
        <p className="text-[#2c231e] text-[12px] leading-relaxed font-sans text-justify bg-[#faf9f4] p-4 rounded border border-[#e5dfd5]/30 shadow-inner">
          {point.description[language]}
        </p>
      </div>

      {/* Seshat Scientific Databank Panel */}
      {point.seshatData && (
        <div className="border-t border-[#e5dfd5]/85 pt-5">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7a2c22] font-mono mb-3.5 flex items-center gap-1.5">
            <Landmark className="h-4 w-4" />
            Seshat Historical Database Variables
          </h4>
          <p className="text-[10px] text-[#5c544d] mb-3 leading-snug">
            Variáveis quantitativas de complexidade social extraídas e mapeadas da planilha oficial Polaris:
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* Capital */}
            {point.seshatData.capital && (
              <div className="p-2.5 bg-[#faf9f4] rounded border border-[#edf3ef] flex items-start gap-2">
                <Landmark className="h-4 w-4 text-[#7a2c22] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#9c8262] font-mono leading-none">Capital / Sítios</div>
                  <div className="text-[11px] font-bold text-[#211a15] mt-1">{point.seshatData.capital[language]}</div>
                </div>
              </div>
            )}

            {/* Territory */}
            {point.seshatData.territory && (
              <div className="p-2.5 bg-[#faf9f4] rounded border border-[#edf3ef] flex items-start gap-2">
                <Globe className="h-4 w-4 text-[#7a2c22] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#9c8262] font-mono leading-none">Extensão Territorial</div>
                  <div className="text-[11px] font-bold text-[#211a15] mt-1">{point.seshatData.territory[language]}</div>
                </div>
              </div>
            )}

            {/* Estimated Population */}
            {point.seshatData.population && (
              <div className="p-2.5 bg-[#faf9f4] rounded border border-[#edf3ef] flex items-start gap-2">
                <Users className="h-4 w-4 text-[#7a2c22] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#9c8262] font-mono leading-none">População Estimada</div>
                  <div className="text-[11px] font-bold text-[#211a15] mt-1">{point.seshatData.population[language]}</div>
                </div>
              </div>
            )}

            {/* Government Type */}
            {point.seshatData.governmentType && (
              <div className="p-2.5 bg-[#faf9f4] rounded border border-[#edf3ef] flex items-start gap-2">
                <Shield className="h-4 w-4 text-[#7a2c22] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#9c8262] font-mono leading-none">Estrutura Estatal</div>
                  <div className="text-[11px] font-bold text-[#211a15] mt-1">{point.seshatData.governmentType[language]}</div>
                </div>
              </div>
            )}

            {/* Spoken Languages */}
            {point.seshatData.languages && (
              <div className="p-2.5 bg-[#faf9f4] rounded border border-[#edf3ef] flex items-start gap-2">
                <Languages className="h-4 w-4 text-[#7a2c22] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#9c8262] font-mono leading-none">Línguas Faladas</div>
                  <div className="text-[11px] font-bold text-[#211a15] mt-1">{point.seshatData.languages[language]}</div>
                </div>
              </div>
            )}

            {/* Religion & Morality */}
            {point.seshatData.religionInfo && (
              <div className="p-2.5 bg-[#faf9f4] rounded border border-[#edf3ef] flex items-start gap-2 col-span-1 md:col-span-2">
                <AwardIcon className="h-4 w-4 text-[#7a2c22] shrink-0 mt-0.5" />
                <div>
                  <div className="text-[9px] uppercase font-bold text-[#9c8262] font-mono leading-none">Punibilidade Sobrenatural / Crenças (Ma'at ou Religião Moral)</div>
                  <div className="text-[11px] font-bold text-[#211a15] mt-1">{point.seshatData.religionInfo[language]}</div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Empirical Extractions Block (Administrative, Writing, Matrilineal) */}
      {(() => {
        const extraData = politiesExtractionsData[point.id];
        if (!extraData) return null;
        const lang = language === 'pt' || language === 'en' || language === 'fr' || language === 'es' ? language : 'pt';
        
        return (
          <div id="polaris-extra-insights" className="border-t border-[#e5dfd5]/85 pt-5 space-y-4">
            <h4 className="text-[10.5px] uppercase font-bold tracking-wider text-[#3e5a4d] font-mono flex items-center gap-1.5">
              <Sparkles className="h-4 w-4 text-[#3e5a4d]" />
              Dados Contemplados & Extraíveis (What can we extract)
            </h4>
            <p className="text-[10px] text-[#5c544d] leading-snug">
              Três paradigmas empíricos de complexidade civilizacional africana extraídos do dataset Polaris / Seshat:
            </p>

            <div className="space-y-3">
              {/* Administrative Levels */}
              <div className="p-3 bg-[#fdfcf7] rounded-lg border border-[#3e5a4d]/20 shadow-xs flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#211a15]">
                  <Shield className="h-3.5 w-3.5 text-[#3e5a4d]" />
                  <span>{extraData.administrativeLevels.title[lang] || extraData.administrativeLevels.title['en']}</span>
                </div>
                <div className="text-[10.5px] text-[#5c544d] italic leading-tight">
                  {extraData.administrativeLevels.description[lang] || extraData.administrativeLevels.description['en']}
                </div>
                <div className="text-[11px] text-[#2c231e] font-sans leading-relaxed mt-1 border-t border-[#e5dfd5]/40 pt-1.5 text-justify bg-white/60 p-2 rounded">
                  <span className="font-bold text-[#3e5a4d]">✓ Hierarquia Pública:</span> {extraData.administrativeLevels.evidence[lang] || extraData.administrativeLevels.evidence['en']}
                </div>
              </div>

              {/* Writing Systems */}
              <div className="p-3 bg-[#fdfcf7] rounded-lg border border-[#20898c]/20 shadow-xs flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#211a15]">
                  <Scroll className="h-3.5 w-3.5 text-[#20898c]" />
                  <span>{extraData.writingSystems.title[lang] || extraData.writingSystems.title['en']}</span>
                </div>
                <div className="text-[10.5px] text-[#5c544d] italic leading-tight">
                  {extraData.writingSystems.description[lang] || extraData.writingSystems.description['en']}
                </div>
                <div className="text-[11px] text-[#2c231e] font-sans leading-relaxed mt-1 border-t border-[#e5dfd5]/40 pt-1.5 text-justify bg-white/60 p-2 rounded">
                  <span className="font-bold text-[#20898c]">✓ Sistemas de Escrita Ativos:</span> {extraData.writingSystems.evidence[lang] || extraData.writingSystems.evidence['en']}
                </div>
              </div>

              {/* Matrilineal Alliances */}
              <div className="p-3 bg-[#fdfcf7] rounded-lg border border-[#8d3cbc]/20 shadow-xs flex flex-col gap-1">
                <div className="flex items-center gap-1.5 text-[11px] font-bold text-[#211a15]">
                  <Crown className="h-3.5 w-3.5 text-[#8d3cbc]" />
                  <span>{extraData.matrilinealAlliances.title[lang] || extraData.matrilinealAlliances.title['en']}</span>
                </div>
                <div className="text-[10.5px] text-[#5c544d] italic leading-tight">
                  {extraData.matrilinealAlliances.description[lang] || extraData.matrilinealAlliances.description['en']}
                </div>
                <div className="text-[11px] text-[#2c231e] font-sans leading-relaxed mt-1 border-t border-[#e5dfd5]/40 pt-1.5 text-justify bg-white/60 p-2 rounded">
                  <span className="font-bold text-[#8d3cbc]">✓ Linhagem Sovereign & Gênero:</span> {extraData.matrilinealAlliances.evidence[lang] || extraData.matrilinealAlliances.evidence['en']}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* Interactive Primary Documents Container */}
      {point.primaryDocuments && point.primaryDocuments.length > 0 && (
        <div className="border-t border-[#e5dfd5]/85 pt-5">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7a2c22] font-mono mb-3 flex items-center gap-2">
            <FileText className="h-4 w-4" />
            {t.documents}
          </h4>
          <p className="text-[10px] text-[#5c544d] mb-4 leading-tight">
            Selecione uma tradução de manuscrito original africano ou fonte primária como base de instrução e probatória do seu recurso pedagógico guiado pela IA:
          </p>

          <div className="space-y-3.5">
            {point.primaryDocuments.map((doc) => {
              const isActive = selectedDocId === doc.id;
              return (
                <div
                  key={doc.id}
                  id={`doc-card-${doc.id}`}
                  onClick={() => onSelectDoc(isActive ? null : doc.id)}
                  className={`p-4 rounded border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#faf6ee] border-[#7a2c22] shadow-sm'
                      : 'bg-[#fafaf6] border-[#e5dfd5]/60 hover:bg-[#faf6f0]'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <h5 className="text-[11.5px] font-serif font-bold text-[#211a15]">
                      {doc.title[language]}
                    </h5>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${isActive ? 'bg-[#7a2c22] border-[#7a2c22]' : 'border-[#d5cebf]'}`}>
                      {isActive && <div className="w-1.5 h-1.5 bg-[#fcfbf7] rounded-full" />}
                    </div>
                  </div>
                  <div className="text-[9.5px] text-[#9c8262] font-mono mt-0.5 truncate uppercase">
                    {doc.source[language]}
                  </div>
                  <p className="text-[11px] text-[#2c231e] mt-2.5 italic bg-[#fcfbf9] p-3 rounded border border-[#e5dfd5]/40 font-serif leading-relaxed">
                    "{doc.content[language]}"
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Interactive Bibliography suggestions */}
      {point.bibliography && point.bibliography.length > 0 && (
        <div className="border-t border-[#e5dfd5]/85 pt-5">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#7a2c22] font-mono mb-3 flex items-center gap-2">
            <BookOpen className="h-4 w-4" />
            {t.bibliography}
          </h4>
          <p className="text-[10px] text-[#5c544d] mb-4 leading-tight">
            Vincular uma referência da historiografia acadêmica mundial de suporte para fundamentar o plano de ensino:
          </p>

          <div className="space-y-3">
            {point.bibliography.map((bib, idx) => {
              const bibId = `${bib.author}_${idx}`;
              const isActive = selectedBibId === bibId;
              return (
                <div
                  key={bibId}
                  id={`bib-card-${idx}`}
                  onClick={() => onSelectBib(isActive ? null : bibId)}
                  className={`p-3.5 rounded border text-left cursor-pointer transition-all ${
                    isActive
                      ? 'bg-[#ecf3ee] border-[#3e5a4d] shadow-sm'
                      : 'bg-[#fafaf6] border-[#e5dfd5]/60 hover:bg-[#f3f6f3]'
                  }`}
                >
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-[11px] font-bold text-[#211a15] font-serif">
                      {bib.author} ({bib.year})
                    </span>
                    <div className={`w-3.5 h-3.5 rounded-full border flex items-center justify-center shrink-0 mt-0.5 ${isActive ? 'bg-[#3e5a4d] border-[#3e5a4d]' : 'border-[#d5cebf]'}`}>
                      {isActive && <div className="w-1.5 h-1.5 bg-[#fcfbf7] rounded-full" />}
                    </div>
                  </div>
                  <div className="text-[11px] italic text-[#5c544d] mt-1 font-sans">
                    {bib.title}
                  </div>
                  {bib.note && bib.note[language] && (
                    <div className="text-[10px] text-[#3e5a4d] mt-1.5 font-sans italic">
                      💡 {bib.note[language]}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Suggested pedagogical ideas in data to guide teacher */}
      {point.pedagogicalSuggestions && point.pedagogicalSuggestions[language] && (
        <div className="border-t border-[#e5dfd5]/85 pt-5">
          <h4 className="text-[10px] uppercase font-bold tracking-wider text-[#5f8774] font-mono mb-3 flex items-center gap-1.5">
            <HeartHandshake className="h-4 w-4" />
            {t.pedagogyIdeas}
          </h4>
          <ul className="list-disc pl-4 space-y-2 text-[#2c231e]">
            {point.pedagogicalSuggestions[language].map((sug, idx) => (
              <li key={idx} className="text-[11.5px] font-sans leading-relaxed text-justify">
                {sug}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
