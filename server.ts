import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Helper function for lazy initialization of GoogleGenAI to prevent crashing at startup if the key is missing
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (!key) {
      throw new Error("GEMINI_API_KEY environment variable is required. Please set it in Settings > Secrets.");
    }
    aiClient = new GoogleGenAI({
      apiKey: key,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        }
      }
    });
  }
  return aiClient;
}

// REST Endpoint: Server-side grounded Gemini generator
app.post('/api/gemini/generate-pedagogy', async (req, res) => {
  try {
    const {
      language,
      pointName,
      eraLabel,
      regionLabel,
      period,
      description,
      format,
      duration,
      gradeLevel,
      curriculum,
      selectedDoc,
      selectedBib,
      onboardingFocus
    } = req.body;

    if (!language || !pointName || !format) {
      res.status(400).json({ error: "Missing required parameters (language, pointName, format)." });
      return;
    }

    // Initialize client lazily and securely
    const ai = getGeminiClient();

    // Map format labels for better prompt descriptions
    const formatLabelMap: Record<string, string> = {
      lesson_plan: "Complete Lesson Plan / Plano de Aula",
      activity: "Worksheet & Dynamic Activity / Atividade Pedagógica",
      didactic_sequence: "Longitudinal Didactic Sequence (multi-lessons) / Sequência Didática"
    };

    // Build grounding instruction block based on whether user linked custom xlsx items or default data sheets
    let groundingBlock = `
CIVILIZATION/Archeological Site: ${pointName}
Chronological Layer: ${eraLabel} (${period})
Geodemographics: ${regionLabel}
Core Historical overview: ${description}
`;

    if (onboardingFocus && onboardingFocus.length > 0) {
      const focusLabelsMap: Record<string, string> = {
        social_scale: "Social Complexity & Scale (territory size, population levels, settlement and city sizes)",
        administration: "Administrative Systems & Bureaucracy (state organization levels, central government structure, formal hierarchies, taxation and official roles)",
        writing_sources: "Writing Systems & Primary Sources (epigraphy, royal records, scriptures like Ge'ez, Demotic, Hieroglyphs, or West African script traditions)",
        religions: "Belief Systems & Religious Philosophy (sacred architecture, cosmic orders such as Ma'at, divine kingship rules)",
        trade_networks: "Global Trade Networks & Commodity Routes (Trans-Saharan salt and gold caravans, Red Sea maritime exports)",
        gender_history: "Gender Roles & Queen Mother Matriarchies (the political, spiritual, and military agency of female Kandakes and queen mothers)"
      };

      const focusDescriptions = onboardingFocus
        .map((f: string) => focusLabelsMap[f] || f)
        .join(", ");

      groundingBlock += `
SPECIAL PEDAGOGICAL TOPICS ENCOURAGED BY THE EDUCATOR:
${focusDescriptions}
*Instructions*: The generated pedagogical materials MUST explicitly prioritize, investigate, or formulate primary analysis questions and discussions about these specific topics to suit the teacher's regional curricula.
`;
    }

    if (selectedDoc) {
      groundingBlock += `
PRIMARY DOCUMENTARY EVIDENCE:
- Title: ${selectedDoc.title[language] || selectedDoc.title.pt}
- Epigraph Source: ${selectedDoc.source[language] || selectedDoc.source.pt}
- Excerpt Transcript: "${selectedDoc.content[language] || selectedDoc.content.pt}"
*Instructions*: The pedagogical tool MUST outline a specific, hands-on, critical literacy analysis exercise of this primary text segment for students. Turn this into a focal point of their empirical training.
`;
    }

    if (selectedBib) {
      groundingBlock += `
RECOMMENDED ACADEMIC BIBLIOGRAPHY FOR TEACHER SUPPORT:
- Author/Date: ${selectedBib.author} (${selectedBib.year || 'n.d.'})
- Title: ${selectedBib.title}
- Context/Note: ${selectedBib.note?.[language] || selectedBib.note?.pt || ""}
*Instructions*: Cite this reference explicitly inside the teacher's grounding guides so that the schoolteacher can back their classes with state-of-the-art historiographical consensus.
`;
    }

    // Setup the system instructions to enforce the strict international pedagogical protocol and anti-bias values from the PDF
    const systemInstruction = `
Você é um Assistente Pedagógico Internacional Especialista em História da África Antiga, focado em criar materiais didáticos para alunos de salas de aula de qualquer parte do mundo, respeitando o estágio cognitivo das crianças (especialmente de 6 a 14 anos). Seu objetivo é gerar conteúdos precisos, engajadores e lives de vieses eurocêntricos.

DIRETRIZES DIDÁTICAS COMPULSÓRIAS:
1. Linguagem: Use frases curtas e vocabulário acessível. Se usar termos complexos (ex: "faraó", "transaariano", "nômade"), explique-os imediatamente na mesma frase ou no glossário.
2. Engajamento (Storytelling): Sempre que possível, conte a história através da perspectiva do cotidiano (como vivia uma criança, um agricultor ou um artesão daquela época em sua respectiva sociedade).
3. Conexão Universal: Crie analogias simples que conectem as inovações africanas (agricultura, metalurgia, matemática, comércio) com elementos do dia a dia moderno de qualquer estudante, independentemente do país em que ele viva.
4. Pensamento Crítico: Gere perguntas reflexivas que estimulem a curiosidade histórica e não apenas a memorização de dados.

REGRAS INEGOCIÁVEIS (GUARDRAILS):
1. NUNCA trate a África como um único país. Refira-se sempre a ela como um continente vasto, diverso e plural.
2. É PROIBIDO focar exclusivamente no Egito. Se o tema for livre ou associar com outras regiões, inclua civilizações como Reino de Kush (Núbia), Império de Axum, Império do Mali, Songai, Grande Zimbábue ou Cartago.
3. É PROIBIDO focar a narrativa em períodos posteriores de escravização ou colonização europeia. O foco exclusivo é a ÁFRICA ANTIGA E MEDIEVAL SOBERANA: destaque a agência, inovações tecnológicas, ciência, metalurgia avançada, arquitetura de pedra, comércio global e cultura endógena dos povos africanos.
4. NUNCA invente fatos históricos (Zero Alucinação). Se não houver consenso historiográfico ou empírico sobre um tema específico ou detalhe, responda rigorosamente: "Os historiadores ainda estão pesquisando os detalhes exatos sobre isso."

Output Language: You MUST write the entire output in the requested language: ${language === 'pt' ? 'Portuguese' : language === 'en' ? 'English' : language === 'fr' ? 'French' : 'Spanish'}.
`;

    // Localized headers and strings matching the mandatory PDF template format exactly
    const templatesByLanguage: Record<string, { warning: string; story: string; glossary: string; exercise: string; explore: string }> = {
      pt: {
        warning: "**Aviso ao Professor:** *Este material foi gerado por IA. Recomendamos a revisão pedagógica e o cruzamento de dados com a coleção \"História Geral da África\" (UNESCO) antes da aplicação em sala.*",
        story: "### 📖 A História de Hoje",
        glossary: "### 🔍 Palavras Novas (Glossário)",
        exercise: "### ✍️ Hora de Pensar! (Exercício Formativo)",
        explore: "### 📚 Para o Professor Explorar Mais"
      },
      en: {
        warning: "**Notice to the Teacher:** *This material was generated by AI. We recommend pedagogical review and cross-referencing with the \"General History of Africa\" collection (UNESCO) before classroom application.*",
        story: "### 📖 The Story of Today",
        glossary: "### 🔍 New Words (Glossary)",
        exercise: "### ✍️ Time to Think! (Formative Exercise)",
        explore: "### 📚 For the Teacher to Explore More"
      },
      fr: {
        warning: "**Avis à l'Enseignant :** *Ce matériel a été généré par l'IA. Nous recommandons une révision pédagogique et un croisement des données avec la collection \"Histoire générale de l'Afrique\" (UNESCO) avant toute application en classe.*",
        story: "### 📖 L'Histoire d'Aujourd'hui",
        glossary: "### 🔍 Mots Nouveaux (Glossaire)",
        exercise: "### ✍️ Moment de Réflexion ! (Exercice Formatif)",
        explore: "### 📚 Pour l'Enseignant d'Aller Plus Loin"
      },
      es: {
        warning: "**Aviso al Profesor:** *Este material fue generado por IA. Recomendamos la revisión pedagógica y el cruce de datos con la colección \"Historia General de África\" (UNESCO) antes de la aplicación en el aula.*",
        story: "### 📖 La Historia de Hoy",
        glossary: "### 🔍 Palabras Nuevas (Glosario)",
        exercise: "### ✍️ ¡Hora de Pensar! (Ejercicio Formativo)",
        explore: "### 📚 Para el Profesor Explorar Más"
      }
    };

    const activeTemplate = templatesByLanguage[language] || templatesByLanguage['en'];

    // Construct precise instruction prompt following the mandatory output layout structure
    const prompt = `
Create an engaging scholastic didactic content about '${pointName}' mapped to the target age/school profile of '${gradeLevel}' with duration metric of '${duration}' and syllabus alignment of '${curriculum}'.

Grounded Historical Context to use as evidence:
${groundingBlock}

MANDATORY OUTPUT LAYOUT AND STRUCTURE:
Your entire response MUST adhere strictly to the following Markdown text format. Replace the text in brackets with dense historical storytelling, and DO NOT output generic boilerplate. Double check that you output all 4 sections with the exact localized headers specified below.

## [Escreva um Título Criativo e Chamativo do Material]
${activeTemplate.warning}

${activeTemplate.story}
[Foque no protagonismo da sociedade africana estudada, utilizando storytelling através da perspectiva do cotidiano e conectando com o estudante de hoje. Máximo de 4 parágrafos curtos, rápidos e instigantes].

${activeTemplate.glossary}
* **[Termo Complexo 1]**: [Explicação muito simples e direta em uma frase curta]
* **[Termo Complexo 2]**: [Explicação muito simples e direta em uma frase curta]

${activeTemplate.exercise}
1. [Pergunta focada em reflexão inteligente sobre o impacto das invenções/cultura de ${pointName} no mundo moderno]
2. [Pergunta interpretativa e de empatia histórica sobre a vida cotidiana relatada na história]

${activeTemplate.explore}
* [Sugestão 1 de tópico ou reino africano relacionado para o professor aprofundar nas próximas aulas para aumentar o repertório do estudante]
* [Sugestão 2 de como o professor pode conectar o tema de hoje com a cultura local ou regional em que a escola está inserida]

Remember: Write the complete real content ready for a teacher's classroom deployment. Do not use generic placeholders. Use exclusive, solid facts from the grounded database.
`;

    // Query Gemini 3.5 Flash server-side
    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.2, // low temperature for robust, structured, non-hallucinated pedagogical content
      }
    });

    const aiTextOutput = response.text;
    if (!aiTextOutput) {
      throw new Error("Received an empty response from Gemini model.");
    }

    // Formulate a clean title based on generation configuration
    const titleLanguageMap: Record<string, string> = {
      pt: `${format === 'lesson_plan' ? 'Plano de Aula' : format === 'activity' ? 'Atividade' : 'Sequência Didática'} - ${pointName}`,
      en: `${format === 'lesson_plan' ? 'Lesson Plan' : format === 'activity' ? 'Activity Sheet' : 'Didactic Sequence'} - ${pointName}`,
      fr: `${format === 'lesson_plan' ? 'Fiche de Cours' : format === 'activity' ? 'Feuille d\'activités' : 'Séquence Didactique'} - ${pointName}`,
      es: `${format === 'lesson_plan' ? 'Plan de Clase' : format === 'activity' ? 'Ficha de Actividades' : 'Secuencia Didáctica'} - ${pointName}`
    };

    const parsedTitle = titleLanguageMap[language] || `${format} - ${pointName}`;

    res.json({
      title: parsedTitle,
      text: aiTextOutput,
      htmlContent: aiTextOutput // keep compatible to display markdown in frontend
    });

  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    res.status(500).json({ error: err.message || "Internal server error occurred while prompting model." });
  }
});

// REST Endpoint: Server-side quiz generator using JSON schema
app.post('/api/gemini/generate-quiz', async (req, res) => {
  try {
    const {
      language,
      pointName,
      description,
      selectedDoc,
      gradeLevel,
      onboardingFocus
    } = req.body;

    if (!language || !pointName) {
      res.status(400).json({ error: "Missing required parameters (language, pointName)." });
      return;
    }

    const ai = getGeminiClient();

    let contextBlock = `
Civilization / Site Name: ${pointName}
Description: ${description}
`;

    if (selectedDoc) {
      contextBlock += `
Primary Document transcript to ground questions:
"${selectedDoc.content?.[language] || selectedDoc.content?.pt || ''}"
`;
    }

    if (onboardingFocus && onboardingFocus.length > 0) {
      contextBlock += `
Educational focus areas: ${onboardingFocus.join(', ')}
`;
    }

    const systemInstruction = `
You are an expert historian of Ancient African History and a university test-maker.
Your task is to generate exactly 3 interactive, extremely high-quality multiple-choice questions to test comprehension and logical reasoning about the civilization '${pointName}'.
The questions and answers MUST be highly accurate, educational, and free from Eurocentric biases, highlighting African achievements (like advanced iron smelting, written scripts, architecture, queens, or complex trade).
Ground the questions on the provided context.
Generate the response strictly in the language requested: '${language}'.
You must return a valid JSON array matching the requested schema. Do not output anything else.
`;

    const prompt = `
Generate exactly 3 multiple choice questions for grade level context: '${gradeLevel}'.
Language of outputs: ${language === 'pt' ? 'Portuguese' : language === 'en' ? 'English' : language === 'fr' ? 'French' : 'Spanish'}.

Historical Context to base questions on:
${contextBlock}
`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.3,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              question: {
                type: Type.STRING,
                description: "The question text, clear, academic yet engaging."
              },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "Four mutually exclusive option strings, designated A, B, C, D (do not prefix options with option letters, just write the options themselves)."
              },
              answerIndex: {
                type: Type.INTEGER,
                description: "The 0-based index of the correct answer (from 0 to 3)."
              },
              explanation: {
                type: Type.STRING,
                description: "Pedagogically rich explanation details describing the correct historical answer and direct consensus citation."
              }
            },
            required: ["question", "options", "answerIndex", "explanation"]
          }
        }
      }
    });

    const aiTextOutput = response.text;
    if (!aiTextOutput) {
      throw new Error("Received empty response from Gemini.");
    }

    const questions = JSON.parse(aiTextOutput);
    res.json({ questions });

  } catch (err: any) {
    console.error("Gemini Quiz Generation Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate dynamic quiz." });
  }
});

// Serve compiled assets or boot Vite as dev middleware
async function setupServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa'
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server successfully running on port ${PORT}`);
  });
}

setupServer();
