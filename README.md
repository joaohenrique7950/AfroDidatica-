# AfroDidática — Plataforma de Análise Histórica Georreferenciada e Inteligência Curricular
### AfroDidactics — Georeferenced Historical Analysis & Curricular Intelligence Platform

---

*Disponível em dois idiomas. Escolha seu idioma de preferência abaixo. / Available in two languages. Choose your preferred language below.*

*   [Português (Portuguese)](#versão-em-português)
*   [English (Inglês)](#english-version)

---

# Versão em Português

O **AfroDidática** é uma plataforma acadêmica e pedagógica avançada de código aberto projetada para o ensino de História da África Antiga e Medieval. O sistema integra visualização georreferenciada avançada (Modelagem GIS e Polígonos de Voronoi Dinâmicos), indexação de fontes documentais primárias apoiada pela base histórica Seshat, e um motor gerador de currículos e planos de aula estruturados por inteligência artificial fundamentada.

## 1. Objetivo Pedagógico

O **AfroDidática** foi concebido com uma missão técnica e pedagógica central: **prover suporte empírico e metodológico a professores do Ensino Fundamental e Médio para a implementação das diretrizes de ensino de História da África** (como as preconizadas pela Lei 10.639/03 no Brasil e pela Base Nacional Comum Curricular - BNCC).

A plataforma combate o viés eurocêntrico e a simplificação historiográfica ao:
1.  **Espacializar a História Soberana**: Demonstrar que o continente africano abrigou civilizações complexas, redes globais de comércio e inovações independentes muito antes de qualquer incursão colonialista moderna.
2.  **Promover o Protagonismo Local**: Focar na agência, metalurgia de alta temperatura (Cultura Nok), arquitetura monumental de pedra (Grande Zimbábue), erudição literária nacional (Axum/Mali) e sistemas de autoridade não coercitiva ou matriarcal (Lembas/Rainhas Kandake).
3.  **Oferecer Prática de Letramento Histórico (Historical Literacy)**: Instrumentalizar os educadores com transcrições de fontes primárias e referências bibliográficas acadêmicas sólidas, facilitando discussões didáticas embasadas.

---

## 2. Metodologia Científica e Visual

Para evitar a representação estática ou anacrônica das fronteiras africanas, a plataforma utiliza modelos matemáticos e visuais desenvolvidos sobre a biblioteca `D3.js`:

*   **Partição Territorial Geopolítica de Voronoi**: Uma modelagem matemática dinâmica desenvolvida sobre coeficientes de força históricos variáveis. O sistema plota centros políticos conhecidos e calcula as esferas regionais de tensão e controle através da triangulação de Delaunay, adaptando-se organicamente a cada ano selecionado.
*   **Contornos de Densidade Isorítmicos**: Representação em três camadas que modela cientificamente a área de administração central sólida (*Core Area*), o território de influência direta (*Controlled Area*) e a esfera exterior de comércio e relações comerciais circundantes (*Hinterland* ou Área de Tributo).
*   **Redes de Fluxo Conducente**: Algoritmos que calculam e iluminam as artérias de comunicação (principais rotas de comércio, canais fluviais e redes de correio imperial) que estavam operacionais de acordo com a cronologia histórica.

---

## 3. Formulação e Engenharia Pedagógica do Prompt

O módulo gerador de materiais didáticos do **AfroDidática** opera através de um motor de backend estruturado em Node.js (`server.ts`). Em vez de expor o modelo a requisições livres ou desreguladas de usuário, o sistema atua como um coordenador curricular que monta e envia um prompt determinístico fundamentado (*Grounded Prompting*) para os modelos de fundação generativos em nuvem através de SDK oficial.

### Estrutura de Formulação do Contexto

O prompt final é construído concatenando quatro componentes de dados estruturados e limpos:
1.  **Metadados Curriculares**: Segmento escolar alvo (ano letivo), duração da aula recomendada e diretrizes de alinhamento ao currículo formal (como a BNCC).
2.  **Dados Geográficos/Cronológicos Seshat**: O ano exato selecionado e as coordenadas espaciais vinculadas à escala de complexidade social da civilização em estudo.
3.  **Variáveis Temáticas Selecionadas**: Focos de investigação escolhidos pelo professor (Ex: escrita, metalurgia, organização social, comércio, gênero).
4.  **Âncoras de Evidência Empírica**: Excertos literais de documentos históricos primários (fontes arqueológicas e relatos) conjugados com a bibliografia científica de apoio recomendada para o professor.

---

## 4. O Prompt Funcional do Backend (Configuração do Sistema)

Abaixo está detalhada a estrutura lógica e de variáveis utilizada de forma transparente no backend para guiar o processador de modelos de linguagem generativos:

### A. Instrução de Sistema (System Instruction)

Esta persona e este conjunto de regras categóricas são injetados no construtor de chamadas do backend para delimitar e modelar o temperamento analítico do motor de IA:

```text
Você é um Assistente Pedagógico Internacional Especialista em História da África Antiga, focado em criar materiais didáticos para alunos de salas de aula de qualquer parte do mundo, respeitando o estágio cognitivo das crianças (especialmente de 6 a 14 anos). Seu objetivo é gerar conteúdos precisos, engajadores e livres de vieses eurocêntricos.

DIRETRIZES DIDÁTICAS COMPULSÓRIAS:
1. Linguagem: Use frases curtas e vocabulário acessível. Se usar termos complexos, explique-os imediatamente na mesma frase ou no glossário.
2. Engajamento (Storytelling): Sempre que possível, conte a história através da perspectiva do cotidiano (como vivia uma criança, um agricultor ou um artesão daquela época em sua respectiva sociedade).
3. Conexão Universal: Crie analogias simples que conectem as inovações africanas (agricultura, metalurgia, matemática, comércio) com elementos do dia a dia moderno de qualquer estudante, independentemente do país em que ele viva.
4. Pensamento Crítico: Gere perguntas reflexivas que estimulem a curiosidade histórica e não apenas a memorização de dados.

REGRAS INEGOCIÁVEIS (GUARDRAILS):
1. NUNCA trate a África como um único país. Refira-se sempre a ela como um continente vasto, diverso e plural.
2. É PROIBIDO focar exclusivamente no Egito. Se o tema for livre ou associar com outras regiões, inclua civilizações como Reino de Kush (Núbia), Império de Axum, Império do Mali, Songai, Grande Zimbábue ou Cartago.
3. É PROIBIDO focar a narrativa em períodos posteriores de escravização ou colonização europeia. O foco exclusivo é a ÁFRICA ANTIGA E MEDIEVAL SOBERANA: destaque a agência, inovações tecnológicas, ciência, metalurgia avançada, arquitetura de pedra, comércio global e cultura endógena dos povos africanos.
4. NUNCA invente fatos históricos (Zero Alucinação). Se não houver consenso historiográfico ou empírico sobre um tema específico ou detalhe, responda rigorosamente: "Os historiadores ainda estão pesquisando os detalhes exatos sobre isso."
```

### B. Prompt de Instrução de Conteúdo e Template

O corpo da mensagem instrui o modelo sobre como orquestrar o conteúdo, a formatação de marcação Markdown e a conformidade aos dados empíricos passados de forma estruturada:

```text
Create an engaging scholastic didactic content about '[NOME_DA_CIVILIZACAO]' mapped to the target age/school profile of '[NIVEL_ESCOLAR]' with duration metric of '[DURACAO]' and syllabus alignment of '[CURRICULO_OU_BNCC]'.

Grounded Historical Context to use as evidence:
CIVILIZATION/Archeological Site: [NOME_DA_CIVILIZACAO]
Chronological Layer: [ERA_HISTORICA_E_ANOS]
Geodemographics: [REGIAO_AFRICANA]
Core Historical overview: [DESCRICAO_RELEVANTE_POLARIS]

SPECIAL PEDAGOGICAL TOPICS ENCOURAGED BY THE EDUCATOR:
[TOPICOS_DE_FOCO_SELECIONADOS_COMO_METALURGIA_MATRIARCADO_ESCRITA]

PRIMARY DOCUMENTARY EVIDENCE:
- Title: [TITULO_DO_DOCUMENTO_HISTORICO]
- Epigraph Source: [FONTE_OU_AUTORIDADE_CONCENSUAL]
- Excerpt Transcript: "[CONTEUDO_DA_FONTE_HISTORICA]"

RECOMMENDED ACADEMIC BIBLIOGRAPHY FOR TEACHER SUPPORT:
- Author/Date: [REFERENCIA_BIBLIOGRAFICA_PRINCIPAL]
- Title: [TITULO_DA_OBRA_CIENTIFICA]

MANDATORY OUTPUT LAYOUT AND STRUCTURE:
Your entire response MUST adhere strictly to the following Markdown text format. Replace the text in brackets with dense historical storytelling, and DO NOT output generic boilerplate. Double check that you output all 4 sections with the exact localized headers specified below.

## [Título Criativo e Chamativo do Material]
**Aviso ao Professor:** *Este material foi gerado por IA. Recomendamos a revisão pedagógica e o cruzamento de dados com a coleção "História Geral da África" (UNESCO) antes da aplicação em sala.*

### 📖 A História de Hoje
[Foque no protagonismo da sociedade africana estudada, utilizando storytelling através da perspectiva do cotidiano e conectando com o estudante de hoje. Máximo de 4 parágrafos curtos, rápidos e instigantes].

### 🔍 Palavras Novas (Glossário)
* **[Termo Complexo 1]**: [Explicação muito simples e direta em uma frase curta]
* **[Termo Complexo 2]**: [Explicação muito simples e direta em uma frase curta]

### ✍️ Hora de Pensar! (Exercício Formativo)
1. [Pergunta focada em reflexão inteligente sobre o impacto das invenções/cultura de esta civilização no mundo moderno]
2. [Pergunta interpretativa e de empatia histórica sobre a vida cotidiana relatada na história]

### 📚 Para o Professor Explorar Mais
* [Sugestão 1 de tópico ou reino africano relacionado para o professor aprofundar nas próximas aulas]
* [Sugestão 2 de como o professor pode conectar o tema de hoje com a cultura local ou regional em que a escola está inserida]
```

---

## 5. Arquitetura da Solução Técnica

O projeto utiliza uma pilha full-stack focada em performance, portabilidade e fidelidade metodológica:

*   **Frontend (Single-Page Application)**:
    *   **React 18+** com **Vite** para desenvolvimento modular reativo de alta performance.
    *   **Tailwind CSS** para estilização utilitária elegante, garantindo responsividade flexível e estética cartográfica histórica.
    *   **D3.js & TopoJSON**: Manipulação precisa de dados geográficos e projeções Mercator matematicamente centralizadas no continente africano.
    *   **Motion**: Motor de animações utilizado para suavizar transições temporais de anos, propagações de ondas de choque de eventos históricos (*Critical Ripples*) e rotas fluviais operacionais.
*   **Backend (Servidor Integrado)**:
    *   **Express (Node.js)** montado sob uma arquitetura de API REST de alto rendimento.
    *   **GoogleGenAI SDK (`@google/genai`)**: Processamento robusto e seguro baseado na API de inferência do modelo `gemini-3.5-flash`, com respostas deterministicas em JSON estruturado para quizzes interativos e geração dinâmica de materiais pedagógicos em Markdown.

---

## 6. Instruções de Instalação e Execução Local

Siga os passos abaixo para implantar a plataforma em seu ambiente de desenvolvimento ou produção:

### Pré-requisitos
*   Node.js (versão 18.x ou superior recomendada)
*   npm (gerenciador de dependências de pacotes do Node)

### 1. Clonar o Repositório
```bash
git clone https://github.com/seu-usuario/afrodidatica.git
cd afrodidatica
```

### 2. Configurar as Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto baseado no `.env.example`:
```bash
cp .env.example .env
```
Edite o arquivo `.env` e configure sua chave secreta da API do Gemini:
```env
GEMINI_API_KEY="AIzaSyYourActualKeyHere..."
APP_URL="http://localhost:3000"
```

### 3. Instalar Dependências do Sistema
```bash
npm install
```

### 4. Executar em Modo de Desenvolvimento
```bash
npm run dev
```
O servidor de desenvolvimento iniciará localmente e a aplicação estará acessível através do endereço:
**`http://localhost:3000`**

### 5. Compilar para Produção (Build)
Para compilar tanto as páginas estáticas com árvores otimizadas de balanço quanto o backend empacotado em CJS:
```bash
npm run build
```
As saídas otimizadas serão geradas na pasta `/dist`. Para iniciar o sistema em produção:
```bash
npm start
```

---

## 7. Licença e Apoio Historiográfico

Este projeto é disponibilizado para uso educacional livre e incentiva a disseminação científica da história africana descolonizada.

A base de dados empíricos foi consolidada tendo como referências fundamentais a coleção **História Geral da África** da **UNESCO** e as planilhas públicas validadas do repositório acadêmico **Seshat Global History Databank**.

---
---

# English Version

# AfroDidactics — Georeferenced Historical Analysis & Curricular Intelligence Platform

**AfroDidactics** is an advanced open-source academic and pedagogical platform designed for teaching Ancient and Medieval African History. The system integrates advanced georeferenced visualization (GIS Modeling & Dynamic Voronoi Polygons), primary documentary source indexing supported by the Seshat historical database, and a dynamic curriculum and lesson plan generator structured by grounded generative artificial intelligence.

## 1. Pedagogical Objective

**AfroDidactics** was conceived with a core technical and pedagogical mission: **to provide empirical and methodological support to primary and secondary school teachers to implement guidelines on African History teaching** (such as Brazil's Law 10.639/03 and national curriculum standards).

The platform counters eurocentric bias and oversimplified historiographical narratives by:
1.  **Spatializing Sovereign History**: Demonstrating that the African continent was home to complex civilizations, global trade networks, and independent innovations long before modern colonial incursions.
2.  **Promoting Local Agency**: Focusing on agency, high-temperature metallurgy (Nok Culture), monumental stone architecture (Great Zimbabwe), national literary scholarship (Aksum/Mali), and non-coercitive or matriarchal structures of authority (Lembas/Kandake Queens).
3.  **Fostering Historical Literacy**: Empowering educators with verbatim transcriptions of primary sources and authoritative academic reference material, facilitating solid classroom discussions.

---

## 2. Scientific & Animated GIS Methodology

To bypass anachronistic boundary lines and static country representations, the platform features math-driven spatial models calculated via `D3.js`:

*   **Geopolitical Voronoi Partitions**: A dynamic territorial division model calculated using historical state power coefficients. The system plots recorded geopolitical centers and projects regional spheres of influence through Delaunay triangulation, adjusting organically as the timeline progresses.
*   **Isorhythmic Density Outlines**: A three-tiered administrative density visualizer modeling Core sovereign administration (*Core Area*), adjacent borderland control (*Controlled Area*), and distant tribute/trade regions (*Hinterland*).
*   **Conducive Flow Networks**: Algorithmic routes mapping active historical highways (trans-Saharan routes, river communication channels, and imperial road networks) operational at any selected year.

---

## 3. Grounded Prompt Engineering and Curricular Formulation

The curriculum generator module in **AfroDidactics** runs on an Express backend (`server.ts`). Instead of allowing unstructured user requests to the model, the system acts as a curricular orchestrator that structures and sends a strict, grounded prompt (*Grounded Prompting*) to foundation models via their official SDK.

### Content Context Structuring

The final prompt is formulated dynamically by concatenating four clean, structured datasets:
1.  **Curricular Metadata**: Targeted school/student profile, recommended class duration, and official syllabus standards alignment guidelines.
2.  **Geodemographic & Temporal Context**: The exact chronological point selected on the map paired with corresponding social complexity indicators.
3.  **Selected Curricular Topics**: Educational lenses checked by the teacher (e.g., writing, smelting technology, social organization, commerce, gender systems).
4.  **Empirical Grounding Anchors**: Transcriptions of primary sources, archaeological findings, and consensus academic bibliography for teacher backup.

---

## 4. The Functional Backend Prompt (System Configuration)

Below is the logical structural setup of variables and instruction texts deployed securely in the backend server:

### A. System Instruction

This persona and categorical guardrails are passed directly to the generator client config during initialization to define the AI engine's analytical parameters:

```text
You are an International Pedagogical Expert in Ancient and Medieval African History, focused on creating educational resources for K-12 students anywhere globally, respecting cognitive development thresholds (especially ages 6 to 14). Your goal is to produce highly precise, engaging, and non-eurocentric curricular assets.

COMPULSORY DIDACTIC DIRECTIVES:
1. Language: Use short sentences and simple, direct vocabulary. If complex terminology is necessary, define it immediately inside the same sentence or in the dedicated glossary.
2. Storytelling & Empathy: Whenever possible, tell the story from a daily-life perspective (how a child, trader, or bricklayer lived at that time in their respective African society).
3. Universal Anchors: Draw quick, simple analogies connecting historical African innovations (agriculture, metallurgy, mathematics, seafaring) to concepts relevant to the daily lives of modern students worldwide.
4. Critical Inquiry: Formulate reflective, open questions prompting historical thinking instead of passive factual repetition.

STRICT GUARDRAILS:
1. NEVER speak of Africa as a single country. Always define it as a vast, highly diverse, and plural continent.
2. Egypt must NOT be the sole focus. If open topics are requested, actively include other kingdoms such as Kush (Nubia), Aksum, Mali, Songhai, Great Zimbabwe, or Carthage.
3. NARRATIVES MUST REMAIN ON SOBER PRE-COLONIAL ERAS. It is strictly forbidden to anchor Pre-Colonial history in late slave trades or colonial invasions. Highlight pre-colonial agency, metallurgy, engineering, trade networks, and cultural complexity.
4. ZERO Historical Hallucination: If academic consensus is missing on an exact topic, respond strictly: "Historians and archaeologists are still researching the exact details of this event."
```

### B. Prompt Template

The message payload instructs the model on data integration, Markdown form, and pedagogical output requirements:

```text
Create an engaging scholastic didactic content about '[NOME_DA_CIVILIZACAO]' mapped to the target age/school profile of '[NIVEL_ESCOLAR]' with duration metric of '[DURACAO]' and syllabus alignment of '[CURRICULO_OU_BNCC]'.

Grounded Historical Context to use as evidence:
CIVILIZATION/Archeological Site: [NOME_DA_CIVILIZACAO]
Chronological Layer: [ERA_HISTORICA_E_ANOS]
Geodemographics: [REGIAO_AFRICANA]
Core Historical overview: [DESCRICAO_RELEVANTE_POLARIS]

SPECIAL PEDAGOGICAL TOPICS ENCOURAGED BY THE EDUCATOR:
[TOPICOS_DE_FOCO_SELECIONADOS_COMO_METALURGIA_MATRIARCADO_ESCRITA]

PRIMARY DOCUMENTARY EVIDENCE:
- Title: [TITULO_DO_DOCUMENTO_HISTORICO]
- Epigraph Source: [FONTE_OU_AUTORIDADE_CONCENSUAL]
- Excerpt Transcript: "[CONTEUDO_DA_FONTE_HISTORICA]"

RECOMMENDED ACADEMIC BIBLIOGRAPHY FOR TEACHER SUPPORT:
- Author/Date: [REFERENCIA_BIBLIOGRAFICA_PRINCIPAL]
- Title: [TITULO_DA_OBRA_CIENTIFICA]

MANDATORY OUTPUT LAYOUT AND STRUCTURE:
Your entire response MUST adhere strictly to the following Markdown text format. Replace the text in brackets with dense historical storytelling, and DO NOT output generic boilerplate. Double check that you output all 4 sections with the exact localized headers specified below.

## [Título Criativo e Chamativo do Material]
**Aviso ao Professor:** *Este material foi gerado por IA. Recomendamos a revisão pedagógica e o cruzamento de dados com a coleção "História Geral da África" (UNESCO) antes da aplicação em sala.*

### 📖 A História de Hoje
[Foque no protagonismo da sociedade africana estudada, utilizando storytelling através da perspectiva do cotidiano e conectando com o estudante de hoje. Máximo de 4 parágrafos curtos, rápidos e instigantes].

### 🔍 Palavras Novas (Glossário)
* **[Termo Complexo 1]**: [Explicação muito simples e direta em uma frase curta]
* **[Termo Complexo 2]**: [Explicação muito simples e direta em uma frase curta]

### ✍️ Hora de Pensar! (Exercício Formativo)
1. [Pergunta focada em reflexão inteligente sobre o impacto das invenções/cultura de esta civilização no mundo moderno]
2. [Pergunta interpretativa e de empatia histórica sobre a vida cotidiana relatada na história]

### 📚 Para o Professor Explorar Mais
* [Sugestão 1 de tópico ou reino africano relacionado para o professor aprofundar nas próximas aulas]
* [Sugestão 2 de como o professor pode conectar o tema de hoje com a cultura local ou regional em que a escola está inserida]
```

---

## 5. Technical Stack and Architecture

The platform architecture focuses on performance, portability, and robust implementation:

*   **Frontend (Single-Page Application)**:
    *   **React 18+** with **Vite** as a fast and lightweight component framework.
    *   **Tailwind CSS** for elegant styling, ensuring high fluid design density and accurate historical parchment appearance.
    *   **D3.js & TopoJSON**: High-precision rendering of custom GeoJSON structures with centered Mercator projections for Africa.
    *   **Motion**: Dynamic layout animations animating timeline changes, archaeological impact ripples (*Critical Ripples*), and navigable trade path flows.
*   **Backend (Custom Server)**:
    *   **Express (Node.js)** designed as a secure, fast API layer.
    *   **GoogleGenAI SDK (`@google/genai`)**: Reliable server-side inference on pre-colonial metadata using `gemini-3.5-flash`, returning structured JSON for quizzes and highly structured Markdown for lesson plans.

---

## 6. Installation and Local Execution

Follow these steps to deploy and run the platform in your local system:

### Prerequisites
*   Node.js (version 18.x or later highly recommended)
*   npm (built-in Node package manager)

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/afrodidatica.git
cd afrodidatica
```

### 2. Configure Environment Variables
Create a new `.env` file from `.env.example`:
```bash
cp .env.example .env
```
Edit `.env` to include your secure Gemini API credentials:
```env
GEMINI_API_KEY="AIzaSyYourActualKeyHere..."
APP_URL="http://localhost:3000"
```

### 3. Install NPM Dependencies
```bash
npm install
```

### 4. Boot Up the Development Server
```bash
npm run dev
```
Open your browser and navigate to:
**`http://localhost:3000`**

### 5. Build for Production
To generate pre-compiled static assets and CJS node server packages:
```bash
npm run build
```
Optimized assets will be written to `/dist`. Start the production instance:
```bash
npm start
```

---

## 7. License & Historiographical Consensus

This code is licensed under educational consensus guidelines, aimed at amplifying and disseminating pre-colonial historical records scientifically.

Information grounds and evidentiary documents were mapped using official datasets published by **UNESCO** in their **General History of Africa** collection and verified registers stored in the **Seshat Global History Databank**.
