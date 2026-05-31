import { HistoricalPoint } from '../types';

export const defaultHistoricalPoints: HistoricalPoint[] = [
  {
    id: "egypt_kemet",
    name: {
      pt: "Kemet (Egito Antigo)",
      en: "Kemet (Ancient Egypt)",
      fr: "Kemet (Égypte Antique)",
      es: "Kemet (Egipto Antiguo)"
    },
    region: "nile_valley",
    regionLabel: {
      pt: "Vale do Nilo",
      en: "Nile Valley",
      fr: "Vallée du Nil",
      es: "Valle del Nilo"
    },
    era: "pre_bronze",
    eraLabel: {
      pt: "Idade do Bronze / Antigo",
      en: "Bronze Age & Older",
      fr: "Âge du Bronze / Ancien",
      es: "Edad del Bronce / Antiguo"
    },
    coordinates: { x: 65, y: 18 },
    period: {
      pt: "3100 AC - 332 AC",
      en: "3100 BC - 332 BC",
      fr: "3100 AEC - 332 AEC",
      es: "3100 AC - 332 AC"
    },
    description: {
      pt: "Kemet ('A Terra Negra'), floresceu ao longo do Rio Nilo. Uma das civilizações mais célebres do mundo, fortemente integrada com o continente africano através de comércio de minerais, ideias religiosas e conexões profundas com a Núbia e Punt.",
      en: "Kemet ('The Black Land'), flourished along the Nile River. One of the world's most celebrated civilizations, deeply integrated with the African continent through trade of minerals, religious ideas, and profound cultural exchanges with Nubia and Punt.",
      fr: "Kemet ('La Terre Noire'), s'est développée le long du Nil. L'une des civilisations les plus célèbres au monde, profondément intégrée au continent africain par le commerce des minéraux, les croyances religieuses et des réseaux d'échange avec la Nubie et Pount.",
      es: "Kemet ('La Tierra Negra'), floreció a lo largo del Río Nilo. Una de las civilizaciones más celebradas del mundo, profundamente integrada con el continente africano mediante el comercio de minerales, ideas religiosas e intercambios con Nubia y Punt."
    },
    seshatData: {
      capital: { pt: "Mênfis / Tebas", en: "Memphis / Thebes", fr: "Memphis / Thèbes", es: "Memphis / Tebas" },
      territory: { pt: "1.000.000 km² (Reino Novo)", en: "1,000,000 km² (New Kingdom)", fr: "1 000 000 km² (Nouvel Empire)", es: "1.000.000 km² (Reino Nuevo)" },
      population: { pt: "3.000.000 - 5.000.000", en: "3,000,000 - 5,000,000", fr: "3 000 000 - 5 000 000", es: "3.000.000 - 5.000.000" },
      settlementHierarchy: { pt: "4 níveis (Capital, Centros Regionais, Vilas, Aldeias)", en: "4 levels (Capital, Provincial towns, Villages, Hamlets)", fr: "4 niveaux (Capitale, Chefs-lieux, Villages, Hameaux)", es: "4 niveles (Capital, Centros provinciales, Villas, Aldeas)" },
      administrativeLevels: { pt: "5+ níveis de funcionalismo público organizado", en: "5+ levels of organized public bureaucracy", fr: "5+ niveaux d'administration publique organisée", es: "5+ niveles de burocracia estatal organizada" },
      governmentType: { pt: "Monarquia Divina com Vizirado complexo", en: "Divine Monarchy with complex Vizierate", fr: "Monarchie divine avec vizirat complexe", es: "Monarquía Divina con Vizirato complejo" },
      languages: { pt: "Egípcio Antigo (Hieróglifo / Hierático / Demótico)", en: "Ancient Egyptian (Hieroglyphic / Hieratic / Demotic)", fr: "Égyptien ancien (Hiéroglyphique / Hiératique / Démotique)", es: "Egipcio Antiguo (Jeroglífico / Hierático / Demótico)" },
      religionInfo: { pt: "Politeísmo com fortes punições sobrenaturais (Ma'at como ordem divina)", en: "Polytheism with strong supernatural punishment (Ma'at as divine order)", fr: "Polythéisme avec fortes punitions surnaturelles (Ma'at comme ordre divin)", es: "Politeísmo con castigo sobrenatural estricto (Ma'at como orden divino)" }
    },
    primaryDocuments: [
      {
        id: "rosetta_kemet",
        title: {
          pt: "O Decreto de Mênfis (Inscrição da Pedra de Roseta)",
          en: "The Decree of Memphis (Rosetta Stone Inscription)",
          fr: "Le Décret de Memphis (Inscription de la Pierre de Rosette)",
          es: "El Decreto de Menfis (Inscripción de la Piedra de Rosetta)"
        },
        source: {
          pt: "Decreto de Ptolomeu V, Gravado em 196 AC em pedra de granodiorito",
          en: "Decree of Ptolemy V, Engraved in 196 BC in granodiorite stone",
          fr: "Décret de Ptolémée V, Gravé en 196 AEC sur granite noir de Rosette",
          es: "Decreto de Ptolomeo V, Grabado en 196 AC en piedra de granodiorita"
        },
        content: {
          pt: "O rei Ptolomeu, eterno vivente, amado de Ptah... reduziu os impostos que existiam e perdoou as dívidas que o povo tinha com a coroa... Ele ordenou que os templos mantivessem seus rendimentos e as oferendas de grãos fossem feitas anualmente...",
          en: "The King, living forever, beloved of Ptah... has remitted taxes of some people and reduced those of others... He has commanded that the temples receive their customary revenues and yearly tributes of grain and gold... recorded in sacred, native hieroglyphic, demotic script and Greek.",
          fr: "Le roi Ptolémée, vivant éternellement, aimé de Ptah... a remis des taxes et en a réduit d'autres... Il a ordonné que les temples conservent leurs revenus rituels et les sacrifices annuels de céréales... ceci écrit en caractères sacrés (hiéroglyphes), populaires (démotique) et grecs.",
          es: "El rey Ptolomeo, eterno viviente, amado de Ptah... perdonó deudas y redujo impuestos... Ordenó que los templos conservaran sus tributos anuales de grano y oro... grabado en caracteres sagrados (jeroglíficos), populares (demótico) y griegos."
        }
      },
      {
        id: "papyrus_edwin_smith",
        title: {
          pt: "Papiro Cirúrgico Edwin Smith (Padrão Teórico de Medicina)",
          en: "The Edwin Smith Surgical Papyrus (Theoretical Medical Standard)",
          fr: "Le Papyrus Chirurgical d'Edwin Smith (Traité médical)",
          es: "El Papiro Quirúrgico de Edwin Smith (Estándar Médico)"
        },
        source: {
          pt: "Cópia do Reino Antigo (c. 1600 AC), descrevendo tratamentos racionais de anatomia",
          en: "Copy of Old Kingdom texts (c. 1600 BC), detailing rational anatomical treatments",
          fr: "Copie de textes de l'Ancien Empire (v. 1600 AEC), décrivant des diagnostics rigoureux",
          es: "Copia de tratados del Reino Antiguo (c. 1600 AC), que detallan cirugías sistemáticas"
        },
        content: {
          pt: "Exame de um homem com uma ferida aberta na cabeça, que penetrou até o osso. Tu deves apalpar a ferida para medir o tamanho. Deves estancar o fluxo com gaze... Isso é uma enfermidade com a qual tu deves lutar e curar.",
          en: "Examination of a man having a gaping wound in his head, penetrating to the bone. You shall probe his wound... If you find its pulsation under your fingers, you must bind it with fresh meat first, then treat with lint and honey...",
          fr: "Examen d'un homme souffrant d'une plaie béante à la tête, touchant l'os. Tu palperas sa blessure... Si tu sens des pulsations sous tes doigts, tu appliqueras d'abord de la viande fraîche, puis tu traiteras avec du miel et de la charpie...",
          es: "Examen de un hombre con una herida abierta en la cabeza que penetra hasta el hueso. Debes palpar la herida... Si encuentras pulsación bajo tus dedos, debes vendar la herida con carne fresca el primer día y luego tratar con lino y miel..."
        }
      }
    ],
    bibliography: [
      {
        author: "Cheikh Anta Diop",
        title: "The African Origin of Civilization: Myth or Reality",
        year: "1974",
        note: {
          pt: "Obra seminal que propõe a unificação histórica africana a partir de Kemet.",
          en: "Seminal work proposing the African cultural and biological roots of Egypt.",
          fr: "Ouvrage majeur défendant l'origine négro-africaine de la civilisation égyptienne.",
          es: "Obra fundamental que analiza el origen sociocultural y biológico africano de Egipto."
        }
      },
      {
        author: "UNESCO",
        title: "General History of Africa - Volume II: Ancient Civilizations of Africa",
        year: "1981",
        note: {
          pt: "Sólida referência acadêmica produzida por historiadores internacionais.",
          en: "An essential academic resource produced by a global team of historians.",
          fr: "Référence académique incontournable corédigée par un comité d'experts internationaux.",
          es: "Excelente recurso historiográfico redactado por una red internacional de expertos."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Debater as teses de Cheikh Anta Diop sobre as raízes africanas do Egito Antigo.",
        "Analisar o Papiro de Edwin Smith para contrapor a ideia preconceituosa de que a ciência antiga surgiu apenas na Europa."
      ],
      en: [
        "Debate Cheikh Anta Diop's theses regarding the biological and cultural connections between Kemet and Sub-Saharan Africa.",
        "Examine the medical treatises to challenge Eurocentric narratives about the genesis of ancient science."
      ],
      fr: [
        "Organiser un débat sur l'ancrage culturel de l'Égypte ancienne au sein de l'Afrique d'après Cheikh Anta Diop.",
        "Analyser le papyrus médical pour déconstruire l'idée que les sciences seraient nées exclusivement en Europe."
      ],
      es: [
        "Organizar un debate sobre las tesis de Cheikh Anta Diop sobre el origen africano de la cultura egipcia.",
        "Examinar los textos del Papiro Edwin Smith para reevaluar la ciencia antigua fuera de narrativas eurocéntricas."
      ]
    }
  },
  {
    id: "kush_meroe",
    name: {
      pt: "Reino de Cuxe (Kush / Méroe)",
      en: "Kingdom of Kush (Kush / Meroë)",
      fr: "Royaume de Koush (Méroé)",
      es: "Reino de Kush (Napata / Meroe)"
    },
    region: "nile_valley",
    regionLabel: {
      pt: "Vale do Nilo",
      en: "Nile Valley",
      fr: "Vallée du Nil",
      es: "Valle del Nilo"
    },
    era: "antiquity",
    eraLabel: {
      pt: "Antiguidade / Cúsh-Méroe",
      en: "Antiquity / Kush-Meroe",
      fr: "Antiquité / Koush-Méroé",
      es: "Antigüedad / Cush-Meroe"
    },
    coordinates: { x: 68, y: 28 },
    period: {
      pt: "1000 AC - 350 DC",
      en: "1000 BC - 350 AD",
      fr: "1000 AEC - 350 EC",
      es: "1000 AC - 350 DC"
    },
    description: {
      pt: "Cuxe foi uma superpotência núbia ao sul do Egito. Conhecida por seus faraós negros que reinaram como a 25ª dinastia egípcia, suas incríveis pirâmides em Méroe, sua metalurgia avançada de ferro e as rainhas guerreiras independentes chamadas Candaces (Kandakes).",
      en: "Kush was a powerful Nubian empire south of Egypt. Famous for its Black Pharaohs who ruled Kemet during the 25th Dynasty, its unique steep pyramids in Meroë, revolutionary iron metallurgy, and the independent warrior queen mothers known as Kandakes (Candaces).",
      fr: "Le Royaume de Koush était un puissant État nubien au sud de l'Égypte, célébré pour ses Pharaons Noirs qui régnèrent sur l'Égypte (25e dynastie), ses majestueuses pyramides à Méroé, et ses reines guerrières indépendantes nommées les Candaces.",
      es: "Kush fue una enorme superpotencia nubia al sur de Egipto. Famoso por sus Faraones Negros de la dinastía XXV, sus pirámides empinadas en Meroe, su avanzada siderurgia de hierro y las reinas guerreras independientes llamadas Candaces (Kandakes)."
    },
    seshatData: {
      capital: { pt: "Méroe / Napata", en: "Meroë / Napata", fr: "Méroé / Napata", es: "Meroe / Napata" },
      territory: { pt: "600.000 km²", en: "600,000 km²", fr: "600 000 km²", es: "600.000 km²" },
      population: { pt: "1.200.000", en: "1,200,000", fr: "1 200 000", es: "1.200.000" },
      settlementHierarchy: { pt: "4 níveis", en: "4 levels", fr: "4 niveaux", es: "4 niveles" },
      administrativeLevels: { pt: "4 a 5 níveis administrativos de liderança territorial", en: "4 to 5 administrative levels of territorial leadership", fr: "4 à 5 niveaux d'administration territoriale", es: "4 a 5 niveles de administración territorial" },
      governmentType: { pt: "Monarquia Sagrada (Sucessão por Conselho)", en: "Sacred Monarchy (Council-based selection)", fr: "Monarchie sacrée (Sélection par conseil)", es: "Monarquía Sagrada (Voto por consejo sabio)" },
      languages: { pt: "Meroítico / Núbio Antigo", en: "Meroitic / Old Nubian", fr: "Méroïtique / Vieux Nubien", es: "Meroítico / Nubio Antiguo" },
      religionInfo: { pt: "Deus Leão Apedemak e Amon de Kush", en: "Lion God Apedemak and Amun of Kush", fr: "Dieu lion Apedemak et Amon de Koush", es: "Dios león Apedemak y Amón de Kush" }
    },
    primaryDocuments: [
      {
        id: "stela_tanyidamani",
        title: {
          pt: "Estela Meroítica do Rei Tanyidamani",
          en: "Meroitic Stela of King Tanyidamani",
          fr: "Stèle méroïtique du roi Tanyidamani",
          es: "Estela Meroítica del Rey Tanyidamani"
        },
        source: {
          pt: "Inscrição em rocha de xisto avermelhado do Templo de Apedemak, Méroe (c. 100 AC)",
          en: "Reddish schist slab inscribed from the Temple of Apedemak, Meroë (c. 100 BC)",
          fr: "Stèle gravée du Temple d'Apedemak à Méroé (v. 100 AEC)",
          es: "Bloque de esquisto rojo inscrito en el Templo de Apedemak, Meroe (c. 100 AC)"
        },
        content: {
          pt: "[Texto Meroítico Não Traduzido Completamente] ... weylho tewi-netse qer... Te-met-ke-se tanyi... Apedemak de-te-netse yerhe mloye-se...",
          en: "[Partially Deciphered Meroitic Text] ... tewi-netse qer... Te-met-ke-se tanyi... Dedicating monuments of victory with gratitude to the lion god Apedemak, protector of Kush...",
          fr: "[Texte méroïtique partiellement déchiffré] ... tewi-netse qer... tanyi... Dédiant des monuments de triomphe au dieu-lion Apedemak, protecteur de Méroé...",
          es: "[Texto meroítico en descifrado] ... tewi-netse qer... tanyi... Se erige este monumento de ofrendas para el dios león Apedemak, dador de soberanía..."
        }
      },
      {
        id: "rome_strabo_canadace",
        title: {
          pt: "Relato de Estrabão sobre a Rainha Canace (Candace) e Roma",
          en: "Strabo's Account of Queen Candace and the Battle of Elephantine",
          fr: "Récit de Strabon sur la guerre de la Candace contre Rome",
          es: "Relato de Estrabón sobre la campaña de la Candace contra Roma"
        },
        source: {
          pt: "Estrabão, Geografia, Livro XVII, Capítulo 1 (c. 20 AC)",
          en: "Strabo, Geography, Book XVII, Chapter 1 (c. 20 BC)",
          fr: "Strabon, Géographie, Livre XVII (v. 20 AEC)",
          es: "Estrabón, Geografía, Livre XVII, Capítulo 1 (c. 20 AC)"
        },
        content: {
          pt: "Os etíopes (núbios) marcharam contra Syene... sob o comando da rainha Candace, uma mulher máscula e cega de um olho. Eles capturaram guarnições romanas, mas foram repelidos por Petronius... Ela então enviou embaixadores a César Augusto...",
          en: "The Ethiopians (Nubians) attacked Syene... led by Queen Candace, a masculine woman who had lost an eye. They took Roman soldiers captive... but Petronius drove them back. She then sent ambassadors directly to Caesar Augustus who granted them peace and exemption from tributes.",
          fr: "Les Éthiopiens (Nubiens) marchèrent contre Syène... sous la conduite de la reine Candace, une femme virile qui avait perdu un œil. Ils capturèrent les garnisons romaines avant d'être repoussés par Pétronius... Elle envoya des ambassadeurs à Auguste qui lui accorda une trêve d'impôts.",
          es: "Los etíopes (nubios) atacaron la guarnición de Sienne... bajo el mando de la reina Candace, una mujer de carácter masculino, que había perdido un ojo. Capturaron tres cohortes romanas... Petronio contraatacó. Ante César, los embajadores de la reina obtuvieron la exención total de impuestos."
        }
      }
    ],
    bibliography: [
      {
        author: "László Török",
        title: "The Kingdom of Kush: Handbook of the Napatan-Meroitic Civilization",
        year: "1997",
        note: {
          pt: "Guia acadêmico essencial e extremamente detalhado sobre a evolução social de Kush.",
          en: "The most authoritative and detailed academic manual on Napatan-Meroitic society.",
          fr: "Le manuel de référence le plus complet sur la société et l'archéologie méroïtique.",
          es: "El manual definitivo que profundiza en la estructura y religión neroítica."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Estudar o papel social e militar das Candaces, analisando a agência de gênero no poder político meroítico.",
        "Debater os limites das fontes escritas gregas/romanas para compreender civilizações soberanas africanas."
      ],
      en: [
        "Analyze the social and military agency of the Kandakes (Queens) in Kushite society to discuss female political power in ancient times.",
        "Compare Roman textual descriptions (Strabo) with Kushite monuments to teach historical critical reading."
      ],
      fr: [
        "Étudier le rôle des Candaces comme exemples d'autorité féminine et d'indépendance politique en Afrique antique.",
        "Comparer les écrits romains (Strabon) avec les ruines méroïtiques pour cultiver l'esprit critique historique."
      ],
      es: [
        "Estudiar el estatus de las Candaces como gobernantes soberanas y militares para analizar el género y liderazgo en la antigüedad.",
        "Discutir cómo las fuentes arqueológicas de Nubia aclaran las sesgadas crónicas de los romanos."
      ]
    }
  },
  {
    id: "aksum_empire",
    name: {
      pt: "Império de Axum",
      en: "Kingdom of Aksum",
      fr: "Royaume d'Axoum",
      es: "Imperio de Aksum"
    },
    region: "horn_of_africa",
    regionLabel: {
      pt: "Chifre da África",
      en: "Horn of Africa",
      fr: "Corne de l'Afrique",
      es: "Cuerno de África"
    },
    era: "classical_era",
    eraLabel: {
      pt: "Era Clássica e Tardia",
      en: "Classical & Late Era",
      fr: "Ère classique et tardive",
      es: "Era Clásica y Tardía"
    },
    coordinates: { x: 74, y: 36 },
    period: {
      pt: "100 DC - 940 DC",
      en: "100 AD - 940 AD",
      fr: "100 EC - 940 EC",
      es: "100 DC - 940 DC"
    },
    description: {
      pt: "Axum foi um império comercial dominante no Mar Vermelho, localizado na atual Etiópia e Eritreia. Famoso por sua escrita própria Ge'ez, pela cunhagem independente de moedas de ouro para mercado global e seus monumentais obeliscos de pedra única (estelas).",
      en: "Aksum was a dominant trading empire located in modern-day Ethiopia and Eritrea. Highly influential in international maritime routes linking Rome, India, and Persia. Known for developing its own script (Ge'ez), coining gold and silver money, and designing giant monolithic stone obelisks.",
      fr: "Axoum était un puissant empire marchand situé dans l'actuelle Éthiopie et Érythrée. Il contrôlait les routes commerciales entre Rome, l'Arabie et l'Inde. Célèbre pour son écriture propre (le guèze), ses pièces de monnaie d'or et ses obélisques monolithiques.",
      es: "Aksum fue un gran imperio comercial internacional situado en las actuales Etiopía y Eritrea. Conectó las redes marítimas de Roma, India y Persia. Célebre por acuñar sus propias monedas de oro, su escritura ge'ez y sus imponentes obeliscos monolíticos."
    },
    seshatData: {
      capital: { pt: "Axum", en: "Axum", fr: "Axoum", es: "Axum" },
      territory: { pt: "300.000 - 400.000 km²", en: "300,000 - 400,000 km²", fr: "300 000 - 400 000 km²", es: "300.000 - 400.000 km²" },
      population: { pt: "500.000 - 600.000", en: "500,000 - 600,000", fr: "500 000 - 600 000", es: "500.000 - 600.000" },
      settlementHierarchy: { pt: "4 níveis", en: "4 levels", fr: "4 niveaux", es: "4 niveles" },
      administrativeLevels: { pt: "4 a 5 níveis de funcionalismo público regional", en: "4 to 5 regional administrative bureaucracy levels", fr: "4 à 5 niveaux d'administration régionale", es: "4 a 5 niveles de funcionarios del estado regional" },
      governmentType: { pt: "Monarquia Centralizada ('Negusa Nagast' / Rei dos Reis)", en: "Centralized Monarchy ('Negusa Nagast' / King of Kings)", fr: "Monarchie centralisée ('Negusa Nagast')", es: "Monarquía Centralizada ('Negusa Nagast')" },
      languages: { pt: "Ge'ez (Escrita de Sílabas Africana)", en: "Ge'ez (Native African syllabary writing)", fr: "Guèze (Écriture indigène africaine)", es: "Ge'ez (Escritura nativa silábica africana)" },
      religionInfo: { pt: "Cristianismo Ortodoxo Tewahedo (oficializado c. 330 DC)", en: "Ortodox Tewahedo Christianity (officialized c. 330 AD)", fr: "Christianisme orthodoxe tewahedo (officiel v. 330 EC)", es: "Cristianismo Ortodoxo Tewahedo (oficializado c. 330 DC)" }
    },
    primaryDocuments: [
      {
        id: "ezana_stone",
        title: {
          pt: "Inscrição Trilíngue d'Ezana (Inscrição de Adulis)",
          en: "The Trilingual Inscription of King Ezana",
          fr: "L'Inscription trilingue du Roi Ezana",
          es: "La Inscripción Trilingüe del Rey Ezana"
        },
        source: {
          pt: "Monumento de pedra inscrito no início do Século IV DC, grafado em grego, Ge'ez não vocalizado e pseudo-sabeu",
          en: "Stone obelisk inscribed in the early 4th Century AD inside Axum, written in Greek, Sabean and Ge'ez block letters",
          fr: "Stèle du début du IVe siècle de notre ère, rédigée en grec, sabéen et guèze",
          es: "Monumento de piedra grabado a principios del siglo IV DC, escrito en griego, sabeo y ge'ez antiguo"
        },
        content: {
          pt: "Ezana, rei dos aksumitas, dos himiaritas e do xisto... Forte em Cristo e grato ao Deus do céu pela vitória sobre os bejas... Erigi este monumento para proclamar a paz estabelecida...",
          en: "I, Ezana, King of the Aksumites, Himyarites, and of Kush... servant of Him who created the heaven and earth, Christ... after conquering the rebellious Beja, I ordered peaceful settlement and supplied them with cattle and wheat...",
          fr: "Moi, Ezana, roi des Axoumites, des Himyarites... serviteur du Christ... remercie le Dieu céleste qui m'a accordé la force de soumettre mes rebelles, offrant aux réfugiés du bétail et de l'orge pour vivre libre d'oppression...",
          es: "Yo, Ezana, rey de los aksumitas, de los himiaritas... agradezco al Señor de los Cielos la victoria... Al someter a los rebeldes Beja, les otorgué tierras, bueyes y trigo para su sustento perpetuo..."
        }
      }
    ],
    bibliography: [
      {
        author: "Stuart Munro-Hay",
        title: "Aksum: An African Civilisation of Late Antiquity",
        year: "1991",
        note: {
          pt: "Descrição profunda de Axum como um dos quatro impérios mais poderosos da sua era.",
          en: "Exhaustive historiography placing Axum as one of the four superpower empires of the ancient world.",
          fr: "Ouvrage de référence démontrant la stature mondiale de l'Empire d'Axoum à l'époque romaine.",
          es: "Obra indispensable que sitúa a Aksum al nivel de Roma, Persia o China en su apogeo."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Explorar as dinâmicas de comércio marítimo no Mar Vermelho usando as moedas de Axum como fontes historiográficas.",
        "Estudar a adoção do Cristianismo por Ezana comparando com o processo ocorrido no Império Romano."
      ],
      en: [
        "Investigate ancient global maritime networks mapping Aksumite trade routes to India and Rome.",
        "Contrast the introduction of Christianity in Aksum with that of the Roman Empire using Ezana's stone records."
      ],
      fr: [
        "Analyser l'intégration d'Axoum dans la mondialisation antique à travers l'étude de ses monnaies en or.",
        "Comparer l'adoption officielle du christianisme par le Roi Ezana et par l'empereur Constantin."
      ],
      es: [
        "Estudiar la moneda de oro aksumita para evidenciar las redes de globalización comercial de la era antigua.",
        "Comparar la conversión del rey Ezana con la del emperador romano Constantino mediante el estudio de sus estelas escritas."
      ]
    }
  },
  {
    id: "nok_culture",
    name: {
      pt: "Cultura Nok",
      en: "Nok Culture",
      fr: "Culture Nok",
      es: "Cultura Nok"
    },
    region: "west_africa",
    regionLabel: {
      pt: "África Ocidental",
      en: "West Africa",
      fr: "Afrique de l'Ouest",
      es: "África Occidental"
    },
    era: "antiquity",
    eraLabel: {
      pt: "Antiguidade",
      en: "Antiquity",
      fr: "Antiquité",
      es: "Antigüedad"
    },
    coordinates: { x: 38, y: 46 },
    period: {
      pt: "1500 AC - 500 DC",
      en: "1500 BC - 500 AD",
      fr: "1500 AEC - 500 EC",
      es: "1500 AC - 500 DC"
    },
    description: {
      pt: "Nok foi uma civilização nigeriana que executou a mais antiga tecnologia metalúrgica de ferro de forma autóctone na África Subsaariana e criou sofisticadas esculturas artísticas de terracota em escala real que influenciaram toda a cosmologia regional.",
      en: "Nok culture flourished in Nigeria, representing some of the earliest complex iron smelting technologies developed independently in Sub-Saharan Africa. Renowned worldwide for its highly stylized, expressive, life-sized terracotta human and animal sculptures.",
      fr: "La culture Nok s'est développée au Nigeria. Elle abrite les plus anciennes traces de sidérurgie du fer de manière autonome en Afrique subsaharienne, et se distingue par d'importantes et expressives sculptures anthropomorphes en terre cuite.",
      es: "La cultura Nok floreció en Nigeria, mostrando una de las tecnologías independientes de fundición de hierro más antiguas de África Subsahariana. Es famosa mundialmente por sus refinadas esculturas de terracota humana y animal en escala real."
    },
    seshatData: {
      capital: { pt: "Sítios esparsos (ex. Taruga / Kaduna)", en: "Dispersed settlements (e.g. Taruga / Kaduna)", fr: "Habitats dispersés (ex. Taruga)", es: "Yacimientos dispersos (ej. Taruga / Kaduna)" },
      territory: { pt: "80.000 km² (Zona de influência)", en: "80,000 km² (Influence zone)", fr: "80 000 km² (Zone d'influence)", es: "80.000 km² (Área de influencia)" },
      population: { pt: "Presumivelmente densa em aldeias", en: "Presumably dense agricultural hamlets", fr: "Présumée dense en villages", es: "Densidad agrícola aldeana media" },
      settlementHierarchy: { pt: "2 níveis (Aldeias de forja e centros artísticos)", en: "2 levels (Industrial smelting hamlets and artistic centers)", fr: "2 niveaux (Villages métallurgiques et centres d'art)", es: "2 niveles (Ladeas de fundición y centros ceremoniales)" },
      administrativeLevels: { pt: "Liderança de clãs sem burocracia pesada", en: "Clan-based chiefdoms without state bureaucracy", fr: "Chefferies de clans sans bureaucratie d'État", es: "Cacicazgos clánicos sin burocracia estatal" },
      governmentType: { pt: "Confederação de Cacicazgos Metalúrgicos", en: "Metallurgical Chiefdom Confederacy", fr: "Confédération de chefferies métallurgiques", es: "Confederación de Cacicazgos de Orfebrería y Metalurgia" },
      languages: { pt: "Língua Benue-Congo ancestral", en: "Ancestral Benue-Congo language", fr: "Langue Bénoué-Congo ancestrale", es: "Benue-Congo ancestral" },
      religionInfo: { pt: "Culto de ancestrais com esculturas votivas", en: "Ancestor worship with votive sculpture usages", fr: "Culte des ancêtres avec statuettes votives", es: "Culto de antepasados mediante terracotas ceremoniales" }
    },
    primaryDocuments: [
      {
        id: "arch_nok_furnace",
        title: {
          pt: "Relatório Arqueológico de Sítios de Taruga",
          en: "Archaeological Excavation Report of Taruga Furnaces",
          fr: "Rapport archéologique des fourneaux de Taruga",
          es: "Registro Arqueológico de los Hornos de Taruga"
        },
        source: {
          pt: "Evidência estratigráfica de mineração e forja de ferro direto de Taruga (c. 600 AC)",
          en: "Stratigraphical and radiocarbon evidence of direct iron-smelting workshops in Taruga (c. 600 BC)",
          fr: "Analyses de carbone 14 révélant des ateliers de fonte de fer de Taruga (v. 600 AEC)",
          es: "Registro sistemático de radiocarbono de hornos de fundición directa en Taruga (c. 600 AC)"
        },
        content: {
          pt: "A escavação revelou mais de 12 fornos de ferro com escória intacta in situ. O diâmetro médio dos fornos é de 40 cm. Análises de rádio-carbono associadas demonstram o domínio tecnológico seguro a partir do século VI AC, operando simultaneamente com o auge da arte plástica Nok.",
          en: "Chemical assay of slags in-situ and clay tuyeres from Taruga reveals direct-reduction bellows-operated furnaces dating from 600 BC. Slag content indicates high-temperature mastery, matching structural charcoal analysis without pre-historical copper horizons.",
          fr: "Les fouilles de Taruga ont mis au jour une dizaine de fourneaux à réduction directe de fer. Les datations confirment de hauts fourneaux fonctionnels dès 600 AEC, réfutant l'idée d'une diffusion de la métallurgie importée du Moyen-Orient.",
          es: "Los análisis estratigráficos revelan hornos de reducción directa in situ fechados en el año 600 AC en Taruga. Indica un dominio metalúrgico autóctono e independiente sin pasar por etapas previas de fundición de cobre."
        }
      }
    ],
    bibliography: [
      {
        author: "Peter Breunig",
        title: "Nok: African Sculpture in Archaeological Context",
        year: "2014",
        note: {
          pt: "Uma grande documentação visual e arqueológica de escavações sistemáticas alemãs na Nigéria.",
          en: "The most robust contemporary archaeological overview of Nok settlements and art.",
          fr: "Catalogue complet documentant les découvertes et la chronologie de l'art Nok.",
          es: "Documentación académica muy rigurosa en torno al arte y origen de la cultura Nok."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Usar a arte escultórica Nok para compreender representações estéticas de status e identidades na África Antiga.",
        "Analisar as rotas de fundição autóctone de ferro contrapondo teorias difusionistas que ignoravam a potencialidade local."
      ],
      en: [
        "Analyze the sculptural aesthetics of Nok terracotta to map social statuses, body modifications, and identity symbols in West Africa.",
        "Use Taruga's scientific archeological carbon-dating data to break down prejudices regarding technological evolution in Africa."
      ],
      fr: [
        "Explorer l'expression artistique et les ornements des visages Nok pour étudier les représentations du statut social.",
        "S'appuyer sur la métallurgie locale de Taruga pour déconstruire les théories eurocentrées sur la diffusion technologique."
      ],
      es: [
        "Estudiar los peinados y adornos de las esculturas Nok para analizar la identidad y jerarquía social en África Occidental.",
        "Analizar las fechas científicas de fundición de Taruga para desmontar ideas estereotipadas sobre la tecnología africana."
      ]
    }
  },
  {
    id: "carthage_empire",
    name: {
      pt: "Cartago",
      en: "Carthage",
      fr: "Carthage",
      es: "Cartago"
    },
    region: "north_africa",
    regionLabel: {
      pt: "Norte da África",
      en: "North Africa",
      fr: "Afrique du Nord",
      es: "Norte de África"
    },
    coordinates: { x: 43, y: 14 },
    era: "antiquity",
    eraLabel: {
      pt: "Antiguidade",
      en: "Antiquity",
      fr: "Antiquité",
      es: "Antigüedad"
    },
    period: {
      pt: "814 AC - 146 AC",
      en: "814 BC - 146 BC",
      fr: "814 AEC - 146 AEC",
      es: "814 AC - 146 AC"
    },
    description: {
      pt: "Fundada originalmente por fenícios no atual Tunísia, Cartago transformou-se em uma rica talassocracia norte-africana soberana. Entrou em sangrentas guerras de disputa hegemônica com Roma (Guerras Púnicas), unificando redes de comércio transaarianas e mediterrâneas.",
      en: "Founded on the coast of Tunisia, Carthage developed into a dominant independent North African maritime superpower and trade empire. Led major wars against the Roman Republic (Punic Wars), pioneered complex trans-Saharan gold trade routes and advanced harbors (Cothon).",
      fr: "Fondée sur la côte tunisienne, Carthage est devenue une superpuissance maritime nord-africaine. Elle domina le commerce méditerranéen et s'opposa à Rome lors des célèbres Guerres Puniques, s'appuyant sur les ressources et réseaux du Sahara.",
      es: "Establecida en Túnez, Cartago creció hasta ser una imponente talasocracia de soberanía norteafricana. Disputó la hegemonía del Mediterráneo a Roma (Guerras Púnicas) y estructuró flujos mercantiles entre el continente y el mar."
    },
    seshatData: {
      capital: { pt: "Cartago", en: "Carthage", fr: "Carthage", es: "Cartago" },
      territory: { pt: "150.000 km² (Metropolitano / Costeiro)", en: "150,000 km² (Metropolitan / Coastal)", fr: "150 000 km² (Métropolitain / Côtier)", es: "150.000 km² (Zonas costeras combinadas)" },
      population: { pt: "200.000 (Cidade capital) | 1.000.000 (Império)", en: "200,000 (Capital) | 1,000,000 (Empire total)", fr: "200 000 (Capitale) | 1 000 000 (Empire)", es: "200.000 (Ciudad soberana) | 1.000.000 (Total púnico)" },
      settlementHierarchy: { pt: "3 níveis", en: "3 levels", fr: "3 niveaux", es: "3 niveles" },
      administrativeLevels: { pt: "4 níveis (Senado de Sufetes, Governadores provinciais)", en: "4 levels (Suffete Senate, Provincial governors)", fr: "4 niveaux (Sénat de Suffètes, Gouverneurs provinciaux)", es: "4 niveles (Senado de Sufetes, Delegados locales)" },
      governmentType: { pt: "República Oligárquica Democrática Mercantil", en: "Mercantile Oligarchical Democratic Republic", fr: "République oligarchique marchande", es: "República Oligárquica Mercantil" },
      languages: { pt: "Púnico (Escrita Fenícia consonantal)", en: "Punic (Consonantal Phoenician script)", fr: "Punique (Alphabe phénicien)", es: "Púnico (Alfabeto consonántico fenicio)" },
      religionInfo: { pt: "Culto de Baal Hammon e Tanit (com panteão de deidades marítimas)", en: "Cult of Baal Hammon and Tanit (maritime pantheon)", fr: "Culte de Baal Hammon et Tanit", es: "Culto de Baal Hammon y Tanit" }
    },
    primaryDocuments: [
      {
        id: "hanno_navigation",
        title: {
          pt: "O Périplo de Hanão, o Navegador",
          en: "The Periplus of Hanno the Navigator",
          fr: "Le Périple d'Hannon le Navigateur",
          es: "El Periplo de Hannón el Navegador"
        },
        source: {
          pt: "Manuscrito grego bizantino cópia de placa de bronze originalmente gravada em templo cartaginês (c. 500 AC)",
          en: "Greek translation of a Carthaginian bronze plaque dedicatory inscription inside the Temple of Baal (c. 500 BC)",
          fr: "Transcription d'une tablette de bronze suspendue dans le temple de Baal (v. 500 AEC)",
          es: "Copia griega de una placa de bronze fijada originalmente en un templo cartaginés (c. 500 AC)"
        },
        content: {
          pt: "Foi decretado que os cartagineses deveriam navegar além das Colunas de Hércules para fundar novas cidades líbio-fenícias. Navegamos por dias, fundando altares... Encontramos um grande golfo e rios onde crocodilos abundavam...",
          en: "It was decreed by the Carthaginians that Hanno should make a voyage beyond the Pillars of Hercules and found cities... We sailed with sixty ships carrying 30,000 men and women... going past Libya and discovering lush lands, dense forests, and large mountains of fire...",
          fr: "Il a été décidé par le sénat de Carthage d'envoyer Hannon naviguer au-delà des Colonnes d'Hercule pour fonder des colonies de Libyo-Phéniciens. Nous naviguâmes avec 60 navires portant 30 000 colons... découvrant des fleuves peuplés de crocodiles...",
          es: "Fue resuelto por los cartagineses que Hannón emprendiera un viaje para fundar ciudades líbio-fenicias más allá de las Columnas de Hércules. Partimos con sesenta naves... fundando fortalezas e identificando nuevos ríos donde abundaban hipopótamos..."
        }
      }
    ],
    bibliography: [
      {
        author: "Serge Lancel",
        title: "Carthage: A History",
        year: "1995",
        note: {
          pt: "Descrição arqueológica rica e imparcial do esplendor de Cartago alternativo à visão romana.",
          en: "Highly regarded comprehensive historical account of Carthaginian society and ports.",
          fr: "Synthèse magistrale et équilibrée remettant en valeur la perspective punique face aux historiens romains.",
          es: "Estudio exhaustivo que resguarda la memoria púnica libre del exclusivo filtro triunfal de Roma."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Usar a rota do Périplo de Hanão para estudar a exploração geográfica marítima da costa africana ocidental na Antiguidade.",
        "Refletir sobre como a história de uma nação destruída (Cartago) é contada de maneira tendenciosa por seus conquistadores (Roma)."
      ],
      en: [
        "Map the navigation routes of Hanno to learn ancient geography and naval technology along Africa's Atlantic coast.",
        "Discuss bias in historiography: How historians must filter Roman sources to understand Carthaginians."
      ],
      fr: [
        "Utiliser l'expédition d'Hannon pour cartographier les voyages antiques le long des côtes atlantiques africaines.",
        "Analyser l'évaluation critique des sources : comment appréhender une nation décimée à travers les écrits de son vainqueur (Rome)."
      ],
      es: [
        "Trazar las rutas marítimas descritas por Hannón para estudiar la navegación atlántica de la antigüedad.",
        "Debatir sobre la imparcialidad histórica: de qué manera reconstruir una cultura derrotada basándose en las crónicas de los militares de Roma."
      ]
    }
  },
  {
    id: "land_of_punt",
    name: {
      pt: "Terra de Punt (Pount)",
      en: "Land of Punt (Punt)",
      fr: "Pays de Pount (Punt)",
      es: "Tierra de Punt (Punt)"
    },
    region: "horn_of_africa",
    regionLabel: {
      pt: "Chifre da África",
      en: "Horn of Africa",
      fr: "Corne de l'Afrique",
      es: "Cuerno de África"
    },
    era: "pre_bronze",
    eraLabel: {
      pt: "Idade do Bronze / Antigo",
      en: "Bronze Age & Older",
      fr: "Âge du Bronze / Ancien",
      es: "Edad del Bronce / Antiguo"
    },
    coordinates: { x: 76, y: 38 },
    period: {
      pt: "2500 AC - 980 AC",
      en: "2500 BC - 980 BC",
      fr: "2500 AEC - 980 AEC",
      es: "2500 AC - 980 AC"
    },
    description: {
      pt: "Uma misteriosa e lendária terra dourada de abundância de bens localizada no Mar Vermelho / Chifre da África. Reconhecida pelas grandes rotas comerciais pacíficas onde os egípcios importavam incenso de alta pureza, mirra, ouro e animais exóticos.",
      en: "A legendary and wealthy trading partner of Ancient Egypt situated on the Red Sea / Horn of Africa. Noted for peaceful diplomatic exchanges where Egyptians imported high-grade gold, frankincense, myrrh, ebony wood, and exotic animals.",
      fr: "Un royaume légendaire de grande richesse situé autour de la mer Rouge et du littoral d'Afrique de l'Est. Partenaire privilégié de l'Égypte pour l'importation de myrrhe, d'encens pur, d'ébène et de métaux précieux.",
      es: "Un próspero y sagrado centro mercantil situado en el mar Rojo / Cuerno de África. Célebre por las expediciones de intercambio recíproco y pacífico de donde Kemet importaba mirra, resinas olorosas, incienso, ébano y oro."
    },
    seshatData: {
      capital: { pt: "Desconhecida (Ativa em Adulis/marítima)", en: "Unknown (active around maritime depots)", fr: "Inconnue (littoral de la Mer Rouge)", es: "No identificada (activo comercial costero)" },
      territory: { pt: "Variável (Chifre da África / Eritreia / Somália)", en: "Variable coastal reach (Horn / Somalia / Eritrea)", fr: "Variable littoral (Corne / Somalie)", es: "Dinámico (Zonas litorales del Somalilandia)" },
      population: { pt: "Desconhecida", en: "Unknown", fr: "Inconnue", es: "No estimada" },
      settlementHierarchy: { pt: "2 níveis", en: "2 levels", fr: "2 niveaux", es: "2 niveles" },
      administrativeLevels: { pt: "Lideranças senhoriais cooperativas", en: "Cooperative peer-chiefdom networks", fr: "Confédération lâche de ports sacrés", es: "Esquema confederado de puertos soberanos de comercio" },
      governmentType: { pt: "Monarquia ou Confederação Comercial de Chefes", en: "Chiefdom Confederacy or Sacred Trade Kingdom", fr: "Chefferie commerciale sacrée", es: "Señorío sagrado de dinastías de comercio" },
      languages: { pt: "Língua afro-asiática antiga", en: "Ancient Afro-Asiatic or Sabean ancestor", fr: "Langue afro-asiatique ancienne", es: "Afroasiático ancestral de la costa" },
      religionInfo: { pt: "Culto de deidades da natureza (Deus Sol / Ta Netjer)", en: "Worship of Nature gods and Sacred Land deities ('Ta Netjer')", fr: "Culte solaire et de la terre sacrée ('Ta Netjer')", es: "Veneración de fuerzas telúricas y la Tierra Sagrada ('Ta Netjer')" }
    },
    primaryDocuments: [
      {
        id: "temple_hatshepsut_punt",
        title: {
          pt: "Relevos de Punt no Templo de Hatshepsut",
          en: "Queen Hatshepsut's Punt Expedition Reliefs",
          fr: "Reliefs de l'expédition à Pount - Temple d'Hatchepsout",
          es: "Relieves del Viaje a Punt en el Templo de Hatshepsut"
        },
        source: {
          pt: "Inscrições e figuras polícromas nas paredes do Templo de Deir el-Bahari, Luxor (c. 1473 AC)",
          en: "Hieroglyphic logs and carved stone registers in the Temple of Deir el-Bahari, Luxor (c. 1473 BC)",
          fr: "Fresques murales sculptées du temple de Deir el-Bahari à Louxor (v. 1473 AEC)",
          es: "Relieves e inscripciones jeroglíficas en el Templo de Deir el-Bahari, Luxor (c. 1473 AC)"
        },
        content: {
          pt: "Navegação no Mar Vermelho sob o comando real... O chefe de Punt, Parahu, acompanhado de sua esposa Ati, recebendo as oferendas dos enviados de Hatshepsut... Eles trouxeram grandes árvores de mirra frescas para plantar em Tebas...",
          en: "Loading the ships heavily with marvels from the Land of Punt... dynamic heaps of green myrrh-resin, fresh myrrh trees to be planted in Amen's garden, fine gold, ebony logs, and baboons... 'Never was the like brought to any king since the beginning'...",
          fr: "Chargement des navires de toutes les merveilles du pays de Pount... des tas de résine fraîche, de grands arbres à myrrhe encore en mottes pour les jardins du dieu Amon, de l'or de Pount... le chef de Pount, Parahou et sa reine Ati accueillant nos émissaires...",
          es: "Carga masiva de los buques con todos los prodigios de la Tierra de Punt... montes de mirra selecta, árboles vivos para reforestar el santuario de Tebas, oro puro, ébano, monos... El cacique de Punt, Parahu, y su esposa Ati saludan a las flotas egipcias..."
        }
      }
    ],
    bibliography: [
      {
        author: "Kathryn Bard & Rodolfo Fattovich",
        title: "Harbor of the Pharaohs to the Land of Punt",
        year: "2018",
        note: {
          pt: "Investigações arqueológicas do porto egípcio de Mersa Gawasis confirmando comércio com Punt.",
          en: "Detailed excavation reports at Mersa Gawasis harbor proving historical material trading loops with Punt.",
          fr: "Analyses de fouilles récentes prouvant la réalité matérielle des voyages maritimes vers Pount.",
          es: "Excavación en Mersa Gawasis que prueba científicamente la viabilidad náutica de los viajes a Punt."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Discutir o papel de diplomatas e governantes mulheres no comércio antigo (Hatshepsut e a Rainha de Punt Ati).",
        "Analisar graficamente os relevos do Templo para deduzir o meio ambiente, fauna e flora da África Oriental no II milênio AC."
      ],
      en: [
        "Study Hatshepsut's expedition reliefs to reconstruct the environment, housing (stilt houses), flora, and fauna of Eastern Africa.",
        "Reflect on female leadership networks and diplomacy during the New Kingdom period."
      ],
      fr: [
        "Analyser l'iconographie des fresques de Deir el-Bahari pour étudier l'architecture (huttes sur pilotis) et la biodiversité de Pount.",
        "Discuter de l'importance de la diplomatie et des femmes au pouvoir (Hatchepsout et la reine Ati)."
      ],
      es: [
        "Examinar la arquitectura palustre y fauna de Punt visible en los relieves de Deir el-Bahari para estudiar la ecología histórica.",
        "Analizar la diplomacia pacífica prehispánica frente a la recurrente narrativa militarista de las civilizaciones."
      ]
    }
  },
  {
    id: "mali_empire",
    name: {
      pt: "Império do Mali",
      en: "Mali Empire",
      fr: "Empire du Mali",
      es: "Imperio de Malí"
    },
    region: "west_africa",
    regionLabel: {
      pt: "África Ocidental",
      en: "West Africa",
      fr: "Afrique de l'Ouest",
      es: "África Occidental"
    },
    era: "classical_era",
    eraLabel: {
      pt: "Era Clássica e Tardia",
      en: "Classical & Late Era",
      fr: "Ère classique et tardive",
      es: "Era Clásica y Tardía"
    },
    coordinates: { x: 24, y: 38 },
    period: {
      pt: "1230 DC - 1670 DC",
      en: "1230 AD - 1670 AD",
      fr: "1230 EC - 1670 EC",
      es: "1230 DC - 1670 DC"
    },
    description: {
      pt: "O Império do Mali foi uma das civilizações mais ricas e territoriais da história global, fundada pelo herói Sundiata Keita. Controlava as ricas minas de ouro de Bambuk e Boure, abrigava a célebre universidade de Sankore em Tombouctou e produziu o lendário Mansa Musa, o homem mais rico da história medieval.",
      en: "The Mali Empire was one of the wealthiest and largest empires in global history, founded by the hero Sundiata Keita. Ruling over the vast Saharan routes, it monopolized gold and salt, built the historic university of Sankore in Timbuktu, and produced Mansa Musa, widely considered the wealthiest individual in world history.",
      fr: "L'Empire du Mali fut l'une des civilisations les plus riches et les plus vastes au monde, fondée par le héros Soundiata Keïta. Maître de l'or de Bambouk et du sel du Sahara, il abritait l'université de Sankoré à Tombouctou et engendra le célèbre Mansa Moussa.",
      es: "El Imperio de Malí fue uno de los reinos más opulentos del planeta, constituido bajo la epopeya de Sundiata Keita. Gobernó el flujo aurífero transahariano, dotó a Tombuctú de la célebre Madraza de Sankore y coronó a Mansa Musa en su gloriosa ruta a La Meca."
    },
    seshatData: {
      capital: { pt: "Niani / Kangaba", en: "Niani / Kangaba", fr: "Niani / Kangaba", es: "Niani / Kangaba" },
      territory: { pt: "1.700.000 - 1.900.000 km² (Seshat)", en: "1,700,000 - 1,900,000 km² (Seshat)", fr: "1 700 000 - 1 900 000 km² (Seshat)", es: "1.700.000 - 1.900.000 km² (Seshat)" },
      population: { pt: "4.000.000 - 5.000.000 (Seshat)", en: "4,000,000 - 5,000,000 (Seshat)", fr: "4 000 000 - 5 000 000 (Seshat)", es: "4.000.000 - 5.000.000 (Seshat)" },
      settlementHierarchy: { pt: "4 níveis de centros urbanos complexos", en: "4 levels of complex urban settlement hierarchy", fr: "4 niveaux d'urbanisation urbaine complexe", es: "4 niveles de red urbana con centros fortificados" },
      administrativeLevels: { pt: "4 a 5 níveis administrados por governadores de províncias (Farins)", en: "4 to 5 administrative levels governed by provincial officers (Farins)", fr: "4 à 5 niveaux gérés par les Farins (gouverneurs)", es: "4 a 5 niveles regidos por gobernadores locales (Farins)" },
      governmentType: { pt: "Monarquia Constitucional Federal ('Gbara' ou Grande Conselho)", en: "Federal Constitutional Monarchy ('Gbara' or Grand Council)", fr: "Monarchie constitutionnelle fédérale ('Gbara')", es: "Monarquía Federal Constitucional ('Gbara' o Gran Parlamento)" },
      languages: { pt: "Mandinka / Mande", en: "Mandinka / Mande dialects", fr: "Mandingue (Mandinka)", es: "Mandinga / Dialectos Mande" },
      religionInfo: { pt: "Islamismo sincrético tolerante e crenças locais Mande", en: "Syncretic Islam and traditional Mande cosmologies", fr: "Islam syncrétique tolérant et cultes traditionnels mandé", es: "Islamismo sincrético integrador y cultos tradicionales mandé" }
    },
    primaryDocuments: [
      {
        id: "kouroukan_fouga",
        title: {
          pt: "A Carta de Kouroukan Fouga (Constituição de Mali)",
          en: "The Charter of Kouroukan Fouga (Mali's Constitution)",
          fr: "La Charte de Kouroukan Fouga (Constitution du Mali)",
          es: "La Carta de Kouroukan Fouga (Constitución del Imperio de Malí)"
        },
        source: {
          pt: "Proclamada por via oral pelo conselho de Sundiata Keita em 1236 DC, transcrita e registrada pela UNESCO",
          en: "Proclaimed orally by Sundiata Keita's Gbara Assembly in 1236 AD, documented as UNESCO Oral Heritage of Humanity",
          fr: "Proclamée oralement par l'assemblée des clans réunis en 1236 EC, inscrite au patrimoine de l'UNESCO",
          es: "Proclamada por tradición oral solemne en la colina de Kurukan Fuga en 1236 DC, inscrita por la UNESCO"
        },
        content: {
          pt: "Todo indivíduo tem direito à vida e à integridade de sua pessoa... Que o respeito mútuo e a solidariedade familiar fortaleçam nossas províncias... Os estrangeiros em nosso império devem receber proteção e hospitalidade perpétua... As mulheres devem participar da administração de nossos lares e consultas políticas...",
          en: "Every human life has a right to be respected... Avoid pride and hubris; respect the lineage and alliances of communities... No one shall offend or reduce another to illegal servitude... Strangers and guests shall be sheltered with warmth. Women shall have representation in governance assemblies and domestic rights...",
          fr: "Toute vie humaine est sacrée... Respectez les étrangers et tendez-leur la main... Les femmes, en plus de leurs occupations quotidiennes, doivent être associées à tous nos conseils... Que la concorde règne au sein de la fédération...",
          es: "Toda vida humana es sagrada y merece salvaguarda... Se declara el fin de la servidumbre abusiva... Los huéspedes y embajadores extranjeros gozarán de paz y protección... Las mujeres serán consultadas en la toma de decisiones comunitarias..."
        }
      },
      {
        id: "ibn_battuta_mali",
        title: {
          pt: "Relato de Viagem de Ibn Battuta em Mali",
          en: "Ibn Battuta's Travel Memoirs of the Mali Empire",
          fr: "Récits de voyage d'Ibn Battouta au Mali",
          es: "Crónicas de Ibn Battuta sobre el Imperio de Malí"
        },
        source: {
          pt: "Ibn Battuta, Rihla (Estudo de Viagem), c. 1353 DC",
          en: "Ibn Battuta, Rihla (The Journey), written in Morocco c. 1353 AD",
          fr: "Ibn Battouta, Rihla (Le Voyage), rédigée au Maroc v. 1353 EC",
          es: "Ibn Battuta, Rihla (Regalo de Curiosos), editado en Fez c. 1353 DC"
        },
        content: {
          pt: "De todos os povos, os negros de Mali possuem o mais alto nível de amor pela justiça. O Mansa não perdoa ninguém culpado de injustiça... Há segurança absoluta em suas terras. Um viajante pode andar só, sem medo algum de assaltantes ou confiscos de bens... Seus festivais de sexta-feira são celebrados com orações devotas e limpezas impecáveis...",
          en: "The Negroes of Mali possess some admirable qualities. They are seldom unjust, and have a greater abhorrence of injustice than any other people... There is complete safety in their country. Neither traveler nor inhabitant has anything to fear from robbers or men of violence... They are extremely careful in practicing prayers, and keep their white garments spotlessly clean...",
          fr: "La justice est une vertu cardinale de l'Empire du Mali; le Mansa ne pardonne aucun acte d'oppression... La sécurité est totale : un marchand ou un étranger peut y voyager seul avec de grandes richesses sans nulle crainte de brigandage... Ils sont d'une piété remarquable...",
          es: "Los habitantes de Malí tienen amor instintivo por la justicia de la cual dan muestras extremas... La seguridad es inmensa : cualquiera puede transitar el país cargado de oro sin el menor temor a ladrones o confiscaciones..."
        }
      }
    ],
    bibliography: [
      {
        author: "D.T. Niane",
        title: "Sundiata: An Epic of Old Mali",
        year: "1960",
        note: {
          pt: "O clássico poema épico de fundação do Mali traduzido a partir da sabedoria do griot Mamadou Kouyaté.",
          en: "The fundamental foundation epic of early Mali translated from the griot oral traditions.",
          fr: "L'épopée fondatrice du Mali racontée par la tradition orale et couchée par écrit.",
          es: "Poema épico imprescindible que recupera la memoria de Sundiata mediante sabios Griots."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Estudar a Carta de Kouroukan Fouga como um documento pioneiro de direitos humanos na Idade Média africana.",
        "Refletir sobre a importância dos Griots (tradicionistas orais) na preservação das histórias de impérios complexos."
      ],
      en: [
        "Incorporate the Kouroukan Fouga Charter in human rights curricula to supplement Magna Carta studies.",
        "Analyze oral histories of the Griots to discuss historical methods beyond physical documents."
      ],
      fr: [
        "Étudier la Charte de Kouroukan Fouga comme l'un des plus anciens textes constitutionnels sur les droits de la personne.",
        "Mettre en valeur le rôle des Griots comme historiens dépositaires de la mémoire collective."
      ],
      es: [
        "Analizar la Carta de Kouroukan Fouga para debatir los derechos humanos en perspectiva medieval afrocentrada.",
        "Reconocer el estatus del Griot como custodio de la memoria científica e histórica de los pueblos."
      ]
    }
  },
  {
    id: "songhai_empire",
    name: {
      pt: "Império Songai",
      en: "Songhai Empire",
      fr: "Empire Songhaï",
      es: "Imperio Songhai"
    },
    region: "west_africa",
    regionLabel: {
      pt: "África Ocidental",
      en: "West Africa",
      fr: "Afrique de l'Ouest",
      es: "África Occidental"
    },
    era: "classical_era",
    eraLabel: {
      pt: "Era Clássica e Tardia",
      en: "Classical & Late Era",
      fr: "Ère classique et tardive",
      es: "Era Clásica y Tardía"
    },
    coordinates: { x: 29, y: 37 },
    period: {
      pt: "1464 DC - 1591 DC",
      en: "1464 AD - 1591 AD",
      fr: "1464 EC - 1591 EC",
      es: "1464 DC - 1591 DC"
    },
    description: {
      pt: "O Império Songai sucedeu a Mali como a principal superpotência do Sahel Ocidental. Sob o comando de Sonny Ali e do grande reformador islâmico Askia Muhammad, unificou administrativamente um vasto espaço, institucionalizou pesos e medidas comerciais, e patrocinou importantes eruditos em Gao e Tombouctou.",
      en: "The Songhai Empire succeeded Mali as the supreme superpower of West Africa. Spearheaded by Askia Muhammad, it structured a highly efficient civil service, aligned standardized commercial weights across markets, and hosted famous international scholars in Timbuktu and Gao.",
      fr: "Succédant au Mali, l'Empire Songhaï devint la plus grande puissance du Sahel. Sous le règne de Soni Ali Ber puis d'Askia Mohammed, il unifia les poids et mesures du commerce saharien et finança des centres de savoir internationaux à Tombouctou.",
      es: "Songhai sucedió a Malí como la fuerza dominante de África Subsahariana. Dirigido por el reformador militar Askia Muhammad, normalizó las pesas y monedas del mercado sahariano y subsidió universidades respetables en Gao y Tombuctú."
    },
    seshatData: {
      capital: { pt: "Gao", en: "Gao", fr: "Gao", es: "Gao" },
      territory: { pt: "1.400.000 km²", en: "1,400,000 km²", fr: "1 400 000 km²", es: "1.400.000 km²" },
      population: { pt: "3.500.000 - 4.500.000", en: "3,500,000 - 4,500,000", fr: "3 500 000 - 4 500 000", es: "3.500.000 - 4.500.000" },
      settlementHierarchy: { pt: "4 níveis (Cidades universitárias fortificadas, feiras)", en: "4 levels including walled trading university cities", fr: "4 niveaux (Villes universitaires fortifiées, foires)", es: "4 niveles de red urbana con ciudades amuralladas" },
      administrativeLevels: { pt: "5 níveis executivos com prefeitos urbanos dedicados", en: "5 levels with dedicated urban mayors and central ministers", fr: "5 niveaux avec ministres spéciaux et maires municipaux", es: "5 niveles ejecutivos estructurados en ministerios centrales" },
      governmentType: { pt: "Monarquia Centralizada com Conselho de Ministros", en: "Centralized Monarchy with specialized Council of Ministers", fr: "Monarchie centralisée dotée de Conseils de ministres", es: "Monarquía Centralizada con Ministros Ejecutivos" },
      languages: { pt: "Songai / Árabe (chancelaria acadêmica)", en: "Songhai / Arabic (scholarly administration)", fr: "Songhaï / Arabe (lettrés et commerce)", es: "Songhai / Árabe (cortes y cancillerías)" },
      religionInfo: { pt: "Islamismo Ortodoxo Sunita patrocinando ciências jurídicas", en: "Sunni Islam sponsoring judicial and scientific systems", fr: "Islam sunnite finançant sciences juridiques", es: "Islam sunní promotor de escuelas de jurisprudencia" }
    },
    primaryDocuments: [
      {
        id: "tarikh_al_sudan",
        title: {
          pt: "Tarikh al-Sudan (Crônica do País dos Negros)",
          en: "Tarikh al-Sudan (History of the Land of the Blacks)",
          fr: "Tarikh al-Soudan (La Chronique du pays des Noirs)",
          es: "Tarikh al-Sudán (Crónica sobre el Territorio de los Negros)"
        },
        source: {
          pt: "Abderrahman as-Sadi, manuscrito compilado na Tombouctou renascentista africana, c. 1655 DC",
          en: "Al-Sa'di, written in Timbuktu, documenting the renaissance of the Songhai state c. 1655 AD",
          fr: "Abderrahmane as-Sa'di, manuscrit historique rédigé à Tombouctou, v. 1655 EC",
          es: "Abderrahman as-Sadi, manuscrito histórico de la universidad de Tombuctú, c. 1655 DC"
        },
        content: {
          pt: "Tombouctou era excelente em decoro e paz, dotada de homens religiosos de profunda erudição... O Mansa Askia Muhammad estabeleceu regras de conduta estritas, limpou os mercados de comerciantes fraudulentos e preencheu as corte com juízes qualificados que escreviam sentenças justas...",
          en: "Timbuktu was highly respected for its clean public spaces... Askia Muhammad was a righteous leader, unifying weights for rice and salt, placing judges in every district, and paying stipends to students and jurists out of the central treasury so they would remain independent...",
          fr: "Tombouctou était célèbre pour la décence de son peuple et l'ampleur de ses bibliothèques... Askia Muhammad nomma des juges impartiaux, lutta contre la fraude commerciale en pesant équitablement le blé...",
          es: "Tombuctú era respetable y pacífica, colmada de sabios de profunda elocuenca... Askia Muhammad unificó los patrones métricos de los mercados y pagó salarios fijos a juristas e historiadores..."
        }
      }
    ],
    bibliography: [
      {
        author: "John Hunwick",
        title: "Timbuktu and the Songhay Empire: Al-Sadi's Tarikh al-Sudan down to 1613",
        year: "1999",
        note: {
          pt: "Tradução comentada e profunda sobre a maturidade política de Songai no Sahel.",
          en: "An excellent commented edition of the medieval African history of Songhai.",
          fr: "La traduction scientifique indispensable de la chronique d'Al-Sadi.",
          es: "Traducción crítica y comentada del Tarikh, reconstruyendo el esplendor de Tombuctú."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Incentivar o estudo da universidade de Sankore em Tombouctou para abordar as rotas de transmissão científica e astronômica na África Ocidental.",
        "Estudar a centralização comercial através da aferição uniforme de balanças de ouro."
      ],
      en: [
        "Examine the university systems of Sankore to discuss West Africa's contributions to global legal, medical, and astrological studies.",
        "Evaluate standard market policies implemented by Askia Muhammad using the primary source texts."
      ],
      fr: [
        "Démontrer le rayonnement intellectuel de l'Université de Sankoré pour décoloniser l'histoire des savoirs universitaires.",
        "Comparer la bureaucratie de Songhaï à celle des empires européens contemporains de la Renaissance."
      ],
      es: [
        "Analizar el sistema de bibliotecas de Sankore para comprender la ciencia y producción escrita en África Occidental.",
        "Reflexionar sobre la estandarización mercantil de pesos y pesos mínimos en los mercados premodernos."
      ]
    }
  },
  {
    id: "great_zimbabwe",
    name: {
      pt: "Grande Zimbábue",
      en: "Great Zimbabwe",
      fr: "Grand Zimbabwe",
      es: "Gran Zimbabue"
    },
    region: "central_sahara", // Mapping to southern/east African regions mapped centrally
    regionLabel: {
      pt: "África Austral / Central",
      en: "Southern / Central Africa",
      fr: "Afrique Australe / Centrale",
      es: "África Austral / Central"
    },
    era: "classical_era",
    eraLabel: {
      pt: "Era Clássica e Tardia",
      en: "Classical & Late Era",
      fr: "Ère classique et tardive",
      es: "Era Clásica y Tardía"
    },
    coordinates: { x: 60, y: 76 },
    period: {
      pt: "1200 DC - 1550 DC",
      en: "1200 AD - 1550 AD",
      fr: "1200 EC - 1550 EC",
      es: "1200 DC - 1550 DC"
    },
    description: {
      pt: "O Grande Zimbábue foi a capital de um próspero reino shona famoso por sua arquitetura monumental de muralhas de granito curvas encaixadas sem uso de argamassa (a Grande Muralha). Conectava minas ricas de ouro do interior costeiro com os portos de comércio suíli no Oceano Índico.",
      en: "Great Zimbabwe was the capital of a wealthy Shona trading kingdom. Celebrated for its giant curved granite walls constructed without mortar (the Great Enclosure), it linked the inner African gold mines with maritime Swahili ports, trading with China, India, and Arabia.",
      fr: "Le Grand Zimbabwe fut le cœur d'une opulente civilisation shona, célèbre pour ses gigantesques enceintes de blocs de granit taillés à la perfection et assemblés sans mortier. Ce centre brassait l'or, le cuivre et l'ivoire connectés aux ports swahilis de l'Océan Indien.",
      es: "El Gran Zimbabue representó la capital monumental de la civilización Shona. Célebre por su complejo de murallas curvas de granito encajadas de forma impecable sin argamasa (el Gran Recinto), canalizó los metales hacia los puertos del Índico."
    },
    seshatData: {
      capital: { pt: "Grande Zimbábue", en: "Great Zimbabwe", fr: "Grand Zimbabwe", es: "Gran Zimbabue" },
      territory: { pt: "50.000 km² (Território direto)", en: "50,000 km² (Direct territory control)", fr: "50 000 km² (Contrôle direct)", es: "50.000 km² (Núcleo directo)" },
      population: { pt: "10.000 - 20.000 (Cidade central)", en: "10,000 - 20,000 (Metropolitan center)", fr: "10 000 - 20 000 (Centre urbain)", es: "10.000 - 20.000 (Centro urbano principal)" },
      settlementHierarchy: { pt: "3 níveis", en: "3 levels", fr: "3 niveaux", es: "3 niveles" },
      administrativeLevels: { pt: "5 níveis executivos de coordenação tributária", en: "5 administrative levels coordinating agricultural and mine tribute", fr: "5 niveaux assurant la collecte de l'or et des céréales", es: "5 niveles de coordinación tributaria y ganadera" },
      governmentType: { pt: "Monarquia Sagrada Dividida por Distritos", en: "Sacred Monarchy based on regional Chiefs", fr: "Monarchie sacrée de chefs d'ethnies Shona", es: "Monarquía Sagrada de tradición Shona" },
      languages: { pt: "Shona (Língua Bantu)", en: "Shona (Bantu language family)", fr: "Shona (Famille linguistique bantoue)", es: "Shona (Rama lingüística bantú)" },
      religionInfo: { pt: "Culto ao deus supremo Mwari de matriz Shona", en: "Cult of Mwari (Supreme Shona Creator deity)", fr: "Culte de Mwari (Dieu suprême créateur shona)", es: "Culto teológico a Mwari (Dios creador Shona)" }
    },
    primaryDocuments: [
      {
        id: "arch_china_celadon",
        title: {
          pt: "Evidência de Porcelana Celadon Chinesa e Contas de Vidro da Índia",
          en: "Excavated Chinese Celadon and Indian Glass Beads Records",
          fr: "Régistre de vaisselles celadon de Chine et perles de verre d'Inde",
          es: "Registro de Cerámica Celadón China y Cuentas de Vidrio Indias"
        },
        source: {
          pt: "Fragmentos recuperados em escavações científicas no interior da Crônica do Grande Recinto (Séc. XIV DC)",
          en: "Excavated ceramic fragments from the Great Enclosure layers showing Ming/Song imports from the Indian Ocean loop (14th Century AD)",
          fr: "Découverte stratigraphique de porcelaines chinoises et perles de verre perses importées de l'Océan Indien",
          es: "Fragmentos desenterrados de las capas del Gran Recinto fechados en el siglo XIV DC, procedentes de puertos suajili"
        },
        content: {
          pt: "A evidência física in situ nos depósitos do palácio real revelou vasos originais da dinastia Song de cerâmica Celadon verde, mais de 10.000 contas de vidro originárias da Índia e cerâmica esmaltada da Pérsia. Isso prova a integração inquestionável do comércio do planalto shona com os portos costeiros como Kilwa Kisiwani.",
          en: "Physical evidence in-situ inside the royal dry-stone structures reveals premium green Song and Ming Dynasty celadon tableware, Persian glazed pottery, and thousands of glass beads manufactured in Gujarat, India, confirming continuous long-distance trading directly linked via Swahili maritime ports.",
          fr: "Les vestiges archéologiques in-situ rapportent des plats de céladon de la dynastie Song, des perles de verre de l'Inde et des faïences de Perse, prouvant de solides liens de commerce transocéanique liant l'intérieur du continent africain aux dynamos marchandes swahilies.",
          es: "La excavación científica reporta cerámica pintada de origen persa, celadón verde chino de la dinastía Song e inmensas cuentas de vidrio de la India, constatando un lazo comercial global con los puertos mercantiles del océano Índico."
        }
      }
    ],
    bibliography: [
      {
        author: "Thomas N. Huffman",
        title: "Sources for Great Zimbabwe: An Archaeological and History Companion",
        year: "2015",
        note: {
          pt: "Uma das maiores autoridades arqueológicas sobre o significado espacial e cultural do Grande Zimbábue.",
          en: "Highly comprehensive structural analysis of the spatial and religious architecture of Great Zimbabwe.",
          fr: "L'ouvrage de référence sur la cosmologie shona et les fouilles du monument.",
          es: "Estudio de referencia impecable sobre la distribución espacial y semiótica de las murallas."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Incentivar o estudo de técnicas de arquitetura sem argamassa de pedra seca, desmistificando ideias colonialistas de autoria externa.",
        "Mapear a conexão das minas de ouro do Grande Zimbábue com o comércio de Kilwa e o Oceano Índico."
      ],
      en: [
        "Use great dry-stone masonry architecture to dismantle colonial European theories that attributed African monuments to Phoenicians.",
        "Map regional copper and gold trade lines to show the interior's connection to Islamic Swahili port cities like Kilwa."
      ],
      fr: [
        "S'appuyer sur la maçonnerie de pierre sèche pour briser les préjugés coloniaux qui attribuaient ce joyau aux Phéniciens.",
        "Tracer la route de l'or reliant les montagnes Shona à la côte cosmopolite de Kilwa Kisiwani."
      ],
      es: [
        "Utilizar las técnicas de sillería de piedra seca sin argamasa para rechazar teorías de autoría fenicia propias del colonialismo occidental.",
        "Trazar mapas del circuito de oro que enlazaban el planalto Shona con los puertos suajili como Kilwa."
      ]
    }
  },
  {
    id: "kanem_bornu",
    name: {
      pt: "Império de Canem (Kanem-Bornu)",
      en: "Kanem Empire (Kanem-Bornu)",
      fr: "Empire du Kanem (Kanem-Bornu)",
      es: "Imperio de Kanem (Kanem-Bornu)"
    },
    region: "west_africa",
    regionLabel: {
      pt: "África Ocidental / Central",
      en: "West / Central Africa",
      fr: "Afrique de l'Ouest / Centrale",
      es: "África Occidental / Central"
    },
    era: "classical_era",
    eraLabel: {
      pt: "Era Clássica e Tardia",
      en: "Classical & Late Era",
      fr: "Ère classique et tardive",
      es: "Era Clásica y Tardía"
    },
    coordinates: { x: 44, y: 43 },
    period: {
      pt: "800 DC - 1800 DC",
      en: "800 AD - 1800 AD",
      fr: "800 EC - 1800 EC",
      es: "800 DC - 1800 DC"
    },
    description: {
      pt: "Kanem-Bornu foi um império saheliano duradouro estabelecido ao redor da bacia do Lago Chade, fundado pela dinastia Sayfawa. Controlava o estratégico circuito transariano oriental de Kawar, ligando o rio Níger a Trípoli e ao Egito, apoiado por exércitos de cavalaria com armaduras.",
      en: "Kanem-Bornu was a remarkably resilient Sahelian empire centered around the Lake Chad basin, founded by the Sayfawa dynasty. Operating a highly formidable chain of cavalry armies, it dominated the eastern trans-Saharan trade corridors connecting Lake Chad to Tripoli and Cairo.",
      fr: "L'Empire du Kanem-Bornou fut un État extrêmement durable centré sur le lac Tchad, gouverné par la dynastie Sayfawa. S'appuyant sur de redoutables armées de cavalerie cuirassée, il contrôlait le commerce des salines de Kawar vers l'Égypte.",
      es: "Kanem-Bornu fue un longevo imperio del Sahel establecido en la cuenca del Lago Chad. Gobernado por la dinastía Sayfawa, organizó un ejército montado pesado temible y hegemonizó el paso caravanero oriental hacia el norte."
    },
    seshatData: {
      capital: { pt: "Njimi / Ngazargamu", en: "Njimi / Ngazargamu", fr: "Njimi / Ngazargamu", es: "Njimi / Ngazargamu" },
      territory: { pt: "500.000 km² (no auge)", en: "500,000 km² (at zenith)", fr: "500 000 km² (à son apogée)", es: "500.000 km² (máximo apogeo)" },
      population: { pt: "1.500.000 - 2.000.000", en: "1,500,000 - 2,000,000", fr: "1 500 000 - 2 000 000", es: "1.500.000 - 2.000.000" },
      settlementHierarchy: { pt: "3 níveis (Cidades de oásis, capitais imperiais)", en: "3 levels (Oasis transit towns, walled capitals)", fr: "3 niveaux (Villes d'oasis, fortresses royaux)", es: "3 niveles (Puntos de oasis fortificados y capitales regionales)" },
      administrativeLevels: { pt: "4 níveis de coordenação militar e arrecadação de tributos", en: "4 administrative levels managing cavalry regiments and regional tax collectors", fr: "4 niveaux régissant la logistique de cavalerie et la diplomatie", es: "4 niveles de gestión militar de caballería pesada y tributaria" },
      governmentType: { pt: "Monarquia Constitucional Dinástica (Sayfawa)", en: "Dynastic Inherited Monarchy (Sayfawa Dynasty)", fr: "Monarchie dynastique centralisée (Dynastie Sayfawa)", es: "Monarquía Dinástica Soberana (Linaje Sayfawa)" },
      languages: { pt: "Kanuri / Kanembu", en: "Kanuri / Kanembu dialects", fr: "Kanouri / Kanembou", es: "Kanuri / Kanembu" },
      religionInfo: { pt: "Islamismo Ortodoxo Maliquista com grande investimento em escrituras", en: "Maliki Sunni Islam with significant investment in local Quranic colleges", fr: "Islam de rite malékite favorisant l'alphabétisation", es: "Islam sufí y jurisprudencia Maliquista" }
    },
    primaryDocuments: [
      {
        id: "diwan_salatin_kanem",
        title: {
          pt: "O Diwan Salatin Kanem (Crônica dos Reis)",
          en: "The Diwan Salatin Kanem (Chronicle of the Monarchs)",
          fr: "Le Diwan des sultans du Kanem (Chronique royale)",
          es: "El Diwan Salatin Kanem (Crónica Dinástica de Reyes)"
        },
        source: {
          pt: "Manuscrito em árabe preservado por eruditos Sayfawa relatando a linhagem real, c. Séc. XVI DC",
          en: "Original Arabic manuscript recording the reigns and state laws of the Sayfawa rulers since the 11th Century BC/AD",
          fr: "Chronique en langue arabe conservant les généalogies et édits juridiques Sayfawa",
          es: "Manuscrito árabe que reúne los anales reales e innovaciones militares Sayfawa compiladas c. 1580 DC"
        },
        content: {
          pt: "Este é o relato dos reis de Sef... O rei Mai Humé, que abraçou a justiça da fé... Ele removeu o imposto abusivo dos pobres, ordenou a construção de pousadas gratuitas de repouso em Cairo para os peregrinos africanos nas de Kawar... Ele organizou nossos exércitos com escudos heróicos...",
          en: "This is the collection of names of the kings of Sef... The ruler Mai Humé, who received the scholars and proclaimed the laws... He established free state hostels in Cairo (Madrasa of Ibn Rashiq) to shelter pilgrims traveling from Lake Chad, protecting all caravans from salt thefts...",
          fr: "Voici le registre des souverains du Kanem... Le sultan Mai Humé, qui réforma les lois avec équité... Son successeur finança de vastas auberges à l'étranger dans la province du Caire pour les dévots de notre empire...",
          es: "Esta es la secuencia escrita de los monarcas Sayfawa... Mai Humé, quien abolió tributos extorsivos... Fundó la residencia estudiantil y albergue en el Cairo para cobijar a los eruditos de nuestro territorio..."
        }
      }
    ],
    bibliography: [
      {
        author: "Bawuro M. Barkindo",
        title: "The Early States of the Central Sudan: Kanem-Borno",
        year: "1989",
        note: {
          pt: "Definição inovadora dos processos de fundação de cidades e dinastias no Lago Chade.",
          en: "The most robust historical study on state-formation under the Sayfawa Dynasty.",
          fr: "Étude essentielle sur la formation de l'État et le commerce autour de la cuve du Tchad.",
          es: "Estudio referencial sobre las estructuras tributarias de Kanem-Bornu."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Estudar a longevidade da dinastia Sayfawa de Kanem-Bornu e analisar o uso de exércitos de cavalaria pesada.",
        "Refletir sobre a diplomacia internacional de Kanem, exemplar na criação de pousadas gratuitas no Cairo."
      ],
      en: [
        "Discuss diplomatic networks by analyzing the Kanem embassy and the construction of state hostels in Cairo.",
        "Evaluate the military use of armor-clad horses and standard desert defenses in Sahelian battle structures."
      ],
      fr: [
        "Analyser les réseaux de relations internationales à travers la fondation d'hôtels nationaux au Caire par le Sultan du Kanem.",
        "Étudier la symbiose écologique et commerciale complexe autour de la cuve du lac Tchad dans l'Histoire."
      ],
      es: [
        "Estudiar las relaciones diplomáticas externas analizando las pensiones gratuitas que Kanem subsidió en El Cairo para sus ciudadanos.",
        "Analizar el componente militar de la caballería pesada y la metalurgia del hierro saheliana."
      ]
    }
  },
  {
    id: "ashanti_empire",
    name: {
      pt: "Império Paxante (Ashanti)",
      en: "Ashanti Empire",
      fr: "Empire Ashanti",
      es: "Imperio Ashanti"
    },
    region: "west_africa",
    regionLabel: {
      pt: "África Ocidental",
      en: "West Africa",
      fr: "Afrique de l'Ouest",
      es: "África Occidental"
    },
    era: "classical_era",
    eraLabel: {
      pt: "Era Clássica e Tardia",
      en: "Classical & Late Era",
      fr: "Ère classique et tardive",
      es: "Era Clásica y Tardía"
    },
    coordinates: { x: 26, y: 46 },
    period: {
      pt: "1701 DC - 1895 DC",
      en: "1701 AD - 1895 AD",
      fr: "1701 EC - 1895 EC",
      es: "1701 DC - 1895 DC"
    },
    description: {
      pt: "O Império Ashanti foi uma rica unificação de clãs acans focado no atual Gana, sob a liderança de Osei Tutu e guiados pelo símbolo sagrado do Assento de Ouro (Sika Dwa). Famoso por sua riqueza e sofisticação em ouro, seu sistema político de rainhas conselheiras, e sua resistência militar inteligente contra as invasões coloniais inglesas.",
      en: "The Ashanti Empire was a highly organized union of Akan clans centered in Ghana, unified by Osei Tutu under the spiritual authority of the Golden Stool (Sika Dwa). Renowned for its unparalleled goldsmithing, unique Queen Mother assemblies advising chiefs, and ferocious tactical military defense against British colonization.",
      fr: "L'Empire Ashanti fut une confédération structurée de clans Akans au Ghana actuel, unifiée par Osei Toutou sous le symbole du Tabouret d'Or. Célèbre pour sa maîtrise de l'or, son assemblée de Reines-Mères influentes, et sa résistance intrépide à l'impérialisme britannique.",
      es: "El Imperio Ashanti constituyó una federación unificada de clanes Akan fundada por Osei Tutu en Ghana. Representada espiritualmente por el Trono de Oro (Sika Dwa), se distinguió por su arte en orfebrería, el influyente rol consultivo de las Reinas Madres y su asombrosa defensa soberana."
    },
    seshatData: {
      capital: { pt: "Kumasi", en: "Kumasi", fr: "Kumasi", es: "Kumasi" },
      territory: { pt: "259.000 km² (Seshat)", en: "259,000 km² (Seshat)", fr: "259 000 km² (Seshat)", es: "259.000 km² (Seshat)" },
      population: { pt: "3.000.000 (Seshat)", en: "3,000,000 (Seshat)", fr: "3 000 000 (Seshat)", es: "3.000.000 (Seshat)" },
      settlementHierarchy: { pt: "4 níveis", en: "4 levels", fr: "4 niveaux", es: "4 niveles" },
      administrativeLevels: { pt: "5 níveis burocráticos com chanceleres públicos", en: "5 levels with specialized state departments for finance, foreign, and military coordination", fr: "5 niveaux avec ministères de chancellerie, guerres, et finances", es: "5 niveles centralizados organizados con registros escritos de aduana" },
      governmentType: { pt: "Confederação Imperial com Parlamento Executivo e Suprema Rainha Mãe", en: "Federal Confederacy with Executive Council and Supreme Queen Mother Advisorship", fr: "Confédération impériale avec assemblée élargie et reine-mère", es: "Confederación Federal con Parlamento y Consejo Consultivo de Reinas Madres" },
      languages: { pt: "Twi / Akan", en: "Twi / Akan speech family", fr: "Twi (Famille Akan)", es: "Twi / Familias de habla Akan" },
      religionInfo: { pt: "Cosmologia Akan focada em Nyame e no Assento de Ouro", en: "Akan cosmology centered on Nyame (Supreme God) and Sika Dwa", fr: "Cosmologie akan centrée sur Nyame et le Tabouret d'Or", es: "Cosmogonía Akan enfocada en Nyame y el alma nacional del Sika Dwa" }
    },
    primaryDocuments: [
      {
        id: "gold_weight_proverbs",
        title: {
          pt: "Coleção de Provérbios e Padrões de Pesos de Ouro",
          en: "Anthology of Ashanti Gold Weight Proverbial Customs",
          fr: "Recueil de proverbes figuratifs et poids d'or ashanti",
          es: "Compilación de Proverbios Figurativos y Pesas Akan de Bronce"
        },
        source: {
          pt: "Inscrições gravadas e figuras zoomórficas de bronze usadas para controle alfandegário, c. Séc. XVIII DC",
          en: "Solid bronze figurative weights cast via lost-wax process, representing legal and philosophical proverbs in daily trade, 18th Century AD",
          fr: "Poids d'or en bronze fabriqués par cire perdue exprimant des adages régaliens et civiques",
          es: "Pesas de bronce grabadas con la técnica de cera perdida, empleadas para tasar la moneda de oro, s. XVIII DC"
        },
        content: {
          pt: "[O peso em bronze de dois jacarés cruzando um estômago único]: Embora tenhamos bocas distintas, freamos sob uma digestão comum; o bem público une nossas províncias federadas... [O peso da tartaruga e da carapaça]: O estado deve prosseguir com prudência paciência milenar, mas resistir com força sob intimidação externa...",
          en: "[The bronze weight displaying two crocodiles sharing a stomach]: Though our mouths are split, our core remains united in nutrition, teaching solidarity in our Akan league... [The bird looking backwards]: It is no sin to go back and retrieve what was forgotten (Sankofa), protecting our past history to build the future...",
          fr: "[Le poids représentant deux crocodiles partageant le même estomac] : Bien que nous ayons deux bouches separées, notre destin digestif est commun : l'unité républicaine de la ligue Ashanti... [L'oiseau Sankofa regardant en arrière] : Il n'y a aucun mal à retourner chercher ce que l'on a oublié afin d'éclairer l'avenir...",
          es: "[La pesa que delinea dos cocodrilos con un estómago compartido]: Aunque las bocas coman aparte, el alimento nutre el mismo vientre, símbolo de la Unión Ashanti... [El ave Sankofa que gira su cuello]: Volver atrás a rescatar el saber pasado no es delito (Sankofa), es base indispensable del porvenir..."
        }
      }
    ],
    bibliography: [
      {
        author: "T.C. McCaskie",
        title: "State and Society in Asante History: An Essay on Historical Reconstruction",
        year: "1995",
        note: {
          pt: "Estudo primoroso das instituições jurídicas, impostos e vida social em Kumasi.",
          en: "Deep analytical study of statecraft, philosophies, and jurisprudence in Ashanti capitals.",
          fr: "Analyse remarquable des institutions juridiques, fiscales et sociales de Kumasi.",
          es: "Excelente análisis institucionalizador sobre las cortes tributarias deKumasi."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Estudar o papel inovador das Rainhas Mães (como Yaa Asantewaa), analisando o equilíbrio de gênero na liderança militar acã.",
        "Analisar graficamente os pesos de bronze africanos associando-os aos seus provérbios morais (Ensino Interdisciplinar de Matemática e História)."
      ],
      en: [
        "Analyze the military-political leadership of Yaa Asantewaa to investigate gender and anticofederal independence struggles under colonialism.",
        "Integrate Ashanti bronze gold-weights in math/history lectures to study weights, scales, and socio-philosophic proverbs."
      ],
      fr: [
        "Célébrer la figure héroïque de la Reine Yaa Asantewaa pour étudier la lutte des femmes africaines contre la colonisation.",
        "Décider d'un atelier d'art plastique et de calcul pour étudier la géométrie et la philosophie des poids d'or ashantis-akans."
      ],
      es: [
        "Evaluar la resistencia patriótica de la Reina Madre Yaa Asantewaa para estudiar el protagonismo de la mujer en las luchas de soberanía.",
        "Utilizar las pesas Akan de latón en clases interdisciplinares de matemáticas e historia para estudiar los patrones métricos antiguos y su filosofía."
      ]
    }
  },
  {
    id: "numidia",
    name: {
      pt: "Reino da Numídia",
      en: "Kingdom of Numidia",
      fr: "Royaume de Numidie",
      es: "Reino de Numidia"
    },
    region: "north_africa",
    regionLabel: {
      pt: "Norte da África",
      en: "North Africa",
      fr: "Afrique du Nord",
      es: "Norte de África"
    },
    era: "antiquity",
    eraLabel: {
      pt: "Antiguidade",
      en: "Antiquity",
      fr: "Antiquité",
      es: "Antigüedad"
    },
    coordinates: { x: 36, y: 15 },
    period: {
      pt: "202 AC - 46 AC",
      en: "202 BC - 46 BC",
      fr: "202 AEC - 46 AEC",
      es: "202 AC - 46 AC"
    },
    description: {
      pt: "A Numídia foi um reino berbere soberano localizado na Argélia atual. Sob o rei Massinissa, unificou clãs nômades amazighes, desenvolveu cidades agrícolas fortificadas e manteve uma temível cavalaria leve que combateu taticamente como aliada e adversária nas Guerras de Roma e Cartago.",
      en: "Numidia was a powerful independent Berber sovereign kingdom located in modern-day Algeria. Led by King Masinissa, it unified diverse Amazigh pastoralist clans, built thriving dry-agriculture fortified cities, and trained a highly legendary light cavalry that decided crucial turnings in the Roman-Carthaginian Wars.",
      fr: "La Numidie fut un puissant royaume berbère indépendant situé dans l'actuelle Algérie. Sous le fondateur Masinissa, il unifia les clans Amazighs, développa des villes agricoles florissantes et mit sur pied une cavalerie légère légendaire de l'Antiquité.",
      es: "Numidia constituyó un reino bereber independiente situado en la actual Argelia. Dirigido por el soberano Masinissa, consolidó clanes Amazigh seminómadas, instituyó prósperas ciudades agrícolas de secano y movilizó una legendaria caballería ligera soberana."
    },
    seshatData: {
      capital: { pt: "Cirta (Constantina)", en: "Cirta (Constantine)", fr: "Cirta (Constantine)", es: "Cirta (Constantina)" },
      territory: { pt: "500.000 - 600.000 km² (Seshat)", en: "500,000 - 600,000 km² (Seshat)", fr: "500 000 - 600 000 km² (Seshat)", es: "500.000 - 600.000 km² (Seshat)" },
      population: { pt: "1.000.000 - 1.500.000", en: "1,000,000 - 1,500,000", fr: "1 000 000 - 1 500 000", es: "1.000.000 - 1.500.000" },
      settlementHierarchy: { pt: "3 níveis (Cidades de poços, fortalezas, abrigos)", en: "3 levels (walled trade cities, hillforts, pastoral networks)", fr: "3 niveaux (Villes marchandes amurallées, oppida)", es: "3 niveles de estructuración sedentaria-pastoril" },
      administrativeLevels: { pt: "4 níveis de funcionários em assembleia real", en: "4 levels of court administrative governors coordinating heavy grain tributes", fr: "4 niveaux régissant la logistique des céréales et l'armée", es: "4 niveles organizativos de control agrario de trigo" },
      governmentType: { pt: "Monarquia Berber Autocentrada", en: "Berber Autonomous Hereditary Monarchy", fr: "Monarchie berbère centralisée", es: "Monarquía Bereber Hereditaria Soberana" },
      languages: { pt: "Língua Líbia Antiga / Púnico", en: "Ancient Libyan / Libyco-Berber script", fr: "Libyque ancien / Libyco-berbère", es: "Libio antiguo (Amazigh ancestral)" },
      religionInfo: { pt: "Sincretismo religioso líbio púnico com culto do sol e astros", en: "Libyco-Punic polytheism honoring solar and agricultural gods", fr: "Culte chthonien et solaire libyco-punique", es: "Veneración sincrética de divinidades de la agricultura bereber y púnica" }
    },
    primaryDocuments: [
      {
        id: "masinissa_stela",
        title: {
          pt: "Bilingue de Dougga (Estela Libíco-Púnica)",
          en: "The Bilingual Inscription of Dougga (Libyco-Punic Stela)",
          fr: "L'Inscription bilingue de Dougga (Stèle libyco-punique)",
          es: "La Estela Bilingüe de Dougga (Inscripción Líbico-Púnica)"
        },
        source: {
          pt: "Inscrição comemorativa gravada em escrita Líbia original e alfabeto Fenício, Dougga, Argélia (c. 138 AC)",
          en: "Commemorative bilingual stone engraving written in Libyco-Berber tifinagh blocks and Phoenician letters, Carthage region (c. 138 BC)",
          fr: "Stèle monumentale votive gravée en caractères libyques indigènes et carthaginois puniques",
          es: "Monumento tallado con alfabeto bereber antiguo tifinagh de libio y caracteres púnicos, Dougga (c. 138 AC)"
        },
        content: {
          pt: "Erigido pelos cidadãos de Thugga em honra a Masinissa, rei da Numídia... que uniu e pacificou os reinos, aumentou as sementeiras de milho ao nível de grande império de forjas... Gravado pelos artesãos dedicados a Tanit...",
          en: "The citizens of Dougga dedicate this obelisk to the memory of Masinissa, ruler of Numidia, and for his lineage... he has brought agricultural expansion to our valleys, protecting our rights under standard municipal statutes, recorded in Libyco-Berber and Punic characters...",
          fr: "Le temple et cette stèle sont érigés en l'honneur du Mai Masinissa, grand chef de Numidie, qui rendit fertiles nos champs de blé et organisa notre république berbère... écrit en caractères de notre patrie libyque et punique...",
          es: "Los notables de Dougga consagran esta stela en memoria del rey Masinissa de Numidia... dador de paz y prosperidad agrícola que extendió el cultivo de trigo inmensamente... labrado por talladores de lengua autónomabereber y púnica..."
        }
      }
    ],
    bibliography: [
      {
        author: "Filippo Coarelli & Théodore Monod",
        title: "Numidia and the Roman World: Amazigh Architecture",
        year: "1998",
        note: {
          pt: "Discussão primorosa sobre os mausoléus monumentais numídas livre de tendências romanas.",
          en: "Exhaustive material study demonstrating the autonomy of Berber architecture in Numidia.",
          fr: "Analyse architecturale retraçant l'autonomie et le génie urbain des souverains numides.",
          es: "Análisis arqueológico y monumental de los túmulos numidas autónomos de la tradición grecorromana."
        }
      }
    ],
    pedagogicalSuggestions: {
      pt: [
        "Estudar a estela bilíngue de Dougga para evidenciar a existência de escrita indígena norte-africana (Tifinagh/Líbico) anterior à conquista romana.",
        "Analisar o desenvolvimento agrário numída de Massinissa contra o estereótipo do 'nômade africano primitivo'."
      ],
      en: [
        "Analyze the Bilingual Inscription of Dougga to prove the existence of native Libyco-Berber writing scripts (precursor of Tifinagh).",
        "Contrast Masinissa's deep agricultural reforms with colonial stereotypes depicting ancient Africans as exclusively wandering pastoralists."
      ],
      fr: [
        "Prendre appui sur la stèle de Dougga pour enseigner l'enracinement des écritures autochtones berbères (ancêtre du tifinagh).",
        "Analyser l'essor céréalier numide pour s'opposer aux stéréotypes coloniaux de l'Africain 'insouciant et nomade'."
      ],
      es: [
        "Utilizar la estela bilingüe de Dougga para demostrar la invención y madguridad de la escritura líbico-bereber nativa.",
        "Comparar los éxitos agrícolas de regadío numidas con el persistente cliché eurocéntrico del 'africano salvaje e improductivo'."
      ]
    }
  }
];
