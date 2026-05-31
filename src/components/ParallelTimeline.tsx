import React, { useState, useEffect } from 'react';
import { HistoricalPoint, Language } from '../types';
import { translations } from '../utils/translations';
import { motion, AnimatePresence } from 'motion/react';
import { Calendar, Compass, ArrowRightLeft, Landmark, Globe, Sparkles, Scale, Info, Layers } from 'lucide-react';

interface ParallelTimelineProps {
  language: Language;
  selectedPoint: HistoricalPoint | null;
  points: HistoricalPoint[];
  onSelectPoint: (point: HistoricalPoint) => void;
}

interface ParallelPeriod {
  year: number;
  label: Record<Language, string>;
  title: Record<Language, string>;
  africanDetails: Record<string, Record<Language, string>>;
  europeDetails: Record<Language, string>;
  asiaDetails: Record<Language, string>;
  fallbackRegionDetails: Record<string, Record<Language, string>>;
  generalAfricaDetails: Record<Language, string>;
}

// Global parallel history database
const parallelPeriods: ParallelPeriod[] = [
  {
    year: -3000,
    label: { pt: "3000 AC", en: "3000 BC", fr: "3000 AEC", es: "3000 AC" },
    title: {
      pt: "Unificação de Kemet & Bronze Primitivo",
      en: "Kemet Unification & Early Bronze Age",
      fr: "Unification de Kemet & Âge du Bronze Ancien",
      es: "Unificación de Kemet e Inicio de la Edad del Bronce"
    },
    africanDetails: {
      egypt_kemet: {
        pt: "Unificação do Alto e Baixo Egito sob o lendário rei Narmer. Período de ereção dos primeiros arquivos estatais dinásticos e consolidação da escrita hieroglífica formal. Início de suntuosos templos de pedra e arquivos governamentais.",
        en: "Unification of Upper and Lower Egypt under the legendary King Narmer. Development of first formal state archives and hieroglyphic writing systems. Creation of stone monuments and sophisticated treasury controls.",
        fr: "Unification de la Haute et de la Basse-Égypte par le roi Narmer. Naissance des premières archives étatiques royales et fixation de l'écriture hiéroglyphique. Essor monumental en pierre.",
        es: "Unificación del Alto y Bajo Egipto bajo el rey Narmer. Surgimiento de los primeros archivos estatales estables y codificación del sistema de jeroglíficos. Construcciones monumentales en piedra de sillería."
      },
      land_of_punt: {
        pt: "Estabelecimento de rotas proto-comerciais permanentes e florescimento das civilizações portuárias do Chifre da África, fornecendo incenso e ouro de alta pureza para as dinastias de Kemet em expedições marítimas pelo Mar Vermelho.",
        en: "Consolidation of early proto-commercial structures and port centers on the Horn of Africa, supplying incense, obsidian, and high-purity gold to old dynasties of Kemet through early Red Sea maritime routes.",
        fr: "Structures de proto-commerce installées dans la Corne de l'Afrique pour exporter la myrrhe légendaire, l'encens et l'or pur de Punt vers Kemet par les routes directes de la Mer Rouge.",
        es: "Surgimiento de rutas de comercio marítimo regular en el Cuerno de África. Sociedades de Punt suministran incienso de lujo, mirra, obsidiana y oro a las dinastias de Kemet."
      }
    },
    fallbackRegionDetails: {
      nile_valley: {
        pt: "Reino de Kerma no norte da Núbia desenvolve suas bases agropecuárias e arquiteturas iniciais em paralelo às primeiras dinastias egípcias.",
        en: "First stage of Kerma civilization in northern Nubia establishing agropastoral communities in parallel with early Egyptian Dynasties.",
        fr: "Prémices du Royaume de Kerma en Haute-Nubie, développant une agriculture complexe en parallèle des premières dynasties de Kemet.",
        es: "Primeras aldeas monumentais de Kerma en el norte de Nubia, con cultivos intensivos paralelos a las dinastías arcaicas de Kemet."
      }
    },
    generalAfricaDetails: {
      pt: "Saara Ocidental e Sahel experimentam sedentarização ativa. Comunidades pastoris domesticam bovinos autóctones e cultivam painço em áreas lacustres com fabricação de cerâmica elaborada decorada por incisão.",
      en: "Western Sahara and Sahel experience stable pastoral setups. Domestication of cattle and early millet agriculture combined with high-quality incised ceramic production.",
      fr: "Le Sahara Occidental et le Sahel connaissent une sédentarisation pastorale active. Domestication bovine et culture du mil autour des lacs, alliées à une céramique décorée.",
      es: "Sedarización activa en el Sáhara Occidental y el Sahel. Comunidades agrícolas cultivan cereales nativos y confeccionan una refinada cerámica grabada con técnicas de presión."
    },
    europeDetails: {
      pt: "Construção inicial do monumento megalítico de Stonehenge (Reino Unido). Período caracterizado pela cultura neolítica tardia de Kurgan, expansão da Cultura do Vaso Campaniforme e difusão do cobre primitivo.",
      en: "Early stages of Stonehenge construction in Britain. Europe enters late Neolithic and early Chalcolithic periods with the expansion of the Bell Beaker culture and emergence of copper working.",
      fr: "Construction primitive du cromlech de Stonehenge (Royaume-Uni). L'Europe occidentale est caractérisée par la fin du néolithique avec l'expansion de la culture campaniforme.",
      es: "Construcciones paleolíticas iniciales de Stonehenge (Reino Unido). Europa occidental ingresa al Calcolítico con la expansión del vaso campaniforme y metalurgia de cobre rudimentario."
    },
    asiaDetails: {
      pt: "Auge da Civilização do Vale do Indo (Mohenjo-Daro e Harappa) com engenharia civil de redes de esgoto subterrâneas e ruas pavimentadas em grade. China vivencia a cultura Longshan e início do cultivo irrigado de arroz.",
      en: "Peak of the Indus Valley Civilisation (Mohenjo-Daro and Harappa) featuring planned grid towns, brick sewer systems, and global sea trade. China develops the late Longshan culture with irrigated rice.",
      fr: "Apogée de l'Indus (Mohenjo-Daro et Harappa), célèbre pour son urbanisme planifié en grille et son assainissement d'eau. La Chine Tang se développe avec la riziculture irriguée (culture de Longshan).",
      es: "Apogeo del Valle del Indo (Harappa y Mohenjo-Daro) con ingeniería civil planificada y alcantarillado subterráneo de ladrillo cocido. China desarrolla arrozales irrigados de la cultura Longshan."
    }
  },
  {
    year: -2000,
    label: { pt: "2000 AC", en: "2000 BC", fr: "2000 AEC", es: "2000 AC" },
    title: {
      pt: "Reino de Kerma & Novo Império Egípcio",
      en: "Kerma Kingdom & Egyptian New Kingdom",
      fr: "Royaume de Kerma & Nouvel Empire",
      es: "Periodo Clásico de Kerma y Dinastías Imperiais"
    },
    africanDetails: {
      egypt_kemet: {
        pt: "Auge do Médio e Novo Império. Reinados de Hatshepsut e Ramessés II. Construção do templo de Karnak, Luxor e assinatura do Tratado de Kadesh (o mais antigo acordo de paz internacional registrado por escrito).",
        en: "Golden era of Middle and New Kingdoms. Reigns of Queen Hatshepsut and Ramesses II. Construction of Karnak and Luxor temples. Signing of the Treaty of Kadesh, the world's oldest written peace agreement.",
        fr: "Âge d'or du Moyen et Nouvel Empire. Règne de la reine Hatshepsout et de Ramsès II. Construction des temples de Karnak et d'Abou Simbel. Signature du Traité de Kadesh (premier accord de paix mondial écrit).",
        es: "Época dorada del Nuevo Imperio. Reinados de Hatshepsut y de Ramsés II. Edificación de Karnak, Luxor y Abu Simbel. Firma del Tratado de Kadesh, el acuerdo internacional de paz escrito más antiguo."
      },
      land_of_punt: {
        pt: "Punt recebe a grandiosa frota expedicionária da Rainha Hatshepsut de Kemet, comandada pelo chanceler Nehesi. A Soberana Ati e seu consorte recebem as comitivas, comercializando incensos preciosos, ébano e ouro.",
        en: "Punt receives the grand naval expedition sent by Queen Hatshepsut of Egypt. Queen Mother Ati of Punt welcomes the Nile envoys, exchanging valuable frankincense trees, raw gold ingots, and obsidian.",
        fr: "Punt reçoit l'immense expédition maritime navale de la reine Hatshepsout, gravée dans le temple de Deir el-Bahari. La souveraine Ati de Punt accueille l'envoyé Nehesi, livrant or pur et myrrhe.",
        es: "Punt recibe la flota de la reina Hatshepsut registrada en Deir el-Bahari. La reina Ati de Punt lidera los acuerdos, suministrando árboles de mirra en cepellón, marfil, madera de ébano y metales."
      },
      kush_meroe: {
        pt: "Apogeu da Civilização de Kerma, o lendário Estado núbio independente rival de Kemet. Famoso pelos artesãos cerâmicos ultrafinos pretos e vermelhos de requinte técnico inigualável e templos de tijolos ('Deffufas').",
        en: "Apogee of Kerma Civilization, a major black Nubian independent state. Famous for its extremely fine black-topped red pottery, monumental clay temples called 'Deffufas', and powerful royal tumuli.",
        fr: "Apogée de la Civilisation de Kerma en Nubie, grand соперник africain de Kemet. Célèbre pour sa poterie ultra-fine de grand luxe aux rebords noirs polis et temples en briques monumentaux appelés Deffufas.",
        es: "Apogeo del Reino de Kerma (Nubia). Famoso por su cerámica decorada de pared fina pulida (roja y negra) de acabado impecable, y sus templos monumentales de ladrillo negro ('Deffufas')."
      }
    },
    fallbackRegionDetails: {
      west_africa: {
        pt: "Complexos agrários iniciais da Bacia do Níger desenvolvem fornos e cerâmicas protometalúrgicas sem influência externa.",
        en: "Agricultural traditions in the Niger River Basin setting up initial proto-metallurgical pottery styles without any external support.",
        fr: "Traditions agricoles de la Bacia du Niger adaptant des premiers fours de poterie sans contacts extérieurs.",
        es: "Tradiciones campesinas en el este del Sahel y río Níger asientan fornos de cocção avanzada cerâmica."
      }
    },
    generalAfricaDetails: {
      pt: "Consolidação de sistemas hidráulicos no Saara Central em regressão. Oásis tornam-se rotas de caravanas mercantis que comerciam sal e cobre purificado nativo entre o Sahel meridional e o Mediterrâneo.",
      en: "Consolidation of early desert oasis irrigation networks. Camel-free trade caravans distribute salt and copper between Central Sahara networks and early Nile valleys.",
      fr: "Les systèmes hydrauliques du Sahara Central s'adaptent. Début de routes caravanières locales reliant le cuivre sahélien local aux comptoirs méditerranéens.",
      es: "Organización de oasis de regadío en el Sáhara Central. Rutas de pastores y comerciantes conducen sal de roca, natrón y cobre nativo templado al norte del continente."
    },
    europeDetails: {
      pt: "Florescimento da Civilização Minoica em Creta (Palácio de Cnossos e escrita Linear A) e início da Civilização Micênica na Grécia continental. Idade do Bronze grega em auge estrutural.",
      en: "Peak of the Minoan Civilization in Crete (Palace of Knossos, Linear A script) and birth of the Mycenaean culture in Greece. High Aegean Bronze Age systems at play.",
      fr: "Essor de la civilisation minoenne en Crète (Palais de Cnossos, écriture linéaire A) et période mycénienne ancienne en Grèce continentale. Apogée de l'Âge du Bronze égéen.",
      es: "Apogeo de la cultura Minoica en Creta (Palacio de Cnosos, escritura Lineal A). Formación de las ciudadelas Micénicas en Grecia continental. Edad del Bronce clásica."
    },
    asiaDetails: {
      pt: "Dinastia Shang na China consolida a fundição avançada de bronze monumental e registra as primeiras inscrições reais em ossos oraculares. Na Índia, surgimento da literatura sacra do Rigveda (período védico).",
      en: "Shang Dynasty in China achieves master-level bronze smelting and records earliest written signs on oracle bones. In India, compilation of early Rigvedic sacred books begins.",
      fr: "La dynastie Shang règne en Chine avec une fonte de bronze ultra-raffinée de vases rituels et les premiers écrits sur os oraculaires. Début de la littérature védique sacrée en Inde.",
      es: "Dinastía Shang en China produce bronces rituales complejos con moldes de arcilla e inicia la escritura china en huesos oraculares. Introducción de los himnos del Rigveda en India."
    }
  },
  {
    year: -1000,
    label: { pt: "1000 AC", en: "1000 BC", fr: "1000 AEC", es: "1000 AC" },
    title: {
      pt: "Metalurgia Nok, Faraós Negros & Cartago",
      en: "Nok Iron, Black Pharaohs & Carthage",
      fr: "Sidérurgie Nok, Pharaons Noirs & Carthage",
      es: "Inicios de la Metalurgia Nok, Faraones Negros y Cartago"
    },
    africanDetails: {
      egypt_kemet: {
        pt: "Período de transição política. Faraós de Kemet fortalecem casamentos diplomáticos e comércio com a Fenícia e a Núbia. Em breve, a dinastia de Napata ascenderá ao trono unificado de Kemet.",
        en: "Political transition period. Egyptian pharaohs expand diplomatic alliances through marriage and trade with Phoenicians and Nubian lords.",
        fr: "Période de transition géopolitique à Kemet. Alliances diplomatiques serrées de commerce avec la Nubie et la Phénicie.",
        es: "Fase de transición dinástica. Los faraones intensifican el comercio de materias primas con el Levante fenicio y las dinastías de Nubia."
      },
      kush_meroe: {
        pt: "Auge da XXV Dinastia de Kemet (os Faraós Negros). Reis núbios baseados em Napata (como Piye, Shabaka e Taharqa) unificam todo o Vale do Nilo, erguendo pirâmides reais e restaurando templos religiosos.",
        en: "Rise of the Kushite XXV Dynasty of Egypt (the Black Pharaohs). Nubian kings from Napata (Piye, Shabaka, Taharqa) unify the entire Nile valley, rebuilding older temples and erecting royal pyramids.",
        fr: "Ascension de la 25e Dynastie (les Pharaons Noirs de Koush). Les rois nubiens de Napata (Piye, Shabaka, Taharqa) réunifient la vallée du Nil sous leur sceptre, bâtissant d'immenses nécropoles de pyramides.",
        es: "Ascenso de la dinastía XXV de Kemet (Faraones Negros de Kush). Los monarcas de Napata (Pié, Taharqa) reunifican militarmente el cauce del Nilo, restaurando templos en Karnak y erigiendo pirámides en Nuri."
      },
      carthage_empire: {
        pt: "Fundação de Cartago (814 AC) pela lendária princesa fenícia Elissa (Dido). A cidade cresce de forma explosiva, convertendo-se no efervescente empório comercial mercante do Mediterrâneo ocidental.",
        en: "Traditional founding of Carthage (814 BC) by the Phoenician Queen Elissa (Dido). The city grows exponentially, becoming the maritime and commercial hegemon of the western Mediterranean.",
        fr: "Fondation légendaire de Carthage (814 AEC) par la princesse tyrienne Élissa (Didon). La cité devient l'épicentre maritime et commercial dominant de toute la Méditerranée occidentale.",
        es: "Fundación mítica de Cartago (814 AC) por la reina fenicia Elisa (Dido). La ciudad florece de inmediato como puerto comercial y astillero naval autónomo dominante en el Mediterráneo."
      },
      nok_culture: {
        pt: "Início do florescimento escultórico em terracota e desenvolvimento independente de metalurgia do ferro no vale do rio Níger e Jos, Nigéria, através de inovadoras fornalhas siderúrgicas subterrâneas de tiragem natural.",
        en: "Early stages of Nok terracotta sculptures and independent iron smelting in central Nigeria. Development of direct reduction high-temperature furnaces without external influence.",
        fr: "Début des sculptures en terre cuite de style Nok et invention de la réduction du minerai de fer avec des bas fourneaux autonomes à tirage naturel dans la vallée de Jos (Nigeria).",
        es: "Primeras fundiciones de hierro en Nok (Nigeria) empleando hornos tradicionales subterráneos de flujo natural y consolidación de estilizadas esculturas antropomorfas de terracota."
      },
      numidia: {
        pt: "Federações nômades agrícolas Masiles e Masesiles organizam a governança berbere local no norte da África, negociando rotas mercantis de trigo nativo e cavalos com Cartago e colônias gregas.",
        en: "Agrarian Berber federations from Masyli and Masaesyli establish local protocols, initiating complex pastoral trade partnerships with Carthage and early Greeks.",
        fr: "Les fédérations berbères locales au nord de l'Afrique organisent l'élevage équin et la culture céréalière, posant les bases du royaume numide.",
        es: "Pastores agrícolas púnico-berberes confederan clanes familiares en Numidia. Abastecen cereales, cueros y caballos de combate al comercio mediterráneo de Cartago."
      }
    },
    fallbackRegionDetails: {
      horn_of_africa: {
        pt: "Reino de D'mt no norte da Etiópia unifica a agricultura hidráulica local com escrita monumental sabeia primitiva.",
        en: "Kingdom of D'mt in northern Ethiopia/Eritrea unifies highland agriculture and early South Arabian written inscriptions.",
        fr: "Royaume de D'mt en Éthiopie septentrionale unifie l'agriculture de montagne et utilise l'alphabet proto-guèze.",
        es: "Reino de D'mt en el norte de Etiopía y Eritrea implementa terrazas de irrigación y primeras inscripciones líbico-sabeas."
      }
    },
    generalAfricaDetails: {
      pt: "A tecnologia do ferro desenvolvida na África Central e Ocidental se espalha de forma vigorosa pelas rotas do Níger e Chade, acelerando as migrações dos povos agricultores de língua Bantu rumo ao sul.",
      en: "Iron technology natively refined in Central Africa spreads along the Niger-Congo valleys, facilitating the major Bantu migrations southwards.",
      fr: "La maîtrise du fer se répand à travers l'Afrique subsaharienne, accélérant les migrations complexes des peuples agriculteurs bantous vers la forêt équatoriale.",
      es: "La domesticación de la metalurgia siderúrgica autónoma se difunde en África Central y Occidental, dinamizando las migrações agrícolas africanas de lengua bantú."
    },
    europeDetails: {
      pt: "Fundação mítica de Roma (753 AC), ascensão do Período Arcaico na Grécia Antiga. Composição dos poemas homéricos (Ilíada e Odisseia). Transição para a Idade do Ferro na Europa continental.",
      en: "Traditional founding of Rome (753 BC) and emergence of Archaic Greece. Composition of Homer's epic poems (Iliad and Odyssey). Europe transitions fully to the Iron Age.",
      fr: "Fondation légendaire de Rome (753 AEC) et début de la Grèce Archaïque. Rédaction majeure des poèmes homériques. Transition totale de l'Europe vers l'Âge du Fer.",
      es: "Fundación mítica de Roma (753 AC) y surgimiento de las ciudades-estado de la Grecia Arcaica. Compilación homérica. Transición masiva europea a la Edad del Hierro."
    },
    asiaDetails: {
      pt: "Dinastia Zhou na China unifica o território sob o mandato do céu; consolidação de clássicos literários chineses. Na Índia, surgimento precoce dos primeiros códigos estaduais e canais fluviais do Ganges.",
      en: "Zhou Dynasty rules China under the concept of Mandate of Heaven. In India, massive state formation occurs in the Ganges plains alongside late Vedic compilations.",
      fr: "La dynastie Zhou domine la Chine par le concept du Mandat du Ciel. En Inde, début d'États administratifs (Mahajanapadas) le long du fleuve Gange.",
      es: "Dinastía Zhou en China unifica el norte del país mediante feudos agrícolas bajo la doctrina del Mandato del Cielo. Expansión agraria en los llanos del Ganges (India)."
    }
  },
  {
    year: -300,
    label: { pt: "300 AC", en: "300 BC", fr: "300 AEC", es: "300 AC" },
    title: {
      pt: "Metalurgia Meroítica, Aníbal Barca & Geometria egípcia",
      en: "Meroitic Smelting, Hannibal & Egyptian Geometry",
      fr: "Métallurgie de Méroé, Hannibal & Sciences à Alexandrie",
      es: "Fundición en Meroe, Campañas de Aníbal y Sabios de Kemet"
    },
    africanDetails: {
      egypt_kemet: {
        pt: "Período Ptolemaico. Kemet atrai pensadores do mundo inteiro para a Grande Biblioteca de Alexandria. Cientistas de Kemet e gregos colaboram no avanço da trigonometria, astronomia, geografia física e medicina anatomática.",
        en: "Ptolemaic Period. Egypt attracts scholars globally to the Library of Alexandria. Unprecedented developments in geometry, astronomy, physical geography, and advanced medicine at Alexandria's research labs.",
        fr: "Période Ptolémaïque. Kemet concentre les savants du monde entier à l'Université/Bibliothèque d'Alexandrie. Avancées décisives en géométrie Euclidienne, astronomie et médecine.",
        es: "Periodo helenístico. Kemet concentra intelectuales globales en la Gran Biblioteca de Alejandría. Los sabios del delta desarrollan la trigonometría, geografía matemática, óptica y medicina humana."
      },
      kush_meroe: {
        pt: "A capital de Cúsh é transferida para Méroé, consolidando-se como maior centro siderúrgico da África Antiga. Inventam a **Escrita Meroítica** (alfabética independente) e as rainhas soberanas guerreiras **Kandakes** lideram a defesa territorial, derrotando militarmente as tropas romanas de Augusto na Núbia.",
        en: "Kush capital moves to Meroe, which becomes the massive iron-production powerhouse of ancient Africa. Development of the unique **Meroitic Alphabet**. Mighty warrior female rulers called **Kandakes** defend sovereign boundaries, defeating Augustus Caesar's Roman armies.",
        fr: "Méroé devient la capitale royale et un géant industriel du fer en Afrique de l'Est. Invention de l'**Écriture Méroïtique**. Les souveraines militaires appelées **Kandakes** (ex. Amanirenas) défont les armées romaines d'Auguste César.",
        es: "Meroe florece como capital industrial de fundición de hierro a escala continental. Invención del sofisticado **Alfabeto Meroítico**. Su soberanía imperial es conducida por las reinas combatientes **Kandakes**, quienes derrotan en combate regular a las legiones romanas de César Augusto."
      },
      carthage_empire: {
        pt: "Apogeu das frotas de guerra cartaginesas no Mediterrâneo Central. O brilhante general Aníbal Barca cruza os Alpes com elefantes de combate em sua audaciosa ofensiva militar terrestre contra a República do Senado Romano.",
        en: "Peak of Carthagenian trade and military dominance. The brilliant general Hannibal Barca crosses the snowy Alps with battle elephants in his legendary campaign against Rome in the Punic Wars.",
        fr: "Apogée militaire de Carthage. Le général de génie Hannibal Barca franchit les Alpes enneigées avec des éléphants de guerre lors des Guerres Puniques contre la République romaine.",
        es: "Apogeo del poderío cartaginés. El estratega militar Aníbal Barca comanda la campaña de cruce de los Alpes con elefantes de combate, amenazando la existencia de la República Romana."
      },
      numidia: {
        pt: "Rei Masinissa unifica as tribos e funda o Reino Soberano da Numídia. Desenvolve sofisticadas cidades monumentais de pedra com arquivos em escrita líbico-berbere nacional e suntuosa arquitetura tumular.",
        en: "King Masinissa unifies Numidia under a sovereign state structure. Development of high-density stone cities using Libyan-Berber national script scripts and colossal step tombs like Medracen.",
        fr: "Le roi Masinissa unifie le Royaume Berbère souverain de Numidie. Développement de villes fortifiées monumentales en pierre, utilisation de l'alphabet libyco-berbère indigène.",
        es: "El monarca Masinisa unifica la confederación bereber, fundando el Reino de Numidia. Implementa un catastro agrario nacional, urbes amuralladas e inscripciones en escritura líbico-bereber."
      },
      nok_culture: {
        pt: "A produção de terracotas Nok atinge um auge expressivo estético com detalhes e penteados geométricos complexos. Os fornos agrícolas refinam ligas metálicas com cinzas de madeira duras locais.",
        en: "Nok artists achieve peak plastic expression in terracotas with sophisticated hairstyles and fine ornaments. Local iron smelting reaches full output in forest furnaces.",
        fr: "Les artistes de Nok atteignent un niveau plastique d'art extraordinaire avec des figurines de cheveux tressés géométriques. Haute production des fonderies locales.",
        es: "La cultura Nok alcanza su madurez artística. Produce estatuas hiperrealistas de terracota al vacío con peinados de alta costura, y forjas estables de cuchillas y hachas."
      }
    },
    fallbackRegionDetails: {
      west_africa: {
        pt: "Emergência de Djenné-Djenno (Mali), uma pioneira metrópole integrada sem reis ou hierarquias despóticas na curva fértil do rio Níger.",
        en: "Emergence of Djenné-Djenno in Mali, a rare egalitarian non-hierarchical urban trading metropolis on the inland Niger Delta.",
        fr: "Émergence de Djenné-Djenno au Mali, métropole urbaine pacifique florissante sans souveraineté coercitive.",
        es: "Formación de Djenné-Djenno (Mali), urbe comercial igualitaria pionera en el delta interior del río Níger."
      }
    },
    generalAfricaDetails: {
      pt: "Redes comerciais conectam o Saara, o Vale do Níger e as florestas tropicais da Guiné. Ocorre circulação de sal de rocha, grãos selecionados, gado domesticado e produtos derivados de ferro fundido.",
      en: "Vast networks connect Sahara, Niger valley, and Guinea forests. Smooth circulation of rock salt, sorted grains, and iron tools of local manufacture.",
      fr: "Des réseaux routiers et fluviaux intègrent le Sahara, le fleuve Niger et les forêts guinéennes pour le commerce des métaux.",
      es: "Rutas mercantiles estables vinculan el Sáhara, el río Níger y los litorales de Guinea mediante el trueque de salinas saharianas y herramientas de fragua."
    },
    europeDetails: {
      pt: "Período Clássico e de Transição Helenística na Grécia. Vida de filósofos como Sócrates, Platão e Aristóteles. Roma opera como República expansiva e trava guerras decisivas contra Cartago.",
      en: "Peak Classical Greece and Helenistic transition. Living years of Socrates, Plato, and Aristotle. Rome acts as an expanding Republic, entering deep life-or-death wars with Carthage.",
      fr: "Grèce classique et hellénistique. Vie de Socrate, Platon et Aristote. Rome se développe comme République conquérante et livre bataille contre Carthage.",
      es: "Grecia helenística e Imperio de Alejandro Magno. Filosofía griega clásica (Platón, Aristóteles). Roma emerge como República patricia beligerante en disputa con Cartago."
    },
    asiaDetails: {
      pt: "Unificação da China sob Qin Shi Huang (Dinastia Qin), que comanda a construção da Grande Muralha e do exército de terracota. Na Índia, o Imperador Ashoka governa o Império Máuria sob preceitos budistas.",
      en: "First unification of China under Emperor Qin Shi Huang, who orders the Great Wall construction and Terracotta Army. In India, Emperor Ashoka unifies Maurya Empire, engraving Buddhist peace edicts.",
      fr: "Unification de la Chine sous Qin Shi Huang (début de la Grande Muraille et armée de terre cuite). En Inde, l'empereur Ashoka unifie l'empire Maurya sous les valeurs de paix du Bouddhisme.",
      es: "Unificación de China bajo Qin Shi Huang (primer emperador Qin, inicio de la Gran Muralla). El emperador Ashoka el Grande unifica el Imperio Maurya (India), promulgando la no violencia budista."
    }
  },
  {
    year: 300,
    label: { pt: "300 DC", en: "300 AD", fr: "300 de n.è.", es: "300 DC" },
    title: {
      pt: "Era de Ouro de Aksum, Moedas de Ouro & Ge'ez",
      en: "Aksumite Golden Age, Gold Minting & Ge'ez",
      fr: "Apogée d'Axoum, Monnaie d'Or & Guèze",
      es: "Esplendor de Aksum, Acuñación de Oro y Escritura Ge'ez"
    },
    africanDetails: {
      egypt_kemet: {
        pt: "Província chave do Império Romano do Oriente. Importante polo agrícola de abastecimento de grãos da Europa. Sincretismo copta floresce e surgem os arquivos literários em pele de pergaminho de Nag Hammadi.",
        en: "Key province of Roman Empire, the breadbasket of Rome. Early Christian and Coptic traditions spread, with complex codex archives like Nag Hammadi library written on leather sheepskins.",
        fr: "Le grenier à blé de l'Empire Romain. Diffusion du christianisme copte primitif et essor des premiers textes de Nag Hammadi sur codex de parchemin.",
        es: "Provincia clave para el suministro de trigo del Imperio Romano. Difusión autónoma del cristianismo copto y manuscritos filosóficos en papiro de Nag Hammadi."
      },
      aksum_empire: {
        pt: "Apogeu mercantil de Aksum. Torna-se pioneiro a cunhar suas próprias moedas imperiais de ouro e prata com legendas em **Ge'ez** e Grego. Sob o Rei Ezana, adota formalmente o Cristianismo e ergue obeliscos colossais monobloco de granito decorado (*Stelae*).",
        en: "Aksumite Empire at peak financial prowess. First sub-Saharan state to mint its own gold, silver, and bronze coins with administrative texts in **Ge'ez** script. King Ezana adopts Christianity, erecting giant single-stone carved granite obelisks (Stelae).",
        fr: "Le géant financier d'Afrique de l'Est. Axoum est la seule puissance africaine à frapper sa propre monnaie impériale d'or et d'argent gravée en **Guèze**. Le Roi Ezana érige de colossaux obélisques de granit monolithe (Stèles d'Axoum).",
        es: "Esplendor mercantil de Aksum. Única superpotencia continental en acuñar soberanamente oro y plata de ley refinada con textos bilingües en griego y silabario **Ge'ez**. El emperador Ezana adopta el cristianismo medieval y erige monolitos de granito de 30 metros (*stelae*)."
      },
      kush_meroe: {
        pt: "A capital real Méroé vivencia suas últimas dinastias soberanas soberbas antes da reorganização náutica das caravanas pelo Mar Vermelho, mantendo as místicas câmaras mortuárias de argila intactas.",
        en: "Meroe enters its final dynasties. The capital preserves monumental Nubian mud brick structures until international trade redirection shifts toward Axoumite routes.",
        fr: "Méroé vit ses derniers siècles de souveraineté monumentale pâmée. Redistribution commerciale mondiale vers le port d'Adoulis d'Axoum.",
        es: "Meroe de Nubia transita por sus últimas dinastías imperiales, con importantes cámaras funerarias monumentales intactas antes de la dispersión comercial en favor del puerto de Adúlis."
      }
    },
    fallbackRegionDetails: {
      central_sahara: {
        pt: "Império dos Garamantes no Saara Central desenvolve complexos sistemas subterrâneos para irrigar o deserto ('foggara') e controla caravanas transarianas.",
        en: "Garamantian Empire in Sahara develops advanced underground water channels ('foggara') and rules cross-desert chariot routes.",
        fr: "Le Royaume des Garamantes au Sahara Central innove avec des galeries d'irrigation souterraines ('foggara') et maintient sa cavalerie de chars.",
        es: "Imperio de los Garamantas en el Sáhara Central diseña canales de irrigación subterráneos ('foggara') y comanda carros que cruzan el deserto."
      }
    },
    generalAfricaDetails: {
      pt: "Expansionismo econômico e territorial Bantu atinge as bacias dos rios Congo e Zambeze. Disseminação de forjas agrícolas agiliza o desmatamento pioneiro sustentável para pastagens agrárias permanentes.",
      en: "Bantu expansions reach deep into the Congo Basin and modern Zambia. Adoption of iron-tipped hoes accelerates forest clearing for stable, sustainable agriculture.",
      fr: "L'expansion linguistique Bantoue atteint le fleuve Congo. La métallurgie agraire de pointe facilite de grands défrichements viables pour le bétail et l'agriculture.",
      es: "La expansión cultural bantú alcanza los valles del río Congo y el Zambeze. La metalurgia agrícola (azadas y arados de reja) dinamiza el pastoreo y asentamientos permanentes."
    },
    europeDetails: {
      pt: "Pax Romana e posterior divisão do Império Romano por Constantino. Fundação de Constantinopla. Início das Migrações de tribos germânicas feudais rudimentares e crise institucional ocidental.",
      en: "Pax Romana and later division of the Roman Empire under Constantine. Founding of Constantinople. Large-scale migration period of early Germanic tribes across Western Europe.",
      fr: "Pax Romana et division ultime de l'Empire par l'empereur Constantin. Fondation de Constantinople. Début des migrations majeures de tribus germaniques.",
      es: "Pax Romana. El emperador Constantino el Grande traslada la capital a Constantinopla. Inicios de las oleadas migratorias de los pueblos germánicos medievales rudimentares."
    },
    asiaDetails: {
      pt: "Na Índia, florescimento do Império Gupta (a Era de Ouro científica e astronômica indiana): Aryabhata cria o conceito matemático do zero e calcula o ano solar. China é reunificada sob a Dinastia Jin.",
      en: "Gupta Empire ascends to power in India (Golden Age of Mathematics): Aryabhata compiles early treatises on astronomy, introducing the mathematical concept of zero. China unifies under Jin Dynasty.",
      fr: "En Inde, avènement de l'Empire Gupta (l'Âge d'Or de la science indienne) : invention mathématique fondamentale du zéro décimal. La Chine se réunifie sous la dynastie Jin.",
      es: "Imperio Gupta en India (era de oro científica y literaria): el matemático Aryabhata define la noción de cero y la rotación terrestre. China experimenta la fragmentación de los Jin y Tres Reinos."
    }
  },
  {
    year: 900,
    label: { pt: "900 DC", en: "900 AD", fr: "900 de n.è.", es: "900 DC" },
    title: {
      pt: "Império do Gana, Ouro transariano & Djenné",
      en: "Ghana Empire, Gold Trade & Djenné",
      fr: "Empire du Ghana, Commerce de l'Or & Djenné",
      es: "Imperio de Ghana, Monopolio del Oro y Djenné"
    },
    africanDetails: {
      mali_empire: {
        pt: "Ascensão apoteótica do **Império do Gana** (Wagadou - 'A Terra do Ouro'). O imperador controla as lendárias rotas comerciais transarianas cobrando tributos sobre o peso de ouro puro e sal importados.",
        en: "Mighty rise of the **Ghana Empire** (Wagadou, 'The Land of Gold'). The Sovereign rules cross-Saharan trade caravans, collecting rich custom duties from standard measures of pure gold dust and salt blocks.",
        fr: "Apogée fabuleux de l'**Empire du Ghana** (Wagadou, la Terre de l'Or). Le souverain contrôle le transit mondial de l'or pur extrait des mines du Bambouk, de l'or fin et du sel de mer.",
        es: "Auge imperial del **Reino de Ghana** (Wagadou, 'El País del Oro'). El rey de Ghana centraliza el mercado sahariano mediante pesas finas de bronce, cobrando impuestos al oro de aluvión y barras de sal gema."
      },
      kanem_bornu: {
        pt: "A dinastia Sefuwa assume a liderança militar e espiritual em Kanem ao redor do Lago Chade, criando rotas transarianas permanentes para a Líbia e o Egito com postos de segurança de cavalarias de elite.",
        en: "The Sefuwa Dynasty takes control in Kanem near Lake Chad, forming secure cross-desert trade checkpoints to Libya and Egypt with elite horse cavalry units.",
        fr: "La dynastie Sefuwa s'installe à Kanem autour du lac Tchad, ouvrant des voies de communication protégées vers l'Égypte et Tripoli grâce à des légions de cavalerie cuirassée.",
        es: "La dinastía Sefuwa asume el control en Kanem (lago Chad). Organiza una caballería blindada con arneses y espadas occidentales para patrullar y proteger las caravanas que van hacia Trípoli."
      },
      aksum_empire: {
        pt: "Comércio marítimo de Aksum entra em declínio devido à ascensão das frotas califais no Mar Vermelho. O Estado inicia uma transição agrária montanhosa rica para a dinastia cristã Zagwe.",
        en: "Axoumite oceanic ports decline as Islamic fleets take over Red Sea merchant sea lanes. Central power retreats to Ethiopian highlands, transitioning toward Zagwe rock architecture.",
        fr: "Le commerce portuaire d'Axoum diminue au profit des flottes islamiques de la mer Rouge. Le pouvoir central se déplace vers les montagnes, préparant l'architecture de Lalibela.",
        es: "Aksum pierde hegemonía naval en el mar Rojo. El centro imperial se traslada hacia el altiplano de Zagwe, donde labrarán iglesias de granito monolítico en Lalibela."
      }
    },
    fallbackRegionDetails: {
      nile_valley: {
        pt: "Os reinos cristãos núbios independentes de Makuria e Alodia assinam tratados bilaterais pacíficos estáveis com o Egito fatímida, conhecidos como Baqt.",
        en: "The independent Christian Nubian kingdoms of Makuria and Alodia hold secure bilateral peace treaties ('Baqt') with Fatimid Egypt.",
        fr: "Les royaumes nubiens chrétiens indépendants de Makourie et d'Alodie signent un pacte de paix bilatéral durable ('Baqt') avec l'Égypte.",
        es: "Los reinos cristianos de Nubia (Makuria y Alodia) firman el 'Baqt', acuerdo de no agresión y libre comercio agrícola con el Cairo fatimí."
      }
    },
    generalAfricaDetails: {
      pt: "Florescimento massivo das cidades portuárias mercantis da Costa Swahili (como Kilwa, Zanzibar e Lamu), estabelecendo intensas conexões náuticas diretas pelo Oceano Índico com a Índia e dinastias da China.",
      en: "Emergence of secure mercantile port cities on the East Swahili Coast (Kilwa, Zanzibar, Lamu), establishing maritime links across the Indian Ocean to India and Tang China.",
      fr: "Expansion spectaculaire des cités-États Swahili (Kilwa, Zanzibar, Lamu) sur la côte de l'Afrique de l'Est, liant l'océan Indien à la lointaine Chine.",
      es: "Emergen las ciudades mercantiles independientes de la cultura Suajili (Kilwa, Zanzíbar) en el Índico. Exportan marfil y oro fino a India y la dinastía lejana Tang."
    },
    europeDetails: {
      pt: "Plena Idade Média. Fragmentação do império Carolíngio e ascensão e consolidação das estruturas servis do feudalismo europeu. Monastérios isolam o escasso conhecimento clássico da Peste e instabilidade baronal.",
      en: "Early Middle Ages. Fragmentation of Charlemagne's Carolingian Empire and establishment of absolute feudal systems. Monasteries preserve books isolated from territorial counts' civil wars.",
      fr: "Haut Moyen-Âge. Fragmentation de l'Empire de Charlemagne et installation définitive du système féodal. Les monastères conservent de rares livres anciens.",
      es: "Plena Edad Media europea. Colapso del Imperio Carolingio y consolidación de la servidumbre feudal. Los monasterios son refugio del conocimiento antiguo ante asaltos vikingos."
    },
    asiaDetails: {
      pt: "Dinastias chinesas Tang e posterior Song inventam de forma independente a pólvora, a prensa de caracteres móveis de madeira e o papel-moeda. Auge intelectual do Califado Abássida em Bagdá (Casa da Sabedoria).",
      en: "Song Dynasty in China invents gunpowder, movable print blocks, and paper currency. In Baghdad, the Abbasid Golden Age peaks with the House of Wisdom translating world knowledge.",
      fr: "La dynastie Tang décline en faveur de la dynastie Song en Chine (inventions de la poudre, de l'imprimerie et du premier papier-monnaie). Bagdad brille par sa Maison de la Sagesse.",
      es: "China de las dinastía Tang e inicios de los Song inventa de forma independiente la pólvora bélica, bloques de imprenta y papel moneda de curso regulado. Edad de oro del Califato Abasí."
    }
  },
  {
    year: 1300,
    label: { pt: "1300 DC", en: "1300 AD", fr: "1300 de n.è.", es: "1300 DC" },
    title: {
      pt: "Zenite de Mansa Musa, Sankoré & Grande Zimbabwe",
      en: "Zenith of Mansa Musa & Great Zimbabwe",
      fr: "Apogée de Mansa Moussa & Grand Zimbabwe",
      es: "Apogeo del Imperio del Mali (Mansa Musa) y la Fortaleza Shona"
    },
    africanDetails: {
      mali_empire: {
        pt: "Apogeu absoluto do Império do Mali. O lendário soberano **Mansa Musa** realiza sua colossal peregrinação a Meca (1324) com milhares de assistentes e toneladas de ouro, atraindo sábios e matemáticos globais para as prestigiadas Universidades de Timbuktu (Sankoré).",
        en: "Zenith of the Mali Empire. The legendary **Mansa Musa** undertakes his major pilgrimage to Mecca (1324) with thousands of escorts and gold bullion, establishing Timbuktu (Sankore Mosque) as the premier center of astronomy, law, and literature.",
        fr: "Apogée de l'Empire du Mali. L'empereur **Mansa Moussa** réalise son pèlerinage monumental à La Mecque (1324) avec des tonnes d'or. Il fonde l'Université de Tombouctou (Mosquée de Sankoré) et recrute des architectes.",
        es: "Cénit del Imperio de Mali. El soberano **Mansa Musa** realiza su famosa peregrinación a La Meca (1324) distribuyendo toneladas de oro (incluido en el Atlas Catalán europeo como el hombre más rico del planeta). Las bibliotecas de Tombuctú archivan astronomía y derecho."
      },
      songhai_empire: {
        pt: "A herança militar e de comércio fluvial de Gao fortalece-se sob Sonni Ali, expandindo as rotas litorâneas e canais mercantis do rio Níger em paralelo ao Mali, preparando sua definitiva ascensão imperial.",
        en: "Gao expands its military power and river trade under Sonni Ali, preparing the Songhai administrative shift toward eventual hegemony over former Malian lands.",
        fr: "Gao développe ses remparts et ses canoës de combat fluviaux sous Sonni Ali, se positionnant pour former l'Empire Songhaï suite au retrait progressif du Mali.",
        es: "La dinastía del río Níger en Gao fortalece el comercio aluvial de grano, preparándose para la ascensión de Sonni Alí yAskia Muhammad como sucesor geopolítico de Mali."
      },
      great_zimbabwe: {
        pt: "Auge da civilização shona no **Grande Zimbabwe**. Edificação suntuosa do *Grande Recinto* sem argamassa, com muros curvilíneos perfeitos de granito esculpido de 11 metros de altura. Comércio direto de ouro e porcelana chinesa através do porto Swahili de Kilwa.",
        en: "Peak of Shona Civilization at **Great Zimbabwe**. Construction of the colossal *Great Enclosure* with mortarless dry-stone granite walls measuring 11 meters tall. Direct trade and gold export reaching India and China ports via Kilwa.",
        fr: "Sommet de la civilisation Shona du **Grand Zimbabwe**. Construction du *Grand Enclos* aux remparts spectaculaires de blocs granitiques réguliers posés sans mortier. Commerce maritime direct de l'or avec la Chine par Kilwa.",
        es: "Apogeo del **Gran Zimbabue** (Cultura Shona). Labranza de la imponente muralla elíptica o *Gran Recinto* en sillares de granito ajustados por gravedad sin argamassa. Exportan lingotes de oro grabados con el ave shona y compran porcelana Ming."
      },
      king_kongo: {
        pt: "Unificação política e confederada do Reino do Kongo sob o Manicongo Lukeni lua Nimi. Estabelece a grande capital M'banza Kongo e formaliza uma administração suntuosa baseada no uso de búzios (*nzimbu*) como moeda de Estado regulada.",
        en: "Political unification of the Kingdom of Kongo under the Manicongo Lukeni lua Nimi. Establishes the capital of M'banza Kongo and implements a centralized administration utilizing shells (*nzimbu*) as state-guaranteed currency.",
        fr: "Unification féodale du Royaume du Kongo sous le souverain Lukeni lua Nimi. Capitale érigée à M'banza Kongo et mise en place d'une monnaie nationale de coquillages (*nzimbu*).",
        es: "Consolidación de la confederación feudal del Reino del Kongo bajo el Manicongo Lukeni lua Nimi. Fija su capital de piedra y paja en M'banza Kongo y crea el sistema impositivo monetal basado en el búzio (*nzimbu*)."
      },
      kanem_bornu: {
        pt: "Império de Kanem atinge sua máxima expansão militar sob o Mai Dunama Dibbalemi, que adota a escrita administrativa avançada e patrocina consulados no norte do continente africano.",
        en: "Kanem reaches its territorial peak under Mai Dunama Dibbalemi, establishing permanent diplomatic schools in Cairo, Fez, and Tunis.",
        fr: "Kanem atteint sa plus grande expansion sous le souverain Dunama Dibbalemi, bâtissant des institutions d'ambassade permanentes au Caire et à Tunis.",
        es: "El Imperio de Kanem alcanza su cénit territorial bajo Mai Dunama Dibbalemi. Patrocina colegios becados en el Cairo fatimí para formar teólogos transaharianos."
      },
      ashanti_empire: {
        pt: "Federações de clãs Akan pioneiros estruturam técnicas agrícolas florestais e metalurgia requintada de latão e pesos de bronze para comércio de pó de ouro em pó na bacia do rio Volta.",
        en: "Early Akan forest clans form confederations, designing refined brass weights for gold dust measuring in regional forest markets.",
        fr: "Prémices de fédérations Akan en forêt de l'actuel Ghana occidentaux, inventant des poids géométriques en bronze de mesure précise de l'or.",
        es: "Focos Akan desarrollan pesos ceremoniales antropomorfos de bronce fundido a la cera perdida para transaccionar oro en polvo en la cuenca del Volta."
      }
    },
    fallbackRegionDetails: {
      west_africa: {
        pt: "As dinastias dos reinos iorubás em Ilé-Ifè produzem extraordinárias cabeças humanas realistas em bronze e latão por fundição a cera perdida.",
        en: "The Yoruba city-state of Ilé-Ifè casts world-famous realistic terracotta and brass human heads using sophisticated lost-wax methods.",
        fr: "Au Nigeria méridional, la cité ioruba d'Ife coule des têtes en bronze naturalistes de rois ('Oni') d'une perfection esthétique inédite.",
        es: "Las dinastías yorubas en Ilé-Ifè esculpen y funden rostros humanos hiperrealistas en bronce latonado de acabado impecable."
      }
    },
    generalAfricaDetails: {
      pt: "Redes comerciais Swahili dominam o Oceano Índico com frotas de navios dhows. Cidades de pedra como Kilwa Kisiwani cunham moedas de cobre próprias sob sultões independentes e erguem o Palácio de Husuni Kubwa.",
      en: "Swahili merchant dhows dominate Indian Ocean trade. Stone cities like Kilwa Kisiwani coin copper currency and build the architectural masterpiece Palace of Husuni Kubwa.",
      fr: "Le réseau Swahili domine l'océan Indien avec des navires à voile triangulaire ('dhows'). Les sultans de KilwaKisiwani frappent leur monnaie de cuivre et bâtissent le somptueux palais en corail Husuni Kubwa.",
      es: "Las dhows suajili dominan el mercado índico. El palacio monumental de coral Husuni Kubwa en Kilwa Kisiwani atestigua sultanes locales que acuñan cobre con versos coránicos."
    },
    europeDetails: {
      pt: "Baixa Idade Média. Eclosão da peste negra (que dizima um terço da população), auge do feudalismo ocidental, Inquisição institucionalizada, Guerra dos Cem Anos e início do Renascimento Florentino italiano.",
      en: "Late Middle Ages. Devastating Black Death pandemic decimates one-third of the European population. The Hundred Years' War and early Italian Renaissance in Florence.",
      fr: "Bas Moyen-Âge. Désastre de la Peste Noire (qui élimine un tiers des Européens), Guerres de Cent Ans, et tout premier essor du mouvement culturel de la Renaissance en Italie.",
      es: "Baja Edad Media. Devastadora Peste Negra diezma tercio de la población europea. Guerra de los Cien Años. Nacimiento del Humanismo renacentista de Dante y Petrarca."
    },
    asiaDetails: {
      pt: "Vastas invasões e estabelecimento da Pax Mongolica liderada por Gengis Khan unificando caminhos terrestres euro-asiáticos. A dinastia Ming na China assume o poder imperial e patrocina as expedições oceânicas do Almirante Zheng He.",
      en: "Abrupt rise of the Mongol Empire (Pax Mongolica) unrolling vast safe pathways across Asia. The Ming Dynasty takes power in China and funds Admiral Zheng He's colossal ocean fleets.",
      fr: "Conquêtes mongoles et Pax Mongolica ouvrant la voie à Marco Polo. En Chine, la dynastie Ming prend le dessus et lance les voyages océaniques de Zheng He.",
      es: "Formación del Imperio de Gengis Kan y Pax Mongólica. Tras la caída mongol, la Dinastía Ming en China financia las expediciones marítimas del almirante Zheng He."
    }
  }
];

export default function ParallelTimeline({
  language,
  selectedPoint,
  points,
  onSelectPoint
}: ParallelTimelineProps) {
  const t = translations[language];
  const [activePeriodIndex, setActivePeriodIndex] = useState<number>(3); // Default: 300 AC
  const activePeriod = parallelPeriods[activePeriodIndex];

  // Derive active empire or fallback
  const activeEmpireId = selectedPoint?.id || 'egypt_kemet';
  const displayPoint = points.find(p => p.id === activeEmpireId) || points.find(p => p.id === 'egypt_kemet') || points[0];

  const handlePeriodChange = (index: number) => {
    if (index >= 0 && index < parallelPeriods.length) {
      setActivePeriodIndex(index);
    }
  };

  // Check if active Empire has direct custom text for this period
  const hasDirectEmpireText = activePeriod.africanDetails[activeEmpireId] !== undefined;
  
  // Choose exact text for sovereign Africa column
  let africaColText = "";
  let tagRegion = "";
  
  if (hasDirectEmpireText) {
    africaColText = activePeriod.africanDetails[activeEmpireId][language];
    tagRegion = selectedPoint ? selectedPoint.name[language] : "Kemet / Egito";
  } else if (selectedPoint && activePeriod.fallbackRegionDetails[selectedPoint.region]) {
    africaColText = activePeriod.fallbackRegionDetails[selectedPoint.region][language];
    tagRegion = `${selectedPoint.name[language]} (${translations[language][selectedPoint.region] || selectedPoint.region})`;
  } else if (selectedPoint) {
    africaColText = activePeriod.generalAfricaDetails[language];
    tagRegion = `${selectedPoint.name[language]} [Contexto Regional Geral]`;
  } else {
    africaColText = activePeriod.africanDetails['egypt_kemet'][language];
    tagRegion = "Kemet / Egito";
  }

  // Handle auto-focusing on timelines if active point changes
  useEffect(() => {
    if (selectedPoint) {
      // Find matches for era/periods or keep current period
    }
  }, [selectedPoint]);

  const timelineTranslations = {
    pt: {
      selectEmpire: "Selecione o Império âncora",
      dragNotice: "Arraste a régua cronológica para espelhar simultaneamente o sincronismo internacional do século:",
      sovereignAfrica: "👑 ÁFRICA SOBERANA",
      europeCompared: "🛡️ EUROPA COMPARADA",
      asiaCompared: "🎋 ÁSIA COMPARADA",
      deconstructEuro: "💡 Impacto Pedagógico: Desconstruindo o Viés Eurocêntrico",
      deconstructNotice: "Este painel rompe o silenciamento historiográfico provando empiricamente que enquanto a Europa enfrentava guerras feudais ou transições, as superpotências africanas governavam rotas globais, refinavam fornos siderúrgicos automatizados e emitiam moedas de ouro pátrio.",
      era: "Época Histórica",
      contemporary: "Sincronicidade Universal",
      metadataLabel: "Sítio Ativo no Portal",
      noDirectData: "Este império não possuía registro nesta era; exibindo conexões da região:"
    },
    en: {
      selectEmpire: "Select Anchor Empire",
      dragNotice: "Drag the chronological ruler to simultaneously mirror global synchronicity across human history:",
      sovereignAfrica: "👑 SOVEREIGN AFRICA",
      europeCompared: "🛡️ COMPARED EUROPE",
      asiaCompared: "🎋 COMPARED ASIA",
      deconstructEuro: "💡 Pedagogical Impact: Deconstructing Eurocentric Bias",
      deconstructNotice: "This panel debunks the colonial myth of Africa as an isolated, isolated continent. It shows that while medieval Europe was fractioned into feudal fiefdoms, sovereign African nations minted international gold coins, produced steel in solar-blast furnaces, and mapped global shipping lanes.",
      era: "Historical Era",
      contemporary: "Universal Synchronicity",
      metadataLabel: "Active Map Site",
      noDirectData: "Direct records missing for this era; displaying regional context:"
    },
    fr: {
      selectEmpire: "Sélectionnez l'Empire d'ancrage",
      dragNotice: "Faites glisser la règle chronologique pour synchroniser l'histoire universelle au même siècle :",
      sovereignAfrica: "👑 AFRIQUE SOUVERAINE",
      europeCompared: "🛡️ EUROPE COMPARÉE",
      asiaCompared: "🎋 ASIE COMPARÉE",
      deconstructEuro: "💡 Impact Pédagogique : Déconstruire le biais eurocentrique",
      deconstructNotice: "Ce panneau déconstruit le mythe colonial d'une Afrique statique. Il prouve empiriquement que pendant que l'Europe subissait l'âge sombre, les pays d'Afrique fondaient leur argent, concevaient des obélisques monumentales en granit et maintenaient des universités ouvertes.",
      era: "Époque Historique",
      contemporary: "Synchronicité Universelle",
      metadataLabel: "Site Actif de la Carte",
      noDirectData: "Pas de mention directe pour cette ère; voir le contexte régional :"
    },
    es: {
      selectEmpire: "Seleccione el Imperio ancla",
      dragNotice: "Arrastre la regla cronológica para sincronizar la simultaneidad histórica en el mundo entero:",
      sovereignAfrica: "👑 ÁFRICA SOBERANA",
      europeCompared: "🛡️ EUROPA COMPARADA",
      asiaCompared: "🎋 ASIA COMPARADA",
      deconstructEuro: "💡 Impacto Pedagógico: Desarmando el Sesgo Eurocéntrico",
      deconstructNotice: "Este panel destruye de cuajo el prejuicio colonial de una África desconectada. Queda demostrado de manera científica que mientras la Europa feudal carecía de circulante monetal, los soberanos andinos de Aksum acuñaban lingotes de oro bilingües y Tombuctú lideraba cátedras de matemáticas.",
      era: "Época Histórica",
      contemporary: "Sincronicidad Universal",
      metadataLabel: "Sito Seleccionado",
      noDirectData: "Este reino carece de registro en esta era; mostrando contexto regional:"
    }
  };

  const tl = timelineTranslations[language] || timelineTranslations['en'];

  // Only consider points belonging to primary database to avoid polluting selectors
  const curatedPoints = points.filter(p => !p.id.startsWith('custom_'));

  return (
    <div id="parallel-chronology-section" className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5] p-5 flex flex-col gap-5 text-slate-800 shadow-sm">
      
      {/* Premium Sub-Header */}
      <div className="border-b border-[#e5dfd5]/85 pb-4">
        <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[#7a2c22] flex items-center gap-2">
          <ArrowRightLeft className="h-4.5 w-4.5 text-[#ea5d3c]" />
          {language === 'pt' ? 'Paralelismo Temporal Espelhado (Sincronismo Global)' : 'Temporal Parallelism (Global Synchronicity)'}
        </h3>
        <p className="text-[11px] text-[#5c544d] font-sans mt-1.5 leading-relaxed">
          {tl.dragNotice}
        </p>
      </div>

      {/* Controller: Selective dropdown for teachers */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-[#faf9f4] p-3 rounded.lg border border-[#ebdcc5]/40 items-center">
        <div className="flex items-center gap-2">
          <Info className="h-4 w-4 text-[#7a2c22] shrink-0" />
          <span className="text-[11px] text-[#5c544d] font-bold font-sans">
            {tl.metadataLabel}:
          </span>
          <span className="text-[11.5px] text-[#2c231e] font-serif font-bold bg-white px-2.5 py-1 border border-[#ebdcc5]/60 rounded-md">
            {tagRegion}
          </span>
        </div>
        
        {/* Dropdown switch to synchronize other realms */}
        <div className="flex items-center gap-2 sm:justify-end">
          <label htmlFor="anchor-realm-select" className="text-[10.5px] text-slate-500 font-mono font-bold whitespace-nowrap">
            {language === 'pt' ? 'MUDAR IMPÉRIO ÂNCORA:' : 'CHANGE ANCHOR REALM:'}
          </label>
          <select
            id="anchor-realm-select"
            value={activeEmpireId}
            onChange={(e) => {
              const matched = points.find(p => p.id === e.target.value);
              if (matched) onSelectPoint(matched);
            }}
            className="bg-white border border-[#ebdcc5] text-[#2c231e] text-[11px] rounded px-2.5 py-1.5 shadow-xs outline-none focus:border-[#7a2c22] cursor-pointer"
          >
            {curatedPoints.map(p => (
              <option key={`timereal-choice-${p.id}`} value={p.id}>
                {p.name[language]}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Interactive Slider Ruler Section */}
      <div id="chronology-ruler" className="bg-[#faf9f4] p-5.5 rounded-lg border border-[#ebdcc5]/45 flex flex-col gap-4 font-sans text-slate-900 shadow-inner">
        <div className="flex justify-between items-center text-xs font-mono font-bold text-[#7a2c22]">
          <span>3000 AC</span>
          <span className="text-sm bg-[#7a2c22] text-[#fcfbf7] px-3.5 py-0.5 rounded font-bold font-serif shadow-sm">
            {activePeriod.label[language]}
          </span>
          <span>1500 DC</span>
        </div>
        
        {/* Fine Chronology Draggable Rail */}
        <div className="relative my-2">
          <input
            id="timeline-cronology-slider"
            type="range"
            min="0"
            max={parallelPeriods.length - 1}
            step="1"
            value={activePeriodIndex}
            onChange={(e) => handlePeriodChange(parseInt(e.target.value))}
            className="w-full h-2.5 bg-[#e5dfd5] rounded-lg appearance-none cursor-ew-resize accent-[#7a2c22] focus:outline-none transition-all"
          />
          
          {/* Tic marks representing eras */}
          <div className="flex justify-between text-[8px] font-mono text-slate-500 mt-2 px-1">
            {parallelPeriods.map((p, idx) => (
              <button
                key={`ruler-tick-${idx}`}
                onClick={() => handlePeriodChange(idx)}
                className={`flex flex-col items-center gap-0.5 cursor-pointer focus:outline-none ${
                  idx === activePeriodIndex ? 'text-[#7a2c22] font-extrabold' : 'hover:text-[#7a2c22]'
                }`}
              >
                <span>|</span>
                <span>{p.label[language]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Era Banner */}
        <div className="bg-[#ebdcc5]/20 border-l-4 border-[#7a2c22] p-3 mt-1 rounded-r-md">
          <div className="text-[10px] font-bold text-[#7a2c22] tracking-wider uppercase font-mono">
            {tl.era}: {activePeriod.label[language]}
          </div>
          <div className="font-serif text-sm font-bold text-[#2c231e] mt-1 flex items-center gap-1.5">
            <Sparkles className="h-3.5 w-3.5 text-[#ea5d3c]" />
            {activePeriod.title[language]}
          </div>
        </div>
      </div>

      {/* THREE-COLUMN HORIZONTAL MIRROR PANEL (Feature 1 WoW Effect) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5 items-stretch">
        
        {/* Column A: Sovereign Africa (Teracota/Gold Canvas) */}
        <div
          id="comparative-col-africa"
          className="border border-[#ebdcc5] bg-gradient-to-b from-[#fcfaf2] to-[#f4ece1] rounded-lg p-4 flex flex-col gap-2.5 shadow-xs relative overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5"
        >
          {/* Visual glow indicator */}
          <div className="absolute top-0 left-0 w-full h-[3.5px] bg-[#ea5d3c]" />
          
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-[10.5px] font-mono font-bold text-[#ea5d3c] tracking-tight">
              {tl.sovereignAfrica}
            </span>
            <span className="text-[8px] bg-[#ea5d3c]/10 text-[#ea5d3c] px-1.5 py-0.5 rounded font-mono font-bold">
              {activePeriod.label[language]}
            </span>
          </div>

          <h4 className="font-serif text-[12px] font-bold text-[#7a2c22] leading-tight mt-0.5 border-b border-[#ebdcc5]/60 pb-1.5 flex items-center gap-1">
            <Landmark className="h-3.5 w-3.5 shrink-0" />
            {tagRegion}
          </h4>

          {/* Core Content containing highly refined description */}
          <div className="text-[11.5px] text-[#5c544d] leading-relaxed font-sans flex-1">
            {africaColText}
          </div>
        </div>

        {/* Column B: Europe compared (Indigo Deep Dark Canvas) */}
        <div
          id="comparative-col-europe"
          className="border border-slate-200 bg-gradient-to-b from-slate-50 to-[#edf1f8] rounded-lg p-4 flex flex-col gap-2.5 shadow-xs relative overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <div className="absolute top-0 left-0 w-full h-[3.5px] bg-[#425894]" />
          
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-[10.5px] font-mono font-bold text-[#324f8d] tracking-tight">
              {tl.europeCompared}
            </span>
            <span className="text-[8px] bg-[#324f8d]/10 text-[#324f8d] px-1.5 py-0.5 rounded font-mono font-bold">
              {activePeriod.label[language]}
            </span>
          </div>

          <h4 className="font-serif text-[12px] font-bold text-slate-800 leading-tight mt-0.5 border-b border-indigo-100 pb-1.5 flex items-center gap-1">
            <span>🛡️</span>
            {language === 'pt' ? 'Europa Contemporânea' : 'Contemporary Europe'}
          </h4>

          <div className="text-[11.5px] text-slate-600 leading-relaxed font-sans flex-1">
            {activePeriod.europeDetails[language]}
          </div>
        </div>

        {/* Column C: Asia compared (Scholarly Emerald Canvas) */}
        <div
          id="comparative-col-asia"
          className="border border-teal-100 bg-gradient-to-b from-[#f4faf8] to-[#e6f4f1] rounded-lg p-4 flex flex-col gap-2.5 shadow-xs relative overflow-hidden transition-all duration-300 transform hover:-translate-y-0.5"
        >
          <div className="absolute top-0 left-0 w-full h-[3.5px] bg-[#1a856f]" />
          
          <div className="flex items-center gap-1.5 justify-between">
            <span className="text-[10.5px] font-mono font-bold text-[#1a856f] tracking-tight">
              {tl.asiaCompared}
            </span>
            <span className="text-[8px] bg-[#1a856f]/10 text-[#1a856f] px-1.5 py-0.5 rounded font-mono font-bold">
              {activePeriod.label[language]}
            </span>
          </div>

          <h4 className="font-serif text-[12px] font-bold text-teal-900 leading-tight mt-0.5 border-b border-teal-100 pb-1.5 flex items-center gap-1">
            <span>🎋</span>
            {language === 'pt' ? 'Ásia e Oriente Médio' : 'Asia & Middle East'}
          </h4>

          <div className="text-[11.5px] text-[#2c534c] leading-relaxed font-sans flex-1">
            {activePeriod.asiaDetails[language]}
          </div>
        </div>

      </div>

      {/* Bottom pedagogical card reinforcing decolonial impact */}
      <div id="decolonial-pedagogical-banner" className="bg-[#eedfc1]/28 rounded-lg border border-[#ebdcc5]/70 p-4.5 flex gap-3 text-slate-800">
        <Scale className="h-6 w-6 text-[#7a2c22] shrink-0 mt-0.5" />
        <div className="font-sans">
          <h4 className="text-[11px] font-extrabold uppercase font-mono tracking-tight text-[#7a2c22]">
            {tl.deconstructEuro}
          </h4>
          <p className="text-[11px] text-[#5c544d] italic mt-1.5 leading-relaxed">
            {tl.deconstructNotice}
          </p>
        </div>
      </div>

    </div>
  );
}
