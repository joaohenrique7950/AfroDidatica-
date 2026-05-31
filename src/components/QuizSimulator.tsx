import React, { useState, useEffect } from 'react';
import { HistoricalPoint, Language } from '../types';
import { translations } from '../utils/translations';
import { BrainCircuit, Trophy, CheckCircle2, XCircle, RotateCcw, AlertTriangle, ArrowRight, Sparkles } from 'lucide-react';

interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  explanation: string;
}

interface QuizSimulatorProps {
  language: Language;
  point: HistoricalPoint | null;
  onboardingFocus: string[];
}

export default function QuizSimulator({ language, point, onboardingFocus }: QuizSimulatorProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [quizFinished, setQuizFinished] = useState<boolean>(false);

  const t = translations[language];

  // Static Offline default quiz database for robust fallback
  const offlineQuizzes: Record<string, Record<Language, QuizQuestion[]>> = {
    egypt_kemet: {
      pt: [
        {
          question: "Qual era o conceito cósmico egípcio de ordem, verdade e justiça que orientava o governo e as sanções sobrenaturais?",
          options: [
            "Heka (Magia Divina)",
            "Ma'at (Justiça Cósmica e Ordem)",
            "Kemet (A Terra Negra)",
            "Scribe (A Lei do Escriba)"
          ],
          answerIndex: 1,
          explanation: "Ma'at representava a harmonia cósmica, a lei e a verdade moral fundamental que governava as condutas de camponeses até o Faraó."
        },
        {
          question: "Como o Egito Antigo estava economicamente conectado com o restante do continente africano?",
          options: [
            "Apenas por isolamento geográfico total",
            "Através de amplas rotas de comércio de minerais e incenso com Punt e a Núbia",
            "Dependendo exclusivamente de importações europeias",
            "Exclusivamente por rotas marítimas no oceano Atlântico"
          ],
          answerIndex: 1,
          explanation: "Pesquisas arqueológicas confirmam que Kemet exportava e importava ativamente ouro, marfim, animais e resinas preciosas conectando rotas terrestres e fluviais com o Chifre da África e África Subsariana."
        },
        {
          question: "Quais eram os principais sistemas de escrita documentados no Egito com fins administrativos e sagrados?",
          options: [
            "Escrita Cuneiforme unificada",
            "Hieroglífica, Hierática e Demótica",
            "Alfabeto Latino clássico",
            "Apenas tradição puramente oral sem registros"
          ],
          answerIndex: 1,
          explanation: "O Egito utilizava os hieróglifos monumentais para registros sagrados templários, a escrita hierática cursiva para administração diária rápida e, posteriormente, a escrita demótica popular."
        }
      ],
      en: [
        {
          question: "What was the Egyptian cosmic concept of order, truth, and justice that guided government and divine actions?",
          options: [
            "Heka (Divine Magic)",
            "Ma'at (Cosmic Justice and Order)",
            "Kemet (The Black Land)",
            "Scribe (Law of Scribes)"
          ],
          answerIndex: 1,
          explanation: "Ma'at represented the cosmic harmony, law, and moral truth governing behaviors from simple farmers up to the King."
        },
        {
          question: "How was Ancient Egypt economically connected to the rest of the African continent?",
          options: [
            "It was totally isolated from other regions",
            "Through trade routes for minerals, gold, and incense with Punt and Nubia",
            "Depending solely on European imports",
            "Exclusively through Atlantic maritime systems"
          ],
          answerIndex: 1,
          explanation: "Archaeological records confirm Kemet traded gold, mineral wealth, and aromatic resins systematically with Punt and Upper Nubia networks."
        },
        {
          question: "Which writing systems were documented in Ancient Egypt for sacred and state affairs?",
          options: [
            "Classical Cuneiform script",
            "Hieroglyphic, Hieratic, and Demotic",
            "Latin Alphabet variants",
            "Purely oral system without any text scriptures"
          ],
          answerIndex: 1,
          explanation: "Egyptian scribes utilized hieroglyphs for carvings, hieratic shorthand for bureaucracy records, and later demotic as a cursive script."
        }
      ],
      fr: [
        {
          question: "Quel concept cosmique guidait la justice et la vérité sous l'Égypte antique ?",
          options: [
            "Heka (La magie)",
            "La Ma'at (L'ordre cosmique et justice)",
            "Kemet (La Terre Noire)",
            "L'écriture sacrée"
          ],
          answerIndex: 1,
          explanation: "La Ma'at incarnait l'équilibre, l'intégrité morale du royaume et la justice nécessaire à l'harmonie universelle."
        },
        {
          question: "Comment l'Égypte était-elle connectée au reste de l'Afrique ?",
          options: [
            "Isolée complètement du continent",
            "Par d'importants réseaux commerciaux de minéraux précieux avec Pount et la Nubie",
            "Uniquement par le Fleuve Danube",
            "Par l'océan Atlantique"
          ],
          answerIndex: 1,
          explanation: "Des expéditions régulières rapportaient de l'or, de l'ébène et de l'encens depuis les hautes terres d'Afrique par le Nil."
        },
        {
          question: "Quelles écritures étaient utilisées par les scribes ?",
          options: [
            "Cunéiforme",
            "Hiéroglyphique, Hiératique et Démotique",
            "Alphabet Grec classique",
            "Seulement la tradition orale"
          ],
          answerIndex: 1,
          explanation: "Les hiéroglyphes servaient aux monuments religieuses, tandis que le hiératique gérait les taxes quotidiennes."
        }
      ],
      es: [
        {
          question: "¿Qué concepto cósmico regía la justicia moral en Kemet?",
          options: [
            "Heka",
            "Ma'at",
            "Kemet",
            "Escribas reales"
          ],
          answerIndex: 1,
          explanation: "Ma'at constituía el ideal supremo de verdad, balance natural y buena administración del estado y el cosmos."
        },
        {
          question: "¿Con qué territorios del sur comerciaba Kemet?",
          options: [
            "Aislada de todo contacto",
            "Punt y Nubia mediante caravanas y flotas mercantes",
            "Únicamente con las islas británicas",
            "Sistemas del Sahara occidental"
          ],
          answerIndex: 1,
          explanation: "Las excavaciones confirman flujos de oro, resinas, maderas y animales exóticos provenientes de reinos vecinos del Nilo."
        },
        {
          question: "¿Cuáles eran las formas de grafía e inscripciones?",
          options: [
            "Inscripción cuneiforme sumeria",
            "Jeroglífica, Hierática y Demótica",
            "Runas clásicas",
            "Solo memorización sin soporte gráfico"
          ],
          answerIndex: 1,
          explanation: "Los escribas registraban tributos en hierático y esculpían templos sagrados con jeroglíficos artísticos."
        }
      ]
    }
  };

  const labels = {
    pt: {
      title: "Simulador de Quiz & Questões de Fixação",
      description: "Gere mini-quizzes interativos baseados nos dados empíricos deste reino para fixar novos conhecimentos acadêmicos em sala.",
      generateBtn: "Gerar Novas Questões com IA",
      generating: "Formulando testes com a IA...",
      offlineNotice: "⚠️ Chave de IA não configurada ou erro de rede. Rodando em Modo de Simulação Local Offline.",
      questionHeader: "Questão",
      of: "de",
      next: "Próxima Questão",
      finish: "Ver Pontuação Final",
      restart: "Reiniciar Simulação",
      scoreTitle: "Resultado da Avaliação Didática",
      excellent: "🏆 Historiador Lendário!",
      goodJob: "📝 Excelente Progresso!",
      keepReading: "📖 Vale a pena reler os documentos antigos de suporte.",
      points: "Pontos",
      explanation: "Explicação Historiográfica:",
      selectPointFirst: "Selecione uma civilização no mapa à esquerda para habilitar o questionário pedagógico interativo."
    },
    en: {
      title: "Classroom Interactive Quiz Simulator",
      description: "Generate interactive diagnostic questionnaires based on empirical indicators of this kingdom to test classroom reading comprehension.",
      generateBtn: "Generate Classroom Quiz (AI)",
      generating: "Formulating quiz using AI...",
      offlineNotice: "⚠️ AI Key missing. Running in Offline Local Simulator Mode.",
      questionHeader: "Question",
      of: "of",
      next: "Next Question",
      finish: "See Final Score",
      restart: "Restart Session",
      scoreTitle: "Academic Assessment Result",
      excellent: "🏆 Elite Scholar!",
      goodJob: "📝 Outstanding Progress!",
      keepReading: "📖 Keep reading the source manuscripts to solve historical riddles.",
      points: "Points",
      explanation: "Historiographical Explanation:",
      selectPointFirst: "Choose a civilization on the map to start the quiz simulator."
    },
    fr: {
      title: "Simulateur de Quiz Pédagogique Interactif",
      description: "Créez de petits questionnaires fondés sur les sources historiques et archéologiques de ce site.",
      generateBtn: "Générer un Quiz par IA",
      generating: "Génération par l'IA...",
      offlineNotice: "⚠️ Clé non configurée. Fonctionnement en Mode Simulation Locale.",
      questionHeader: "Question",
      of: "sur",
      next: "Question Suivante",
      finish: "Résultats Finaux",
      restart: "Recommencer la séance",
      scoreTitle: "Résultat de l'Évaluation",
      excellent: "🏆 Lauréat de l'Institut !",
      goodJob: "📝 Très bon Travail !",
      keepReading: "📖 Continuez d'explorer les archives historiques pour vous perfectionner.",
      points: "Points",
      explanation: "Explication de l'Historien :",
      selectPointFirst: "Sélectionnez un site sur la carte pour débloquer le quiz didactique."
    },
    es: {
      title: "Simulador de Cuestionarios y Pruebas Rápidas",
      description: "Genere evaluaciones de opción múltiple fundadas en las evidencias empíricas de este imperio medieval.",
      generateBtn: "Generar Auto-Evaluación (IA)",
      generating: "Construyendo preguntas con IA...",
      offlineNotice: "⚠️ Clave ausente. Corriendo en Modo Evaluador Local Autónomo.",
      questionHeader: "Pregunta",
      of: "de",
      next: "Siguiente Pregunta",
      finish: "Ver Calificación Final",
      restart: "Reiniciar Intento",
      scoreTitle: "Resultado del Diagnóstico Escolar",
      excellent: "🏆 ¡Maestro Historiador!",
      goodJob: "📝 ¡Esfuerzo Sobresaliente!",
      keepReading: "📖 Revise el catálogo bibliográfico para resolver dudas.",
      points: "Puntos",
      explanation: "Argumentación Histórica:",
      selectPointFirst: "Por favor elija un imperio en el mapa dinámico para iniciar el juego."
    }
  };

  const l = labels[language] || labels['pt'];

  // Handle building quiz automatically
  useEffect(() => {
    if (!point) return;

    // Reset quiz sessions
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
    setError(null);

    // Load default local questions first to avoid blank screens
    const key = point.id;
    if (offlineQuizzes[key] && offlineQuizzes[key][language]) {
      setQuestions(offlineQuizzes[key][language]);
    } else {
      // Fallback procedural questions generated based on point details
      const procedural: QuizQuestion[] = [
        {
          question: language === 'pt' ? `Onde ficava a principal capital ou sítio geográfico documentado de ${point.name[language]}?` : `What was the primary capital or geographical site recorded for ${point.name[language] || point.name.pt}?`,
          options: [
            point.seshatData?.capital?.[language] || "Sítio Central",
            language === 'pt' ? "Uma colônia costeira fenícia" : "A Phoenician coastal colony",
            language === 'pt' ? "Mênfis no delta" : "Delta-region Memphis",
            language === 'pt' ? "Roma imperial" : "Imperial Rome center"
          ],
          answerIndex: 0,
          explanation: language === 'pt'
            ? `Segundo os registros de campo e banco Seshat, a capital de maior complexidade do reino foi ${point.seshatData?.capital?.[language] || point.name[language]}.`
            : `According to field mappings, the most central sovereign archaeological capital of this unit was ${point.seshatData?.capital?.[language] || point.name[language]}.`
        },
        {
          question: language === 'pt' ? `Qual era o período de maior apogeu cronológico mapeado para ${point.name[language]}?` : `What was the main chronological era of peak mapping for ${point.name[language]}?`,
          options: [
            point.period[language],
            "1800 DC - 1950 DC",
            "5000 AC - 4500 AC",
            "1500 DC - 1800 DC"
          ],
          answerIndex: 0,
          explanation: language === 'pt'
            ? `As datações radiocarbônicas e escritos históricos balizam o reino precisamente em ${point.period[language]}.`
            : `Scholarly data dates this state's major integration specifically around ${point.period[language]}.`
        },
        {
          question: language === 'pt' ? `Qual das seguintes descrições melhor reflete as conquistas de ${point.name[language]}?` : `Which description best matches the historical scope of ${point.name[language]}?`,
          options: [
            language === 'pt' ? "Uma sociedade sem instituições de governança estatais" : "A stateless society with zero administration structures",
            point.description[language].substring(0, 80) + "...",
            language === 'pt' ? "Um domínio militar governado exclusivamente por generais normandos" : "A medieval territory ruled solely by Norman feudal knights",
            language === 'pt' ? "Um entreposto comercial que dependia de moedas espanholas" : "A trade post dependent solely on Spanish modern coins"
          ],
          answerIndex: 1,
          explanation: language === 'pt' ? "A opção reflete a história empírica e as evidências científicas." : "The option correctly aligns with empirical and academic records."
        }
      ];
      setQuestions(procedural);
    }
  }, [point, language]);

  const triggerAiQuiz = async () => {
    if (!point) return;
    setLoading(true);
    setError(null);

    try {
      const resp = await fetch('/api/gemini/generate-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          language,
          pointName: point.name[language] || point.name.pt,
          description: point.description[language] || point.description.pt,
          selectedDoc: point.primaryDocuments?.[0] || null,
          gradeLevel: 'high',
          onboardingFocus
        })
      });

      if (!resp.ok) {
        throw new Error("HTTP state error");
      }

      const data = await resp.json();
      if (data.questions && Array.isArray(data.questions) && data.questions.length > 0) {
        setQuestions(data.questions);
        setCurrentIdx(0);
        setSelectedOpt(null);
        setIsAnswered(false);
        setScore(0);
        setQuizFinished(false);
      } else {
        throw new Error("Invalid schema received");
      }
    } catch (err) {
      console.warn("AI Quiz generation fallback triggered, running offline catalog", err);
      setError(l.offlineNotice);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionClick = (idx: number) => {
    if (isAnswered) return;
    setSelectedOpt(idx);
    setIsAnswered(true);

    if (idx === questions[currentIdx].answerIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    setSelectedOpt(null);
    setIsAnswered(false);

    if (currentIdx + 1 < questions.length) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setQuizFinished(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsAnswered(false);
    setScore(0);
    setQuizFinished(false);
  };

  if (!point) {
    return (
      <div className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5]/60 p-6 shadow-xs text-center text-[#5c544d] text-xs py-10 italic">
        {l.selectPointFirst}
      </div>
    );
  }

  return (
    <div id="quiz-simulator-card" className="bg-[#fcfbf7] rounded-lg border border-[#ebdcc5] p-6 shadow-sm font-sans text-slate-850">
      
      {/* Header */}
      <div className="flex justify-between items-start gap-4 border-b border-[#ebdcc5]/40 pb-4 mb-5 flex-wrap">
        <div>
          <h3 className="text-sm font-serif font-bold text-[#7a2c22] uppercase tracking-wider flex items-center gap-1.5">
            <BrainCircuit className="h-4.5 w-4.5 text-[#ba9a6f]" />
            {l.title}
          </h3>
          <p className="text-[11px] text-[#5c544d] mt-1 pr-4">
            {l.description}
          </p>
        </div>

        <button
          id="trigger-ai-quiz-btn"
          onClick={triggerAiQuiz}
          disabled={loading}
          className="px-3.5 py-2 bg-[#7a2c22] hover:bg-[#602119] text-white rounded text-xs font-bold leading-none shadow-xs transition-colors cursor-pointer flex items-center gap-1.5 disabled:opacity-50"
        >
          <Sparkles className="h-3.5 w-3.5" />
          {loading ? l.generating : l.generateBtn}
        </button>
      </div>

      {/* Error / Offline Simulator Warning */}
      {error && (
        <div className="mb-4 bg-amber-50/50 text-[#8c6731] text-[10.5px] p-2.5 rounded border border-[#ebdcc5] text-left leading-relaxed">
          {error}
        </div>
      )}

      {/* Loading Canvas */}
      {loading ? (
        <div className="h-44 flex flex-col items-center justify-center text-center">
          <div className="w-8 h-8 rounded-full border-2 border-[#7a2c22] border-t-transparent animate-spin mb-3" />
          <p className="text-[11.5px] italic text-[#5c544d]">
            {l.generating}
          </p>
        </div>
      ) : (
        /* Quiz Gameplay */
        <div id="quiz-content-area">
          {quizFinished ? (
            /* Results Screen */
            <div className="p-6 bg-white border border-[#ebdcc5]/30 rounded-lg text-center space-y-4 shadow-3xs animate-fade-in">
              <div className="inline-flex p-3 bg-[#f6f2ea] border border-[#d5cebf] rounded-full text-[#7a2c22] mb-1">
                <Trophy className="h-8 w-8 text-[#ba9a6f]" />
              </div>

              <div>
                <h4 className="text-sm font-serif font-bold text-[#7a2c22] uppercase">
                  {l.scoreTitle}
                </h4>
                <div className="text-3xl font-serif font-bold text-[#211a15] mt-1.5">
                  {score} / {questions.length} <span className="text-xs text-[#5c544d] font-sans font-normal">{l.points}</span>
                </div>
              </div>

              <p className="text-[11.5px] leading-relaxed max-w-sm mx-auto text-[#2c231e] italic">
                {score === questions.length ? l.excellent : score >= 2 ? l.goodJob : l.keepReading}
              </p>

              <button
                id="restart-quiz-session-btn"
                onClick={handleRestart}
                className="px-4 py-2.5 bg-white border border-[#ebdcc5] hover:bg-[#fcfbf9] rounded-lg text-xs font-bold text-[#7a2c22] transition-colors cursor-pointer flex items-center justify-center gap-1.5 mx-auto"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                {l.restart}
              </button>
            </div>
          ) : (
            /* Active Question Screen */
            questions.length > 0 && (
              <div className="space-y-4">
                {/* Score bar / Progress header */}
                <div className="flex justify-between items-center text-[10.5px] text-[#5c544d] font-mono border-b border-[#ebdcc5]/15 pb-2.5">
                  <span>{l.questionHeader} {currentIdx + 1} {l.of} {questions.length}</span>
                  <span className="font-bold text-[#7a2c22]">Score: {score}</span>
                </div>

                {/* Question */}
                <h4 className="text-xs font-serif font-bold text-[#211a15] leading-relaxed">
                  {questions[currentIdx].question}
                </h4>

                {/* Options list */}
                <div className="space-y-2">
                  {questions[currentIdx].options.map((opt, oIdx) => {
                    const isSelected = selectedOpt === oIdx;
                    const isCorrectAnswer = questions[currentIdx].answerIndex === oIdx;

                    let bgClass = "bg-white border-[#e5dfd5]/60 hover:bg-[#fafaf6]";
                    let statusIcon = null;

                    if (isAnswered) {
                      if (isCorrectAnswer) {
                        bgClass = "bg-emerald-50 border-emerald-500 text-emerald-900";
                        statusIcon = <CheckCircle2 className="h-4 w-4 text-emerald-500 shrink-0" />;
                      } else if (isSelected) {
                        bgClass = "bg-rose-50 border-rose-500 text-rose-900";
                        statusIcon = <XCircle className="h-4 w-4 text-rose-500 shrink-0" />;
                      } else {
                        bgClass = "bg-white border-[#ebdcc5]/20 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={oIdx}
                        id={`option-${currentIdx}-${oIdx}`}
                        onClick={() => handleOptionClick(oIdx)}
                        className={`w-full p-3.5 text-left text-[11.5px] rounded-lg border flex items-center justify-between gap-3 transition-all ${bgClass} cursor-pointer`}
                      >
                        <span className="font-sans font-medium">{opt}</span>
                        {statusIcon}
                      </button>
                    );
                  })}
                </div>

                {/* Answer Explanation Box */}
                {isAnswered && (
                  <div className="p-4 bg-[#faf9f4] border border-[#ebdcc5]/60 rounded-lg space-y-1.5 animate-fade-in shadow-inner">
                    <span className="text-[9px] uppercase font-bold text-[#7a2c22] font-mono">
                      {l.explanation}
                    </span>
                    <p className="text-[11px] text-[#2c231e] font-sans leading-relaxed text-justify italic">
                      "{questions[currentIdx].explanation}"
                    </p>
                  </div>
                )}

                {/* Next controller */}
                {isAnswered && (
                  <div className="flex justify-end pt-2">
                    <button
                      id="quiz-next-question-btn"
                      onClick={handleNext}
                      className="px-4 py-2.5 bg-[#7a2c22] hover:bg-[#602119] text-white rounded text-xs font-bold leading-none shadow-xs transition-colors cursor-pointer flex items-center gap-1.5"
                    >
                      {currentIdx + 1 === questions.length ? l.finish : l.next}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )}
              </div>
            )
          )}
        </div>
      )}

    </div>
  );
}
