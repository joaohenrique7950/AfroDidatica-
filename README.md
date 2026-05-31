# AfroDidática — Plataforma de Análise Histórica Georreferenciada e Inteligência Curricular

Este repositório contém a base de código do **AfroDidática**, uma plataforma acadêmica e pedagógica avançada de código aberto projetada para o ensino de História da África Antiga e Medieval. O sistema integra visualização georreferenciada avançada (Modelagem GIS e Polígonos de Voronoi Dinâmicos), indexação de fontes documentais primárias apoiada pela base histórica Seshat, e um motor gerador de currículos e planos de aula estruturados por inteligência artificial fundamentada.

## 1. Objetivo Pedagógico

O **AfroDidática** foi concebido com uma missão técnica e pedagógica central: **prover suporte empírico e metodológico a professores do Ensino Fundamental e Médio para a implementação das diretrizes de ensino de História da África** (como as preconizadas pela Lei 10.639/03 no Brasil e pela Base Nacional Comum Curricular - BNCC).

A plataforma combate o viés eurocêntrico e a simplificação historiográfica ao:
1. **Espacializar a História Soberana**: Demonstrar que o continente africano abrigou civilizações complexas, redes globais de comércio e inovações independentes muito antes de qualquer incursão ou colonização colonialista moderna.
2. **Promover o Protagonismo Local**: Focar na agência, metalurgia de alta temperatura (Cultura Nok), arquitetura monumental de pedra (Grande Zimbábue), erudição literária nacional (Axum/Mali) e sistemas de autoridade não coercitiva ou matriarcal (Lembas/Rainhas Kandake).
3. **Oferecer Prática de Letramento Histórico (Historical Literacy)**: Instrumentalizar os educadores com transcrições de fontes primárias e biografias acadêmicas sólidas, facilitando discussões didáticas embasadas.

---

## 2. Metodologia Científica e Visual

Para evitar a representação estática ou anacrônica das fronteiras africanas, a plataforma utiliza modelos matemáticos e visuais desenvolvidos sobre a biblioteca `D3.js`:

*   **Partição Territorial Geopolítica de Voronoi**: Uma modelagem matemática dinâmica desenvolvida sobre coeficientes de força históricos variáveis. O sistema plota centros políticos conhecidos e calcula as esferas regionais de tensão e controle através da triangulação de Delaunay, adaptando-se organicamente a cada ano selecionado.
*   **Contornos de Densidade Isorítmicos**: Representação em três camadas que modela cientificamente a área de administração central sólida (*Core Area*), o território de influência direta (*Controlled Area*) e a esfera exterior de comércio e relações comerciais circundantes (*Hinterland* ou Área de Tributo).
*   **Redes de Fluxo Conducente**: Algoritmos que calculam e iluminam as artérias de comunicação (principais rotas de comércio, canais fluviais e redes de correio imperial) que estavam operacionais de acordo com a cronologia histórica.

---

## 3. Formulação e Engenharia Pedagógica do Prompt

O módulo gerador de materiais didáticos do **AfroDidática** opera através de um motor de backend estruturado em Node.js (`server.ts`). Em vez de expor o modelo a requisições livres ou desreguladas de usuário, o sistema atua como um coordenador curricular que monta e envia um prompt determinístico fundamentado (*Grounded Prompting*) para os modelos de fundação generativos em nuvem através do SDK oficial `@google/genai`.

### Estrutura de Formulação do Contexto

O prompt final é construído concatenando quatro componentes de dados estruturados e limpos:
1.  **Metadados Curriculares**: Segmento escolar alvo (ano letivo), duração da aula recomendada e diretrizes de alinhamento ao currículo formal.
2.  **Dados Geográficos/Cronológicos Seshat**: O ano exato selecionado e as coordenadas espaciais vinculadas à escala de complexidade social da civilização em estudo.
3.  **Variáveis Temáticas Selecionadas**: Focos de investigação escolhidos pelo professor (Ex: escrita, metalurgia, organização social, comércio, gênero).
4.  **Âncoras de Evidência Empírica**: Excertos literais de documentos históricos primários (fontes arqueológicas e relatos) conjugados com a bibliografia científica de apoio recomendada para o professor.

---

## 4. O Prompt Funcional do Backend (Configuração do Sistema)

Abaixo está detalhada a estrutura lógica e textual do prompt gerenciada no servidor. Ela assegura que os materiais e planos de aula sejam rigorosamente construídos dentro do espectro didático e científico correto, eliminando alucinações e defendendo os limites pedagógicos:

### A. Instrução de Sistema (System Instruction)

Esta persona e este conjunto de regras categóricas são injetados no construtor de chamadas do backend para delimitar e modelar o temperamento analítico do motor de IA:

```text
Você é um Assistente Pedagógico Internacional Especialista em História da África Antiga, focado em criar materiais didáticos para alunos de salas de aula de qualquer parte do mundo, respeitando o estágio cognitivo das crianças (especialmente de 6 a 14 anos). Seu objetivo é gerar conteúdos precisos, engajadores e livres de vieses eurocêntricos.

DIRETRIZES DIDÁTICAS COMPULSÓRIAS:
1. Linguagem: Use frases curtas e vocabulário acessível. Se usar termos complexis, explique-os imediatamente na mesma frase ou no glossário.
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
    *   **React 18+** com **Vite** para desenvolvimento ultrarrápido de componentes reativos.
    *   **Tailwind CSS** para estilização utilitária elegante, garantindo alta responsividade e estética de manuscrito cartográfico.
    *   **D3.js & TopoJSON**: Manipulação precisa de dados geográficos em tempo real e projeções Mercator otimizadas para o continente africano (centralizado na região equatorial para maximizar a escala operacional).
    *   **Motion (Motion/React)**: Motor de animações que dá suavidade às transições de ano do timelapse histórico, ondas de choque arqueológicas e rotas comerciais em pulsing lines.

*   **Backend (Servidor Incorporado)**:
    *   **Express (Node.js)** montado sob uma arquitetura de API REST local segura.
    *   **GoogleGenAI SDK (`@google/genai`)**: Processamento robusto e seguro baseado nos modelos `gemini-3.5-flash`, com respostas deterministicas em JSON estruturado para quizzes interativos e geração criativa de planos pedagógicos em Markdown.
    *   **Nginx Reverse Proxy**: Acoplado a contêineres Docker para isolamento de segurança e entrega de infraestrutura com latência reduzida.

---

## 6. Instruções de Instalação e Execução Local

Siga os passos abaixo para implantar a plataforma em seu ambiente de desenvolvimento ou produção:

### Pré-requisitos
*   Node.js (versão 18.x ou superior recomendada)
*   npm (gerenciador de dependências nativo do Node)

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
Edite o arquivo `.env` e configure sua API Key secreta dos modelos Gemini:
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
Para compilar tanto as páginas estáticas do frontend otimizados quanto o backend empacotado em CJS de alto desempenho:
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
