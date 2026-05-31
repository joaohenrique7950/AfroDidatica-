import { Language } from '../types';

export interface ExtractionFeature {
  title: Record<Language, string>;
  description: Record<Language, string>;
  evidence: Record<Language, string>;
}

export interface PolitiesExtractions {
  administrativeLevels: ExtractionFeature;
  writingSystems: ExtractionFeature;
  matrilinealAlliances: ExtractionFeature;
}

export const politiesExtractionsData: Record<string, PolitiesExtractions> = {
  egypt_kemet: {
    administrativeLevels: {
      title: {
        pt: "🏢 Hierarquia Pública de 5+ Níveis em Kemet",
        en: "🏢 5+ Level Bureaucracy in Kemet",
        fr: "🏢 Bureaucratie à 5+ niveaux à Kemet",
        es: "🏢 Burocracia con 5+ niveles en Kemet"
      },
      description: {
        pt: "Estrutura administrativa complexa dividida por províncias governadas nativamente de forma independente por funcionários de carreira de alta especialização.",
        en: "Complex administrative structure split by provinces (nomes) governed natively by highly specialized, full-time career officials.",
        fr: "Structure administrative complexe divisée par provinces (nomes) administrées par des fonctionnaires de carrière hautement qualifiés.",
        es: "Estructura administrativa compleja dividida en provincias y distritos liderados por funcionarios públicos expertos."
      },
      evidence: {
        pt: "Documentação comprova uma pirâmide administrativa de mais de 5 níveis: o Vizir Imperial (gestor supremo), os Nomarcas (governadores locais), os Administradores de Celeiros e Obras Hidráulicas, os Superintendentes de Canais Civis, e os Escribas Fiscais de Campo.",
        en: "Archaeological records show an administration exceeding 5 distinct levels: the Grand Vizier (supreme manager), Nomarchs (provincial governors), Granary Superintendents, Hydraulic/Irrigation Officials, and Field Tax Scribes.",
        fr: "Les documents attestent d'une pyramide administrative de plus de 5 niveaux : le Grand Vizir, les Nomarques (gouverneurs provinciaux), les Intendants des Greniers, les Officiers hydrauliques, et les Éscribes fiscaux de campagne.",
        es: "Los documentos históricos prueban una jerarquía de más de 5 niveles: el Gran Visir (gestor supremo), los Nomarcas (gobernadores), Inspectores de Graneros, Superintendentes de Obras de Irrigación, y Escribas de Recaudación."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Ativa Multifuncional (Kemet)",
        en: "✍️ Active Multifunctional Scripts (Kemet)",
        fr: "✍️ Écritures Actives Multifonctionnelles (Kemet)",
        es: "✍️ Escritura Activa y Archivo de Estado (Kemet)"
      },
      description: {
        pt: "Sistemas originais de gravação estruturados para além do uso monumental; operando como meio de burocracia real há mais de 5.000 anos.",
        en: "Original structured recording systems adapted far beyond monumental temples; operating as standard state bureaucracy over 5,000 years ago.",
        fr: "Systèmes d'écriture structurés au-delà de l'usage monumental; servant d'outil administratif standard il y a plus de 5 000 ans.",
        es: "Sistemas gráficos estructurados para fines diversos; operando en la burocracia y transacciones reales de forma consolidada."
      },
      evidence: {
        pt: "Uso do Hieróglifo sagrado para monumentos, Hierático cursivo para transações administrativas rápidas e correspondência real, e Demótico no período tardio como escrita jurídica corrente para contratos mercantis e arrecadação tributária.",
        en: "Simultaneous utilization of sacred Hieroglyphics for stone monuments, cursive Hieratic for fast administrative records and royal decrees, and Demotic in late periods for public legal contracts and civic tax ledgering.",
        fr: "Usage simultané du Hiéroglyphe sacré pour les monuments, du Hiératique cursif pour l'administration rapide et décrets royaux, et du Démotique pour les transactions juridiques ordinaires.",
        es: "Utilización de jeroglíficos para monumentos religiosos, hierático para contabilidad burocrática rápida, y más tarde el demótico para contratos legales ordinarios y registros impositivos."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Legitimação Dinástica Matrilinear",
        en: "👑 Matrilineal Dynastic Legitimacy",
        fr: "👑 Légitimité Dynastique Matrilinéaire",
        es: "👑 Alianzas Dinásticas de Base Matrilineal"
      },
      description: {
        pt: "A transmissão de autoridade régia em Kemet dependia do sangue e da linhagem dinástica materna, dando imenso status às Rainhas Soberanas.",
        en: "The transmission of supreme royal power and legitimacy required descent through the queenly maternal line, elevating royal women's status.",
        fr: "La transmission de la légitimité royale dépendait de la lignée maternelle, attribuant un rôle politique immense aux femmes royales.",
        es: "La transmisión de soberanía legítima se heredaba mediante la línea materna real, otorgando enorme estatus y poder activo a las mujeres."
      },
      evidence: {
        pt: "Mesmo em regimes monárquicos predominantemente masculinos, a linhagem matrilinear real era o único meio incontestável de legitimidade ao trono. Rainhas soberanas como Hatshepsut e Sobekneferu governaram de forma autônoma e independente com plenos poderes diplomáticos, religiosos e militares.",
        en: "Royal descent through the mother was the ultimate validator of legitimacy. This structure enabled sovereign queens like Hatshepsut and Sobekneferu to govern independently with full military Command, diplomatic, and religious supremacy.",
        fr: "La filiation maternelle royale était l'axe suprême de légitimité. Cela permit à des reines souveraines comme Hatchepsout ou Sobeknéferou de régner de façon indépendante avec les pouvoirs militaires et diplomatiques.",
        es: "La ascendencia materna real era el pilar de legitimación legítima. Gobernantes soberanas como Hatshepsut y Sobekneferu ejercieron autonomía suprema, liderando ejércitos, flotas mercantiles y decretos diplomáticos."
      }
    }
  },
  kush_meroe: {
    administrativeLevels: {
      title: {
        pt: "🏢 Administração Regional de 4 a 5 Níveis",
        en: "🏢 4 to 5 Level Provincial Administration",
        fr: "🏢 Administration Provinciale à 4-5 Niveaux",
        es: "🏢 Red Administrativa de 4 a 5 Niveles"
      },
      description: {
        pt: "Organização centralizada em Cuxe gerenciando a produção siderúrgica do ferro e o abastecimento hidráulico nos desertos núbios.",
        en: "Centralized organization in Kush managing massive iron smelting guilds and hydrological circular reservoir infrastructure (hafirs).",
        fr: "Organisation centralisée à Koush gérant la production de fer et l'infrastructure des réservoirs d'eau (hafirs) dans le désert.",
        es: "Organización centralizada en Kush que controlaba la siderurgia a gran escala y embalses de retención pluvial (hafirs) del desierto."
      },
      evidence: {
        pt: "Uso de 4 a 5 níveis de controle: o Governante Real (Qore), os Governadores Locais (pelo menos no período Meroítico), os Principais Mestres dos Fornos Siderúrgicos, os Gestores Clânicos de Templos, e sacerdotes contábeis regionais.",
        en: "Documented 4 to 5 administrative tiers: the Royal Ruler (Qore), District Commanders, Royal Iron Foundry Overseers, Temple Granary Directors, and village water wardens.",
        fr: "Présence de 4 à 5 échelons : le Souverain Royal (Qore), les Commandants de districts, les Maîtres-fondeurs de fer, les Régisseurs de temples et gardiens d'eau villageois.",
        es: "Estructura de 4 a 5 escalafones: el Monarca Soberano (Qore), Gobernadores Provinciales, Inspectores Estatales de Fundición, Administradores de Templos, y jefes locales de oasis."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Meroítica Autóctone",
        en: "✍️ Indigenous Meroitic Script",
        fr: "✍️ Écriture Méroïtique Autochtone",
        es: "✍️ Escritura y Silabario Meroítico"
      },
      description: {
        pt: "Surgimento de um sistema gráfico africano próprio ao sul da catarata, abandonando dependências e estruturando registros próprios.",
        en: "Independent African writing system developed south of the Nile cataracts, replacing dependencies and codifying sovereign archives.",
        fr: "Système d'écriture africain indépendant développé au sud des cataractes du Nil, codifiant leurs propres mémoires d'État.",
        es: "Sistema de escritura autóctona africano desarrollado al sur del Nilo, dejando de lado grafías previas para consolidar actas de realeza."
      },
      evidence: {
        pt: "A escrita cursiva e hieroglífica meroítica continha 23 sinais fonéticos e silábicos originais. Era gravada ativamente em estelas estatais e templos religiosos para relatar vitórias militares, transações e decretos dinásticos.",
        en: "Meroitic script has 23 unique phonocentric and syllabic characters. Used on state stelae and temple architecture to compile military tallies, lineage claims, and dynastic records.",
        fr: "L'écriture méroïtique compte 23 caractères systématiques. Gravée activement sur les stèles de victoires et les sanctuaires pour documenter les actes légaux et les annales de guerre.",
        es: "El silabario meroítico comprende 23 signos fonéticos propios. Grabados en estelas públicas y templos para registrar gestas militares, alianzas de jefaturas y anales del reino."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 As Rainhas Candidacates (Kandakes)",
        en: "👑 Sovereign Warrior Queens (Kandakes)",
        fr: "👑 Reines-Mères Souveraines (Kandakes)",
        es: "👑 Las Reinas Guerreras Kandakes"
      },
      description: {
        pt: "A dinastia das Kandakes representou um dos maiores fenômenos de soberania feminina independente do mundo antigo.",
        en: "The Kandake dynasty represents one of the most prominent frameworks of independent female political sovereignty in antiquity.",
        fr: "La dynastie des Candaces représente l'un des exemples de souveraineté féminine indépendante les plus puissants au monde.",
        es: "La figura institucional de la Kandake constituye uno de los ejemplos más extraordinarios de soberanía femenina militar y civil de la antigüedad."
      },
      evidence: {
        pt: "Diferente de consortes secundárias, as Kandakes exerciam poder absoluto de governo civil e militar. No período Meroítico, rainhas como Amanirenas lideraram pessoalmente seus exércitos contra as guarnições do Império Romano, negociando tratados com César Augusto que desoneraram Cuxe de impostos.",
        en: "Not mere wives of rulers, Kandakes held dual absolute executive and military powers. Real historical figures like Queen Amanirenas personally led armies against Roman Egypt, securing diplomatic exemptions directly from Augustus Caesar.",
        fr: "Loin d'être de simples épouses, les Candaces détenaient les pleins pouvoirs de l'État. Des figures comme Amanirenas dirigèrent personnellement les armées nubiennes face à l'Empire romain, forçant Octave Auguste à négocier la paix sans tribut.",
        es: "Las Kandakes poseían rangos civiles, diplomáticos y militares independientes de mandos varones. Monarcas como Amanirenas lideraron ejércitos contra las legiones de Roma, capturando cohortes y negociando ventajosos pactos de paz directamente con César Augusto."
      }
    }
  },
  aksum_empire: {
    administrativeLevels: {
      title: {
        pt: "🏢 Centralização e Cobrança em Adulis (Axum)",
        en: "🏢 4 to 5 Tier Maritime Bureaucracy (Aksum)",
        fr: "🏢 Administration Maritime Autonome (Axoum)",
        es: "🏢 Escalafón Administrativo y Portuário Numérico"
      },
      description: {
        pt: "Um sistema de fiscalização de fluxos portuários internacionais e burocracia monetária de alta precisão ao longo do Mar Vermelho.",
        en: "A comprehensive customs inspection, international maritime taxing system, and monetary mint bureaucracy handling global trade.",
        fr: "Système de perception fiscale maritime, de contrôle douanier et de frappe monétaire gérant le commerce de l'Océan Indien.",
        es: "Complejo aparato de recaudación marítima, aduana internacional e inspectores de metales que regulaba barcos de todo el orbe."
      },
      evidence: {
        pt: "A base Seshat atesta de 4 a 5 níveis hierárquicos: o Imperador (Negusa Nagast), os Governadores regionais (como o de Adulis), Oficiais Alfandegários e Portuários, Cobradores de Impostos Rurais, e os Cunhadores Oficiais da Moeda de Ouro Real.",
        en: "Polaris metrics record 4 to 5 levels of public organization: the Emperor (Negusa Nagast), Regional Vice-Admirals (e.g., at Adulis), Customs Port Officers, Tax Collectors, and State Mint masters.",
        fr: "Le registre Seshat compte 4 à 5 échelons : l'Empereur (Negusa Nagast), les Amiraux coloniaux (comme à Adulis), les Inspecteurs de douanes, les Percepteurs de céréales, et les Maîtres de la Monnaie royale d'or.",
        es: "La base Seshat ratifica de 4 a 5 niveles: el Emperador (Negusa Nagast), Gobernadores Costeros (Adulis), Administradores de Aduanas y Muelles, Cobradores de Granos, y Orfebres de la Ceca de Moneda de Oro."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Ge'ez: Silabário Autóctone do Chifre",
        en: "✍️ Ge'ez: Native Syllabary Writing System",
        fr: "✍️ Écriture Guèze : Le Silabaire Indigène",
        es: "✍️ Escritura Ge'ez y Archivos Imperiales"
      },
      description: {
        pt: "Uso autônomo do Ge'ez, um sistema silábico avançado e original da civilização de Axum, preservado até os dias atuais.",
        en: "Sovereign development of Ge'ez, a highly complex and native African syllabary system, dynamically preserved up to this day.",
        fr: "Développement autonome du Guèze, une écriture syllabique africaine hautement complexe, encore utilisée de nos jours.",
        es: "Invención y uso soberano del Ge'ez, un sistema de escritura silábico nativo africano conservado dinámicamente hasta la actualidad."
      },
      evidence: {
        pt: "O Ge'ez evoluiu de um abjad consonantal para um silabário fonético vocalizado completo (fielmente registrado na Estela do Rei Ezana). Era a única escrita oficial usada em registros contábeis, anais dinásticos e escrituras rurais em terras africanas do Mar Vermelho.",
        en: "Ge'ez transformed from consonantal letters to a fully vocalized semantic syllabary (vividly recorded in King Ezana's tri-lingual stones). It served as the singular native vehicle for state accounting, military registers, and land deeds.",
        fr: "Le Guèze est passé d'un abjad à un syllabaire phonétique fully vocalisé (attesté par la Pierre d'Ezana). Il était l'outil exclusif des annales de l'Empire axoumite, actes fonciers et correspondance publique.",
        es: "El Ge'ez se transformó en un silabario vocalizado integral (registrado formalmente en las estelas de Ezana). Era el vehículo estandarte para decretos dinásticos, deudas, aranceles comerciales y archivos litúrgicos."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Alianças Matrilineares do Altiplano",
        en: "👑 Highland Matrilineal Elite Alliances",
        fr: "👑 Alliances Matrilinéaires Royales",
        es: "👑 Alianzas Dinásticas del Mar Rojo y Tierras Altas"
      },
      description: {
        pt: "Tradições de herança e governança local onde linhagens e títulos reais possuíam dependência e legitimidade materna.",
        en: "Political strategies of governance and land tenure where dynastic lineages and local title passes had ancestral maternal roots.",
        fr: "Stratégies politiques de gouvernance où les transmissions de terres s'appuyaient sur la filiation et l'influence maternelle.",
        es: "Esquemas sucesorios y de pertenencia feudal de rango donde las uniones eclesiásticas y matrimoniales dependían de linajes maternos."
      },
      evidence: {
        pt: "Exumações e epigrafias mostram que a unificação de tribos agropastoris com o centro imperial axumita se concretizava através de alianças e matrimônios diplomáticos regulados de forma matrilinear com as líderes de clãs locais das montanhas.",
        en: "Material consensus indicates that integrating local agropastoral populations into the Aksumite hegemony required key diplomatic marriages and consensus with matriarchal highland clan leaders linked matrilineally.",
        fr: "La recherche démontre que l'unification des populations agro-pastorales reposait sur des alliances diplomatiques conclues par voie matrilinéaire avec les matriarches des clans locaux des plateaux.",
        es: "Las crónicas muestran que la cohesión territorial de las dinastías y su nexo con el puerto costero se cimentaba en uniones monárquicas que validavam a clanes matrilineales autóctonos del altiplano."
      }
    }
  },
  nok_culture: {
    administrativeLevels: {
      title: {
        pt: "🏢 Autonomia Organizacional de Clãs Nok",
        en: "🏢 Clan-Based Smelting Organization (Nok)",
        fr: "🏢 Autonomie Métallurgique des Clans Nok",
        es: "🏢 Estructura de Clãs y Cacicazgos Metalúrgicos"
      },
      description: {
        pt: "Complexidade social articulada sem burocracia estatal opressora, provando o alto desenvolvimento de rotas industriais colaborativas.",
        en: "High-grade social complexity accomplished without overbearing centralized kingship, demonstrating regional industrial collaboration.",
        fr: "Complexité sociale développée sans présence de bureaucratie étatique impériale, montrant une industrie métallurgique collaborative.",
        es: "Complejidad social articulada sobre el trabajo científico cooperativo y redes de orfebreria, sin instituciones estatales punitivas."
      },
      evidence: {
        pt: "A base Seshat codifica a Cultura Nok com 2 níveis hierárquicos permanentes: aldeias metalúrgicas dedicadas à fundição in situ (como em Taruga) e centros cerimoniais de produção artística de esculturas de terracota, operados voluntariamente sem burocracia coercitiva.",
        en: "Seshat Polaris code ranks Nok at 2 consistent administrative levels: industrial smelting villages (like Taruga) and local ceramic artistic sanctuaries, governed without despotic administrative apparatus.",
        fr: "La base Seshat classe Nok à 2 échelons stables : les agglomérations d'artisans fondeurs (comme à Taruga) et les sites rituels de production artistique de terre cuite, coordonnés par des réseaux d'entraide.",
        es: "La codificación asigna 2 niveles: asentamentos agrícolas de fundidores directos (como Taruga) y centros ceremoniales de alfarería monumental, articulados por hermandades de clanes metalúrgicos."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Terracota Mnemônica (Nok)",
        en: "✍️ Terracotta Mnemonic Iconography",
        fr: "✍️ Iconographie Plastique de Statut",
        es: "✍️ Ideogramas y Modelado Mnemónico"
      },
      description: {
        pt: "Representações artísticas em terracota em escala real funcionavam como sistemas de codificação ideográfica e social de clãs.",
        en: "Life-sized complex terracotta figures functioned as non-verbal ideographical systems conveying lineage and status.",
        fr: "Les célèbres figures de terre cuite Nok servaient en réalité de systèmes de communication visuelle transmettant les hiérarchies.",
        es: "Las piezas de alfarería monumental y rostros escultóricos cumplían propósitos de códigos dinámicos de linajes e indumentária civil."
      },
      evidence: {
        pt: "Embora sem escrita fonética, a cultura Nok desenvolveu um código estético tridimensional altamente padronizado em terracotas. Detalhes de jóias, cortes de cabelo, posturas corporais e insígnias esculpidas registravam genealogia administrativa e patentes militares regionais.",
        en: "Lacking phonetic letters, Nok created a standardized, 3-dimensional artistic code. Sculptures with explicit jewel counts, ear ornaments, and geometric postures recorded lineages and localized clan administrative statuses.",
        fr: "En l'absence de lettres phonétiques, Nok a structuré un code visuel normé en argile. Les détails des bijoux, coiffes complexes et scarifications consignaient la position sociale et les échelons des clans.",
        es: "Sin poseer grafías para el papiro, la Cultura Nok estructuró un código volumétrico tridimensional de alta precisión. Las trenzas, alajas y posturas de las terracotas catalogaban patentes honorificas y de clanes."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Agência de Mulheres na Sociedade Nok",
        en: "👑 Matrilineal Authority Renderings (Nok)",
        fr: "👑 Agence Féminine et Matrilinéarité Nok",
        es: "👑 Status y Representación Matrilineal"
      },
      description: {
        pt: "Evidências arqueológicas plásticas retratam figuras femininas proeminentes detendo insígnias de autoridade e liderança agrícola.",
        en: "Archaeological terracotta relics portray elite female figures holding symbols of ritual, civic, and agricultural leadership.",
        fr: "Les vestiges sculptés révèlent des figures de femmes de rang supérieur portant des attributs de pouvoir politique et agricole.",
        es: "Los vestigios de arcilla representan figuras femeninas monumentales con insignias de cargo agrícola, ritual y orfebre."
      },
      evidence: {
        pt: "Uma grande fração das esculturas votivas exumadas retratam mulheres em posições altivas, com ricos adereços corporais de alto status social. Especialistas sugerem que a posse da terra e clãs metalúrgicos seguiam linhagens com forte dependência materna e liderança feminina cooperativa.",
        en: "A major portion of excavated Nok art represents highly adorned women in authoritative poses. Historiographical consensus links this to ancestral systems of matriliny and strong agricultural property custody held by women.",
        fr: "Une part substantielle de l'art Nok représente des femmes arborant des coiffes élaborées et des expressions de commandement, indiquant que les exploitations d'argile ou de fer suivaient des lignées matrilinéaires.",
        es: "Casi el 50% de las terracotas sagradas exumadas representan damas vestidas con collares sacerdotales y brazaletes de mandado. Esto apunta a una herencia de herrerías vinculada a linajes femeninos dominantes."
      }
    }
  },
  carthage_empire: {
    administrativeLevels: {
      title: {
        pt: "🏢 Controle Republicano de 4 Níveis",
        en: "🏢 4 Tier Merchant Republican Hierarchy",
        fr: "🏢 Hiérarchie Républicaine d'État Punique",
        es: "🏢 Sofetes, Inspectores e Cabildos Republicanos"
      },
      description: {
        pt: "Um sistema burocrático republicano africano muito antes das ascensões de impérios monopolizadores do território.",
        en: "A highly complex, non-monarchical republican system operating across North Africa, long before Roman conquests.",
        fr: "Système de gouvernement républicain non oligarchique actif en Afrique du Nord, loué même par Aristote.",
        es: "Compleja república senatorial y municipal que gestionaba puertos circulares y transportes comerciales sin un rey absoluto."
      },
      evidence: {
        pt: "Dividido em 4 níveis claros de gestão pública: a Magistratura Suprema (Sufetes de Cartago), o Senado de Cem Anciãos de carreira judicial, os Governadores Militares Provinciais (como os que guardavam rotas e muralhas), e os Oficiais Portuários Civis de Cothon.",
        en: "Organized into 4 levels: the Supreme Magistrates (Suffetes), the Senate of the Hundred and Four (expert judges), Provincial military governors, and Port Directors of the dynamic circular Cothon ship harbor.",
        fr: "Structuré en 4 niveaux : les Suffètes (premiers magistrats), l'Assemblée consultative des Cent-Quatre, les Gouverneurs militaires côtiers, et les Maîtres de port du Cothon maritime circular.",
        es: "Dividido en 4 esferas: los Sufetes (magistrados electos anualmente), el Consejo de los Ciento Cuatro, los Comandantes Militares de Puntos de Control Libios, y los Inspectores Arancelarios del Puerto de Cothon."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Púnica Consonantal Mercantil",
        en: "✍️ Punic Consonantal Administrative Script",
        fr: "✍️ Escrita Punique Consonantique et Archives",
        es: "✍️ Escritura Púnica de Contratos e Tratados"
      },
      description: {
        pt: "Surgimento da grafia Púnica no Norte da África, usada como meio soberano de alfândega alfandegária e decretos municipais.",
        en: "Carthaginian development of Punic consonantal letters, used for customs records, treaties, and civic administrative files.",
        fr: "Développement de l'alphabet punique consonnantique, servant aux registres de cargaisons et traités diplomatiques.",
        es: "Evolución y uso local del púnico (alfabeto de consonantes), vital para aduanas marítimas, correspondência e actas del senado."
      },
      evidence: {
        pt: "A escrita Púnica era usada ativamente para codificar arrecadações do porto, registrar os orçamentos de mercadorias levadas de caravana e inscrever tratados municipais (como o famoso relato do Périplo de Hanão).",
        en: "Punic script was extensively used inside Carthage's maritime bureaus. It recorded trade cargo weights, merchant credits, temple offerings, and official state treaties (such as Hanno's historic fleet log).",
        fr: "L'alphabet punique était l'outil quotidien des commis de Carthage. Il consignait le poids des cargaisons de fer, l'or transaharien, et les décrets d'alliances ou expéditions coloniales (Périple d'Hannon).",
        es: "La caligrafía púnica se usaba para sellar mercancías, auditar el paso de naves, pactar alianzas hispanas y plasmar actas públicas memorables en bronce (como la bitácora de navegación de Hannón)."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Alianças Diplomáticas com Reinos Líbios",
        en: "👑 Matrilineal Alliances with Berber Dynasties",
        fr: "👑 Alliances Politiques avec les Lignées Libyennes",
        es: "👑 Alianzas Reales y Matrimonios Berberes"
      },
      description: {
        pt: "Uso do matrimônio tático com linhagens principescas berberes matrilineares locais para estabilidade do império púnico.",
        en: "Strategic integration and marriages with local matrilineal Berber/Numidian dynasties to secure trade and military support.",
        fr: "Unions tactiques avec les lignées libyco-berbères de type matrilinéaire pour garantir la paix et l'approvisionnement.",
        es: "Matrimonios de alta diplomacia con princesas líbico-berberes con derechos sobre la posesión agraria para cohesionar el territorio."
      },
      evidence: {
        pt: "Para garantir segurança das rotas terrestres transaarianas, generais cartagineses casavam-se com princesas herdeiras de clãs berberes matrilineares (como a união diplomática de Sofonisba), integrando os direitos de governar terras agrícolas e rebanhos nativos.",
        en: "Carthaginian elites formed key diplomatic bonds by marrying noble women from matrilineal Berber/Numidian houses (e.g., Sophonisba's alliance), ensuring land security, soldier supplies, and caravan rights.",
        fr: "Les chefs de Carthage scellaient la fidélité des peuples voisins en épousant des filles de lignées chefs berbères (ex. l'alliance de Sophonisbe), unifiant ainsi les droits pastoraux et le commerce maritime.",
        es: "La elite púnica forjaba pactos mediante lazos nupciales con hijas herederas de clanes libio-bereberes (como la célebre condesa Sofonisba), garantizando paso y reclutamiento de jinetes de caballería ligera."
      }
    }
  },
  land_of_punt: {
    administrativeLevels: {
      title: {
        pt: "🏢 Federação e Portaria Cooperativa (Punt)",
        en: "🏢 Cooperative Peer-Trading Networks (Punt)",
        fr: "🏢 Confédération Portuaire Sacrée (Pount)",
        es: "🏢 Jefatura de Puertos e Embarques Colaborativos"
      },
      description: {
        pt: "Sistemas horizontais de governança portuária mercantil de alta eficiência e paz diplomática bilateral com Kemet.",
        en: "Horizontal, non-coercive maritime trade networks managing valuable exotic asset distributions under sacred peer systems.",
        fr: "Structure confederative de ports gérant l'exportation pacifique de métaux précieux et de résines sacrées sous traités.",
        es: "Sistemas horizontales de gobernanza de muelles comerciales que operaban con total paz diplomática bilateral con Egipto."
      },
      evidence: {
        pt: "Registros contam com 2 a 3 níveis: o Rei de Punt (Parahu), sua Rainha Co-governante (Ati), os Líderes de Portos alfandegários da costa, e os Inspetores de Carga e Escolta de caravanas diplomáticas.",
        en: "Identified 2 to 3 tiers: the Supreme Chief of Punt (Parahu), his Co-Ruling Consort (Ati), Chief Wharf Masters, and caravan merchant escort teams.",
        fr: "Présence de 2 à 3 échelons : le Souverain de Pount (Parahou), son Épouse Co-régnante (Ati), les Gouverneurs des comptoirs et inspecteurs maritimes.",
        es: "Estilo articulado en 2 o 3 rangos: el Cacique de Punt (Parahu), la Reina Co-Gobernante (Ati), los Superintendentes de Muelles, y Custodios de caravanas fluviales."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Registros Mnemônicos e Epigrafia de Punt",
        en: "✍️ Mnemonic Records and Diplomatic Signage",
        fr: "✍️ Signes Mnemotechniques Douaniers",
        es: "✍️ Codificación Comercial e Señas de Carga"
      },
      description: {
        pt: "Uso de tabulação mnemônica e símbolos aduaneiros originais do Chifre da África para rotas marítimas.",
        en: "Utilization of indigenous mnemonic notations and custom trade logs used in the Horn of Africa long before European alphabets.",
        fr: "Pratique de notation mnémotechnique de chargement et d'inventaires sur les ports de la mer Rouge.",
        es: "Uso de señales mnemónicas y contabilidad gráfica nativa de la costa para inventariar mirra fresca de alta pureza."
      },
      evidence: {
        pt: "Embora sem arquivos burocráticos monolíticos clássicos preservados, os chefes de Punt utilizavam entalhes mnemônicos e símbolos de inventário gravados para despachar milhares de fardos de incenso, toras de ébano e ouro aos parceiros do Nilo.",
        en: "While traditional parchment books did not survive, Punt rulers executed exact stock measurements and inventory signage to authorize ship loadings containing tons of pure incense resins, gold, and ebonywood.",
        fr: "Bien qu'aucun livre en papier n'ait survécu, les Pountites utilisaient un code de marques de cire et d'entailles pour inventorier les cargaisons d'encens mûr destinées aux temples de Thèbes.",
        es: "Mediante el uso de marcas registradas y sellos sobre recipientes, las dinastías de Punt validavam y despachaban toneladas de resinas aromáticas, pieles de leopardo y oro fino."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Rainha Ati e a Co-governança Ativa",
        en: "👑 Queen Ati and Sovereign Co-Governance",
        fr: "👑 Reine Ati et Partage Actif du Pouvoir",
        es: "👑 La Reina Ati y Co-Gobernación Marítima"
      },
      description: {
        pt: "A rainha Ati de Punt personifica a agência executiva de poder e negociação de fronteira ao lado do monarca Parahu.",
        en: "Queen Ati of Punt represents full-status female co-governance, taking active, visual leads in sovereign state diplomacy.",
        fr: "La reine Ati de Pount incarne le pouvoir partagé, jouant un rôle de premier plan lors de la réception des délégations envoyées de Kemet.",
        es: "La soberana reina Ati simboliza la co-gobernación de plenos derechos diplomáticos, civiles y aduaneros en el Chifre africano."
      },
      evidence: {
        pt: "Nos relevos do Templo de Hatshepsut em Luxor, a rainha Ati é retratada diretamente à frente do rei Parahu, inspecionando pessoalmente as oferendas egípcias e conduzindo as deliberações alfandegárias de forma soberana e equitativa.",
        en: "In Hatshepsut's Temple reliefs in Luxor, Queen Ati is rendered alongside King Parahu as a primary active decider, authoritatively examining Egyptian trade items and authorizing high-value resource exports.",
        fr: "Sur les bas-reliefs de Louxor, la reine Ati est dessinée sur un pied d'égalité avec Parahou, présidant la cérémonie pastorale et validant l'exportation d'arbres de myrrhe.",
        es: "En las murallas de Luxor, la reina Ati no aparece escondida, sino recibiendo directamente las comitivas y dictando el intercambio aduanero del incienso y los árboles de mirra."
      }
    }
  },
  mali_empire: {
    administrativeLevels: {
      title: {
        pt: "🏢 Burocracia Imperial de 5 Níveis (Mali)",
        en: "🏢 5 Tier Sahelian Civil Bureaucracy (Mali)",
        fr: "🏢 Administration Impériale à 5 Échelons (Mali)",
        es: "🏢 5 Niveles Administrativos del Mansado de Mali"
      },
      description: {
        pt: "Planejamento estatal abrangente incluindo a Gbara (Assembleia Suprema) e governadores civis qualificados para guarnecer o ouro.",
        en: "Expansive state layout including the Gbara (Supreme Assembly) and civil governors managing the trans-Saharan wealth.",
        fr: "Vaste planification comprenant le Gbara (Grand Conseil constitutionnel) et des préfets chargés de sécuriser l'or et le sel.",
        es: "Gabinete civil complejo que comprendía la Gbara (Asamblea Suprema de Clanes) y jueces (cadis) de control fiscal."
      },
      evidence: {
        pt: "O império operava com 5 níveis claros: o Mansa (chefe supremo do estado), a Assembleia Gbara de trinta e dois ministros, os Governadores Provinciais militares (Farins), os Prefeitos Urbanos e os Gestores Fiscais de Arrecadação Portuária fluvial.",
        en: "Mali metrics show 5 tiers: the Mansa (Emperor), the Gbara Assembly (32 ministers of codified clans), Military Governors (Farins), Municipal Mayors (Koyas), and Tax Officers checking gold caravan ports.",
        fr: "Le Mansado de Mali comptait 5 échelons : le Mansa (Empereur), le Gbara (assemblée de 32 ministres de clans), les Farins (préfets militaires de régions), les chefs de villes (Koyas), et les gaires des ports fluviaux.",
        es: "La base Seshat documenta 5 niveles: el Mansa (Soberano), la Gbara (Cuerpo Legislativo de 32 clanes fundadores), los Farins (Gobernadores de Frontera), los alcaldes locales, y los interventores de aduana de canoas."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Ajami Mandinga em Timbuktu",
        en: "✍️ Ajami Script and Academic Archives",
        fr: "✍️ Écriture Adjami et Annales de Tombouctou",
        es: "✍️ Escritura Ajami y Biblioteca de Tombuctú"
      },
      description: {
        pt: "Adoção e adaptação local da grafia Ajami para registrar crônicas, taxações estatais e literatura científica.",
        en: "Adaptation and native use of Ajami (Arabic alphabet tailored for Mande scripts) to catalog taxes, law, and astronomy monographs.",
        fr: "Adaptation autonome de l'Écriture Adjami pour rédiger des traités de sciences, de médecine et d'impôts municipaux.",
        es: "Uso sistemático del Ajami (escritura árabe ajustada para lenguas locales) para censos, préstamos mercantiles y tratados."
      },
      evidence: {
        pt: "A correspondência real de Mansa Musa e a vasta coleção de milhares de manuscritos nas bibliotecas e na Universidade de Sankore em Timbuktu eram escritas em Ajami, registrando impostos, contabilidade de ouro, astronomia e manuais de direito público.",
        en: "Mansa Musa's diplomatic letters and the iconic thousands of manuscripts stored in Timbuktu's libraries and Sankore University was logged in Ajami script, safeguarding tax tallies, mathematics, astronomy, and public civil code.",
        fr: "La correspondance royale et les dizaines de milliers de parchemins de Tombouctou et de la mosquée de Djingareyber étaient écrits en Adjami, compilant des bilans de douane, calculs géométriques et codes de lois.",
        es: "Las caravanas de eruditos y millares de textos custodiados en Tombuctú y la Universidad de Sankore operaban en Ajami. Contenían actas de tasación fiscal, tratados de astronomía y cartas diplomáticas."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Herança de Trono por Linhagem Materna",
        en: "👑 Matrilineal Succession Pattern in Mali",
        fr: "👑 Mode de Succession Matrilinéaire Impérial",
        es: "👑 Herencia y Linaje Real Matrilineal"
      },
      description: {
        pt: "A coroa do Mansa e a posse das minas de ouro provinciais dependiam intrinsecamente do sangue das linhagens femininas.",
        en: "Succession rights to the Mansa throne and gold-yielding lands depended strongly on ties through maternal lineages.",
        fr: "Les droits de succession au trône impérial appartenaient de façon privilégiée à la lignée maternelle.",
        es: "La legitimación del Mansado y heredad de los fértiles valles del Níger requerían sangre de dinastías maternas."
      },
      evidence: {
        pt: "A historiografia (incluindo relatos oculares detalhados como os de Ibn Battuta) corrobora que o trono era transmitido ativamente por linhagem matrilinear. Não herdava o filho do rei, mas sim o filho da irmã do rei, reconhecido como o herdeiro incontestável de legitimidade.",
        en: "Written histories and royal archives confirm that high sovereign succession prioritized the maternal side (as described in Ibn Battuta's travels). The heir was typically the Mansa's sister's son, guaranteeing mother-blood legitimacy.",
        fr: "Les récits directs d'Ibn Battuta décrivent que le pouvoir se transmettait souvent par la sœur du Mansa. Ce n'était pas le fils biologique du roi qui héritait du trône, mais le neveu par la lignée maternelle.",
        es: "Crónicas directas de Ibn Battuta confirman que la corona de Mali pasaba al hijo de la hermana del Mansa reinante, lo que garantizaba la pureza de sangre real mediante la consagración materna."
      }
    }
  },
  songhai_empire: {
    administrativeLevels: {
      title: {
        pt: "🏢 Complexidade Estatal de 6 Níveis (Songai)",
        en: "🏢 6 Level Public Administration Grid (Songhai)",
        fr: "🏢 Souveraineté Multi-Filtre à 6 Échelons (Songhaï)",
        es: "🏢 6 Escalafones de Funcionarios de Askia"
      },
      description: {
        pt: "O mais alto nível de funcionalismo público segmentado in situ de todo o império do Sahel medieval.",
        en: "The highly categorized, multi-tier public administration system developed in the medieval West African Sahel.",
        fr: "Le système d'administration publique le plus hiérarchisé du Sahel ouest-africain classique.",
        es: "La estructura integrada de funcionarios ministeriales más subdividida e intacta del Sahel medieval."
      },
      evidence: {
        pt: "Uso de 6 níveis hierárquicos: o Askia (Imperador Supremo), os Ministros de Gabinete (Finanças, Esquadra de Canoas Fluviais, Agricultura e Obras Públicas), os Governadores Civis Regionais, prefeitos, escribas e juízes estatais municipais.",
        en: "Fully operationalized 6 administrative levels: the Askia (Supreme ruler), Cabinet Ministers (Finance/Aradon, Navy Chief, Agriculture Director), Regional Governors, Municipal Scribes, and local tax-auditors.",
        fr: "Réseau comptant 6 niveaux : l'Askia (Empereur), le Conseil des Ministres (Chef des Eaux/Flotte, Grand Trésorier, Chef agraire), les Gouverneurs de provinces, les Scribes de villes et percepteurs.",
        es: "Poseían 6 niveles de gestión real: el Emperador Askia, su Gabinete Temático de Ministros (Flotas del Níger, Hacienda, Sementeras), Delegados Territoriales, Auditores de Mercado, Escribas, y Prefectos locales."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Ajami Avançado e Codificação Alfandegária",
        en: "✍️ Advanced Ajami Ledgering & Legal Systems",
        fr: "✍️ Archvage Juridique en Adjami et Code Civil",
        es: "✍️ Ajami Judicial de las Cátedras de Sankore"
      },
      description: {
        pt: "A Universidade de Sankore e os tribunais municipais utilizavam escrutínios em escrita Ajami para registrar jurisprudência e leis civis.",
        en: "Sankore University master jurists and public courts utilized Ajami scripts to log complex civil laws and customs duties.",
        fr: "La prestigieuse mosquée-université de Sankorélits utilisait l'Adjami pour rédiger codes pénaux et impôts civils.",
        es: "Los tribunales y cátedras de la Universidad de Sankore utilizavam tratados en Ajami para legislar deudas e herencias."
      },
      evidence: {
        pt: "A vasta coletânea judicial do Tarikh al-Sudan compilou séculos de administração imperial de justiça e arrecadação alfandegária fluvial gravados inteiramente de forma nativa na África usando sistemas de escrita de grafia Ajami e Árabe erudito.",
        en: "The historic legal and historic volume, Tarikh al-Sudan, contains centuries of Sahelian public laws, river port audits, and municipal statistics recorded entirely in Ajami/Arabic manuscripts by native African scholars.",
        fr: "Le volume de lois civils et religieux Tarikh al-Sudan compile des siècles de jugements et impôts sur le sel rédigés par des juristes ouest-africains en écritures Adjami et arabe érudit.",
        es: "Compilaciones históricas como el Tarikh al-Sudan recogen siglos de ordenanzas públicas, tasas portuárias del río Níger y jurisprudência escritas en papel nativo con caligrafía Ajami."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Dinastia Askia e as Linhagens do Solo",
        en: "👑 Female Land Trust Legitimation (Songhai)",
        fr: "👑 Alliances Foncières et Lignées Féminines",
        es: "👑 Alianzas Reales y Reivindicación Materna"
      },
      description: {
        pt: "A união diplomática regulada por casamentos estratégicos com detentoras de linhagens maternas era condição vital para o domínio do trono.",
        en: "Tactical institutional marriages with traditional female land-owners was mandatory to validate the imperial Askia crown.",
        fr: "Les unions avec les dépositaires traditionnelles de la terre subsaharienne servaient à asseoir la dynastie régnante.",
        es: "Uniones matrimoniales con sacerdotisas y representantes femeninas agrarias de oásis para sustentar la posesión de las cosechas."
      },
      evidence: {
        pt: "Para dominar as províncias agrícolas sem depender apenas de cavalaria armada, o imperador Askia Muhammad selava uniões civis e sacramentais com senhoras detentoras de posses territoriais históricas de herança matrilinear das etnias nativas.",
        en: "Askia Muhammad stabilized food security and secured regional loyalty by forming sacred unifications with aristocratic women who held ancestral land-tenure rights passed through hereditary matrilineal rules.",
        fr: "L'Empereur Askia Mohammed instaura la paix civile en s'alliant par le mariage avec les grandes héritières féodales possédant les droits collectifs de gestion des sols d'après la coutume matrilinéaire.",
        es: "Para calmar rebeliones y amparar el abasto de grano, el Askia Mohammad unificaba su corona con dignatarias portadoras de títulos agrarios nativos concedidos mediante el principio matrilineal."
      }
    }
  },
  great_zimbabwe: {
    administrativeLevels: {
      title: {
        pt: "🏢 Burocracia Espacial de 4 Níveis (Zimbábue)",
        en: "🏢 4 Tier Spatial Stone Administration (Zimbabwe)",
        fr: "🏢 Hiérarchie Architecturale à 4 Niveaux",
        es: "🏢 4 Escalafones Territoriales del Reino Shona"
      },
      description: {
        pt: "Gestão de muralhas, pecuária extensiva e minérios de ouro por províncias integradas ao porto marítimo de Kilwa.",
        en: "Zonified central administration managing gold panning, cattle taxes, and massive stone closures linked with Kilwa ports.",
        fr: "Gestion territoriale hiérarchisée administrant les ressources forestières et l'or relié à l'Océan Indien par la côte.",
        es: "Estructura ejecutiva que coordinaba la minería de oro, pasturas y canteras unificada con las flotas de Kilwa."
      },
      evidence: {
        pt: "A base Seshat comprova 4 níveis de complexidade pública organizada: o governante (Mwenemutapa) residindo na Grande Muralha, os Supervisores das Minas de Ouro, os Chefes de Províncias agrícolas, e cobradores rurais de tributos de carne e couro.",
        en: "Seshat records verify 4 structured levels of public administrative authority: the King residing at the Great Enclosure, Imperial Gold Mine managers, Regional heads of granite outpost camps, and cattle-audit officers.",
        fr: "Le registre Seshat évalue l'État à 4 niveaux d'autorité : le Roi logé au Grand Enclos de pierre, les Directeurs de mines d'or, les Préfets agricoles de campements satellites, et les gérants de bétail.",
        es: "La base Seshat prueba 4 grados: el Monarca (Mwenemutapa) con sede en el Gran Recinto, los Superintendentes de las Minas, Jefes de Campamentos de Piedra satélites, y Cobradores rústicos de ganado."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Litográfica e Simbologia das Muralhas",
        en: "✍️ Architectural & Lithic Symbol Codes",
        fr: "✍️ Langages Géométriques des Pierres Sèches",
        es: "✍️ Ideogramas de Pássaros Metamórficos"
      },
      description: {
        pt: "Sistemas geométricos de pavimentação e glifos líticos rituais esculpidos em pedra de sabão sem paralelo no hemisfério sul.",
        en: "Highly specific geometric patterns, chevron friezes, and carved soapstone bird glyphs used for administrative and royal communication.",
        fr: "Motifs géométriques ordonnés de pierres imbriquées et oiseaux rituels sculptés servant de code politique stable.",
        es: "Códigos tridimensionales líticos e insignias de aves de esteatita (pedra-sabão) que servían de decretos de soberanía."
      },
      evidence: {
        pt: "Muralhas monumentais eram erguidas sem argamassa, trazendo frizos com padrões de espinha de peixe (Chevron) que continham significado histórico preciso de status. As monumentais esculturas de Pássaro de Sabão no topo das torres ditavam mandados e demarcações estatais reais.",
        en: "Carved soapstone birds situated on towers served as physical state standard decrees certifying royal command. Intricate Chevron geometric patterns laid directly onto mortarless granite walls displayed dynamic markers of sovereign lineage.",
        fr: "Les célèbres figures d'oiseaux de stéatite dressées sur les pylônes faisaient office de bannières légales et décrets du pouvoir. Les frises en chevrons des murailles de granit gravaient le prestige des clans souverains.",
        es: "Las famosas figuras de las aves de esteatita fijadas en los tótems representaban edictos reales Shona de plenos derechos. Los grabados en espina de pescado (Chevron) de los muros expresaban genealogías estatais."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Rainhas Místicas e Alianças Limpopo",
        en: "👑 Queens Confidants & Limpopo Land Rights",
        fr: "👑 Pouvoir Secret des Reines Shona",
        es: "👑 Alianzas de Tierra del Limpopo Shona"
      },
      description: {
        pt: "As rainhas-consortes do Zimbabue detinham posses rurais independentes e exército próprio de segurança territorial.",
        en: "Sovereign consorts and Queen Mothers in Zimbabwe held sovereign pasture rights and autonomous security forces.",
        fr: "Les reines-souveraines et les mères royales disposaient de pâturages fonciers indépendants et de milices privées.",
        es: "Las reinas del Gran Recinto poseían feudos e rebanhos autónomos de ganado con su própria escolta armada."
      },
      evidence: {
        pt: "A arqueologia e tradição Shona revelam que as rainhas-mães detinham distritos inteiros sob seu encargo e exército próprio para defender rotas comerciais. Elas participavam ativamente das decisões alfandegárias de escoamento do ouro aos rios do Limpopo.",
        en: "Archaeological consensus highlights that royal Shona mothers and consorts controlled distinct territorial pastures and gold lanes. They held autonomous security retinues, acting as primary arbiters in Kilwa sea trade transactions.",
        fr: "L'archéologie confirme que les épouses royales géraient des domaines pastoraux exclusifs. Elles détenaient des milices d'escorte et tranchaient de manière souveraine les litiges d'échanges d'ivoire sur le fleuve Limpopo.",
        es: "Los vestigios ratifican que las damas nobles dominavam pastizales independientes en la cuenca del Limpopo. Disponían de guardias armados y validavam la descarga de oro fino con delegaciones árabes de Kilwa."
      }
    }
  },
  kanem_bornu: {
    administrativeLevels: {
      title: {
        pt: "🏢 Centralização Estatal de 5 Níveis",
        en: "🏢 5 Tier Centralized Oasis Bureaucracy",
        fr: "🏢 Administration Saharienne à 5 Échelons",
        es: "🏢 5 Escalafones Administrativos en Kanem"
      },
      description: {
        pt: "Gerenciamento estratégico transaariano de postos militares de segurança de oásis e taxação de rotas caravanistas.",
        en: "Strategic Trans-Saharan system managing military frontier forts, salt deposits, and camel caravan taxes under sovereign law.",
        fr: "Gestion stratégique des oasis, postes fortifiés frontaliers et gares fiscales de chameaux.",
        es: "Gestión estratégica de fortines defensivos de desierto y peajes de caravanas bajo leyes coordinadas."
      },
      evidence: {
        pt: "O império Kanem-Bornu registrava 5 níveis de funcionalismo público: o Rei Supremo (Mai), o Conselho Executivo de Doze Oficiais Estatais, os Governadores Provinciais do Chade, os Prefeitos de Oásis fronteiriços, e os Inspetores Aduaneiros de Sal e Cavalos.",
        en: "Historical tallies log 5 administrative levels: the Supreme Mai (Emperor), the High Council of 12 Cabinet Ministers, Chad Basin Provincial Governors, Oasis Scribes, and Caravan Tax Inspectors.",
        fr: "Les parchemins attestent de 5 niveaux : le Mai (Monarque), le Conseil Suprême des 12 conseillers, les Ducs régionaux du lac Tchad, les Intendants des oasiens, et les douaniers régulant le trafic de sel.",
        es: "Estilo consolidado en 5 estratos: el Mai (Soberano), el Consejo de Doce Sabios de Estado, los Gobernadores del Chade, los Inspectores de Oásis de peaje, y Recaudadores de sal y monturas."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Ajami Clássica Kanemi",
        en: "✍️ Classical Kanem-Bornu Ajami Script",
        fr: "✍️ Correspondance Royale en Adjami Kanemi",
        es: "✍️ Ajami Alfandegario de los Oásis"
      },
      description: {
        pt: "Uso institucional da caligrafia Ajami para decretos reais, diplomacia externa e escrituração de impostos e aduanas.",
        en: "Institutional use of Ajami script for royal decrees, foreign correspondence, and camel taxation ledgers.",
        fr: "Usage légal du script Adjami pour rédiger décrets d'État et registres fiscaux des marchands.",
        es: "Uso diplomático del Ajami para plasmar decretos reales del Mai, pactos con reinos árabes y aduana de sal."
      },
      evidence: {
        pt: "Os decretos da dinastia Sefuwa eram registrados em manuscritos de escrita Ajami. Usavam-na ativamente para certificar o envio de tributos, registrar contratos e realizar correspondência de alta diplomacia com sultões do mediterrâneo.",
        en: "Sefuwa dynasty decrees and chronicles (such as the Diwan al-salatin) were maintained in native Ajami and Arabic. These codes certified state tax tallies, diplomatic treaties, and trade tariffs across Saharan oasis pathways.",
        fr: "Les chartes de privilèges de la dynastie Sefuwa étaient consignées en script Adjami (Diwan al-salatin). Ce recueil documentait les dons de bétail rituels, exemptions de taxes, et lettres aux rois libyens.",
        es: "El Diwan al-salatin (anales estandarte de la dinastía Sefuwa) se compiló de forma nativa e íntegra en Ajami. Documentaba censos de guerreros, exenciones impositivas y tratados con jefes del desierto."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 A Magira: A Imperatriz-Mãe Soberana",
        en: "👑 The Mighty Magira (Sovereign Queen Mother)",
        fr: "👑 La Magira : Pouvoir Suprême Matriarcal",
        es: "👑 La Magira e el Veto Imperial Matrilineal"
      },
      description: {
        pt: "O cargo da Magira representava um contra-poder executivo máximo absoluto de linhagem e sucessão real.",
        en: "The high office of the Magira held absolute political veto and state power over succession lines.",
        fr: "L'institution de la Magira représentait un contre-pouvoir suprême capable de destituer l'Empereur.",
        es: "La institución del Magirado constituía un verdadero contra-poder ejecutivo real de ascendência matrilinear."
      },
      evidence: {
        pt: "A Magira (Imperatriz-Mãe) possuía corte, exército e receitas fiscais próprias e autônomas. Era ela a única que detinha o direito legal de julgar e destituir o rei Mai se ele violasse leis tradicionais africanas ou constituições de terras do Chade.",
        en: "The Magira (Queen Mother) operated her own independent court, guard retinue, and tax revenues. Legally, she held absolute veto power over executive decisions and could suspend or depose the sovereign Mai if he breached traditional civil laws.",
        fr: "La Magira disposait d'un tribunal, d'une armée et de budgets douaniers séparés. Elle pouvait interdire une guerre ou emprisonner le Mai régnant s'il outrepassait les coutumes sacrées ou la constitution coutumière.",
        es: "La Magira (Emperatriz Madre) gozaba de corte, guardias y arcas tributárias totalmente separadas. Legalmente poseía derecho de veto judicial y militar sobre el Mai, pudiendo apartarle del cetro ante faltas graves civiles."
      }
    }
  },
  ashanti_empire: {
    administrativeLevels: {
      title: {
        pt: "🏢 Burocracia Estadual de 5 Níveis (Ashanti)",
        en: "🏢 5 Tier Gold & Adinkra Administration",
        fr: "🏢 Hiérarchie Bureaucratique Triomphale à 5 Niveaux",
        es: "🏢 5 Grados Administrativos del Trono de Ashanti"
      },
      description: {
        pt: "Estrutura governamental dividida em divisões exatas do Exército e do Fisco da poeira de ouro no Golfo da Guiné.",
        en: "Highly categorized governmental divisions regulating gold dust currencies, clan diplomacy, and massive armies.",
        fr: "Vaste administration codifiant l'impôt sur la poussière d'or, la pesée officielle et la diplomatie clânique.",
        es: "Estructura ejecutiva muy rigurosa de control de balanzas, peajes de mercaderes y diplomáticos reales."
      },
      evidence: {
        pt: "A base Seshat registra 5 níveis: o Asantehene (Imperador do Trono de Ouro), os Ministros de Divisões Executivas, os Governadores Regionais de florestas, os Linguistas Estatais (Oficiais diplomatas), e os cobradores oficiais com balanças de bronze.",
        en: "Polaris metrics identify 5 levels: the Asantehene (Supreme Ruler), State Council ministers, Division heads, State Linguists (professional diplomats/Okyeame), and Gold-dust Weighing Tax Scribes.",
        fr: "La base Seshat atteste de 5 niveaux : l'Asantehene (chef suprême), les Ministres de Divisions, les préfets de districts de forêts d'or, les Linguistes royaux (Okyeame), et les peseurs fiscaux d'or.",
        es: "Dividida en 5 rangos: el Asantehene (Soberano absoluto), Consejo de Divisiones Provinciales, los Linguistas Reales (Okyeame/Embajadores), Supervisores Agrícolas, y Scribes de Pesaje de Oro Fino."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Adinkra e Pesos de Ouro",
        en: "✍️ Adinkra Mnemonic Ideographical Scripts",
        fr: "✍️ Ideogrammes Adinkra et Symboles Légaux",
        es: "✍️ Grafías Adinkra e Pesas Broncíneas"
      },
      description: {
        pt: "Padrões estéticos e filosóficos Adinkra serviam como códigos semânticos e burocráticos de correspondência dinástica.",
        en: "Highly systematized Adinkra symbols served as dynamic graphic codes for diplomatic and civil communication.",
        fr: "La symbolique Adinkra constituait un véritable système d'écriture idéographique codifiant lois et alliances.",
        es: "Los glifos ideográficos Adinkra grabados en tejidos y pesas de bronce cumplían funciones de escritura diplomática."
      },
      evidence: {
        pt: "Os símbolos Adinkra carregavam significados filosóficos e mandados políticos profundos em tecidos reais. A contabilidade fiscal do ouro era balizada por uma vasta gama de pesos de latão e bronze esculpidos com provérbios e equações mnemônicas de pesagem.",
        en: "Adinkra graphic symbols carry profound philosophical and public law claims across state robes. Gold dust weighing was regulated by specialized cast-brass weights (Abramuo) engraved with geometric algebraic formulas and proverbs.",
        fr: "Les graphies Adinkra imprimaient les chartes régaliennes sur les draps d'apparat. Les impôts étaient pesés avec des poids de bronze ornés de figures géométriques codifiant des formules d'équivalence monétaire.",
        es: "Los ideogramas Adinkra estampaban edictos del trono sobre vestimentas sagradas. El cobro del oro se fiscalizaba con pesas de bronce fundido con ecuaciones mnemónicas de tasación y proverbios."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 O Trono de Ouro e Seleção Matrilinear",
        en: "👑 Matrilineal Power Core & The Golden Stool",
        fr: "👑 Le Trône d'Or et Choix Matrilinéaire",
        es: "👑 Herencia Matrilineal y el Trono Sika Dwa"
      },
      description: {
        pt: "A sucessão real e a posse das terras do império Ashanti seguiam estritamente linhagens reais femininas nativas.",
        en: "Sovereign succession and control of the Golden Stool (Sika Dwa) requires strict biological descent through elite maternal lines.",
        fr: "L'autorité impériale et la détentrice du Trône d'Or dépendaient strictement d'un mode de succession matrilinéaire.",
        es: "El linaje legítimo para heredar el Trono de Oro (Sika Dwa) radicaba estrictamente en dinastías maternas reales."
      },
      evidence: {
        pt: "O império Ashanti era e permanece estritamente matrilinear. O Asantehene (monarca) é eleito e nomeado pela Asantehemaa (Rainha-Mãe), que detém poder de veto político soberano supremo e herança indiscutível do sangue do trono.",
        en: "Ashanti states operate on matrilineal kin design. The Empress Mother (Asantehemaa) wields sovereign supremacy; she nominates the Emperor (Asantehene) and acts as the final judge regarding constitutional matters.",
        fr: "La structure ashanti est l'une des plus purement matrilinéaires au monde. La Reine-Mère (Asantehemaa) possède l'autorité suprême : elle choisit et confirme l'Asantehene (Empereur) et garde le dépôt constitutionnel.",
        es: "La confederación Ashanti era estrictamente matrilinear. La Reina Madre (Asantehemaa) es la soberana de máxima distinción política, poseyendo derecho de veto absoluto y nominando al Asantehene para portar el Trono."
      }
    }
  },
  numidia: {
    administrativeLevels: {
      title: {
        pt: "🏢 Hierarquia Tributária de 4 Níveis (Numídia)",
        en: "🏢 4 Tier Numidian Strategic Treasury",
        fr: "🏢 Administration Territoriale à 4 Échelons",
        es: "🏢 4 Escalafones Administrativos del Reino Massylii"
      },
      description: {
        pt: "Sistema de guarnições militares estatais de segurança e arrecadação de cereais do rei Massinissa no Norte da África.",
        en: "Public treasury system, state military garrisons, and wheat granary collection managed by King Masinissa.",
        fr: "Trésor public, garnisons militaires étatiques et collecte fiscale de blé sous la direction du roi Massinissa.",
        es: "Gabinete fiscal, graneros estatales y guarniciones de caballería ligera administrados por el rey Masinissa."
      },
      evidence: {
        pt: "A Numídia unificada operava com 4 níveis claros: o Rei, as Chefias militares das guarnições da cavalaria real, os Magistrados Urbanos de vilas de mercado, e os Escribas coletores de grãos e tributos agrícolas locais.",
        en: "Historical models prove 4 distinct levels: the Sovereign King, Military Garrisons commanders, urban Market Scribes, and Rural Grain Collectors checking local peasant outputs.",
        fr: "L'État numide s'appuyait sur 4 niveaux : le Roi (Massinissa), les Commandants de cavalerie royale, les Éscribes municipaux des comptoirs ruraux, et les inspecteurs de blé de plaines.",
        es: "Dividida en 4 esferas: el Soberano Rey, Jefes de Guarnición de Caballería Ligera, Alcaldes de Ciudades del Altiplano, y Escribas de recaudación de trigo de las vegas fértiles."
      }
    },
    writingSystems: {
      title: {
        pt: "✍️ Escrita Líbio-Berbere Antigua",
        en: "✍️ Old Libyco-Berber Writing Systems",
        fr: "✍️ Écriture Libyco-Berbère Impériale",
        es: "✍️ Escritura e Inscripciones Libyco-Berber"
      },
      description: {
        pt: "O uso soberano da escrita alfabetiforme consonantal autóctone ancestral do Tifinagh em estelas públicas e decretos de terra.",
        en: "Sovereign use of the consonantal Libyco-Berber script (ancestral to Tifinagh) on public monumental stelae and land boundary decress.",
        fr: "Usage de l'écriture consonantique libyco-berbère ancienne, ancêtre du Tifinagh, gravée sur bornes funéraires et royaux.",
        es: "Uso oficial de la escritura consonántica líbico-bereber (ancestro de la actual Tifinagh) en linderos y templos de Numidia."
      },
      evidence: {
        pt: "Dezenas de estelas funerárias e públicas monumentais (como a estela de Massinissa) provam o domínio seguro e ativo desta escrita para catalogar linhagens familiares, registrar posses agrícolas e lavrar tratados municipais de cavalaria.",
        en: "Scores of public monuments (such as King Masinissa's monumental stones) demonstrate full native literacy. It recorded military treaties, royal lineages, and agricultural boundaries across North African valleys.",
        fr: "De nombreuses stèles gravées (dont celle de Dougga) démontrent une alphabétisation active servant à acter alliances de cavaliers, actes juridiques municipaux et généalogies de souverains numides.",
        es: "Efigies y monumentos pétreos (como la estela monumental de Dougga) ratifican una alfabetización autóctona constante para trazar tratados, demarcación de fincas imperiales y actas de caballería."
      }
    },
    matrilinealAlliances: {
      title: {
        pt: "👑 Alianças e Matriarcados da Montanha",
        en: "👑 Mountain Matriarchal Clan Bonds (Numidia)",
        fr: "👑 Traités Politiques avec les Matriarches Berberes",
        es: "👑 Alianzas Matrilineales Massylii"
      },
      description: {
        pt: "União diplomática com linhagens maternas das montanhas do Atlas para garantir legitimidade e guerreiros à cavalaria.",
        en: "Strategic dynastic alliances of royal houses with mountain matriarchal lineage holders to guarantee military lightweight riders.",
        fr: "Traités civils et nupiaux avec les grandes matriarches de l'Atlas berbère pour asseoir l'autorité politique.",
        es: "Pactos políticos nupciales con matriarcas bereberes del Atlas para resguardar las rotas de pastoreo y caballos."
      },
      evidence: {
        pt: "Os Massylii e Masaesyli formavam alianças políticas que dependiam da mediação das matriarcas tribais das montanhas. Casamentos reais táticos eram sacramentados com herdeiras dessas linhagens matrilineares para assegurar o suprimento estável de cavalos nativos africanos.",
        en: "Massylii kings secured frontier territories by marrying noble women from mountain matrilineal houses. These strategic bonds consolidated animal pastures and secured hundreds of skilled cavalrymen to withstand Carthage and Rome.",
        fr: "Les chefs numides scellaient le ralliement des tribus autonomes pastorales de l'Atlas par des mariages contractés auprès de clans fortement matrilinéaires, unifiant la cavalerie légère et débloquant les troupeaux.",
        es: "Los regentes Massylii estabilizaban fronteras mediante enlaces diplomáticos con deidades y matriarcas del Atlas de linajes matrilineales, garantizando el adiestramiento y aporte voluntario de la famosa caballería de Numidia."
      }
    }
  }
};
