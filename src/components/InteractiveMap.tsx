import React, { useState, useEffect } from 'react';
import { HistoricalPoint, Language } from '../types';
import { translations } from '../utils/translations';
import { Calendar, MapPin, Globe, Compass, Landmark, ArrowRightLeft, Layers, Flame, Crown, Scroll, HelpCircle, Coins, Droplet } from 'lucide-react';
import { motion } from 'motion/react';
import * as d3 from 'd3';
import africaData from '../data/africa.json';

interface InteractiveMapProps {
  language: Language;
  points: HistoricalPoint[];
  selectedPointId: string | null;
  onSelectPoint: (point: HistoricalPoint) => void;
  activeEra: 'all' | 'pre_bronze' | 'antiquity' | 'classical_era';
  onChangeEra: (era: 'all' | 'pre_bronze' | 'antiquity' | 'classical_era') => void;
  activeRegion: 'all' | 'nile_valley' | 'horn_of_africa' | 'west_africa' | 'north_africa' | 'central_sahara' | 'custom';
  onChangeRegion: (region: 'all' | 'nile_valley' | 'horn_of_africa' | 'west_africa' | 'north_africa' | 'central_sahara' | 'custom') => void;
  datasetType: 'curated' | 'polaris';
  onChangeDatasetType: (type: 'curated' | 'polaris') => void;
}

// Converts percentage points (used heavily in polaris & curated points) into precise geographical longitude and latitude
export function getLonLat(x: number, y: number): [number, number] {
  // Linear scale equations calibrated using ground-truth alignments for Africa
  const lon = 0.97 * x - 27.4;
  const lat = -0.864 * y + 45.4;
  return [lon, lat];
}

// Mapping from main historical empire IDs to their associated modern country names for educational highlights
const empireCountryMapping: Record<string, string[]> = {
  'egypt_kemet': ['Egypt', 'Sudan'],
  'kush_meroe': ['Sudan', 'Egypt', 'South Sudan'],
  'aksum_empire': ['Ethiopia', 'Eritrea', 'Djibouti', 'Yemen'],
  'land_of_punt': ['Somalia', 'Djibouti', 'Eritrea'],
  'carthage_empire': ['Tunisia', 'Algeria', 'Libya'],
  'numidia': ['Algeria', 'Tunisia'],
  'mali_empire': ['Mali', 'Guinea', 'Senegal', 'Gambia', 'Mauritania'],
  'songhai_empire': ['Mali', 'Niger', 'Nigeria', 'Burkina Faso'],
  'great_zimbabwe': ['Zimbabwe', 'Mozambique', 'Botswana'],
  'kilwa_sultanate': ['Tanzania', 'Kenya', 'Mozambique'],
  'king_kongo': ['Democratic Republic of the Congo', 'Angola', 'Congo'],
  'ashanti_empire': ['Ghana', "Cote d'Ivoire", 'Togo'],
  'nok_culture': ['Nigeria', 'Cameroon'],
  'kanem_bornu': ['Chad', 'Niger', 'Nigeria', 'Cameroon']
};

const getPointAssociatedCountries = (p: HistoricalPoint): string[] => {
  if (empireCountryMapping[p.id]) {
    return empireCountryMapping[p.id];
  }
  // Fallbacks for Polaris id prefixes from dataset
  if (p.id.startsWith('eg_') || p.id.startsWith('nu_')) return ['Egypt', 'Sudan', 'South Sudan'];
  if (p.id.startsWith('et_')) return ['Ethiopia', 'Eritrea', 'Djibouti', 'Somalia'];
  if (p.id.startsWith('ml_')) return ['Mali', 'Guinea', 'Senegal', 'Mauritania'];
  if (p.id.startsWith('gh_')) return ['Ghana', "Cote d'Ivoire", 'Togo'];
  if (p.id.startsWith('zi_')) return ['Zimbabwe', 'Botswana', 'Mozambique', 'South Africa'];
  if (p.id.startsWith('ma_') || p.id.startsWith('dz_') || p.id.startsWith('tn_') || p.id.startsWith('mo_')) {
    return ['Morocco', 'Algeria', 'Tunisia', 'Western Sahara', 'Libya'];
  }
  return [];
};

export const pointMatchesOverlay = (point: HistoricalPoint, overlayId: string): boolean => {
  const pId = point.id.toLowerCase();
  const desc = JSON.stringify(point.description).toLowerCase();
  const name = JSON.stringify(point.name).toLowerCase();
  const languagesStr = point.seshatData?.languages ? JSON.stringify(point.seshatData.languages).toLowerCase() : "";
  const govStr = point.seshatData?.governmentType ? JSON.stringify(point.seshatData.governmentType).toLowerCase() : "";

  if (overlayId === 'metallurgy') {
    const ids = ['kush_meroe', 'nok_culture', 'great_zimbabwe', 'ashanti_empire', 'king_kongo', 'aksum_empire', 'songhai'];
    return ids.some(id => pId.includes(id)) || 
           desc.includes('metalurgia') || desc.includes('ferro') || desc.includes('mineração') || desc.includes('forja') ||
           desc.includes('metallurgy') || desc.includes('iron') || desc.includes('smelting') || desc.includes('bronze');
  }
  
  if (overlayId === 'matriarchy') {
    const ids = ['kush_meroe', 'egypt_kemet', 'ashanti_empire', 'land_of_punt'];
    return ids.some(id => pId.includes(id)) || 
           desc.includes('kandake') || desc.includes('rainha') || desc.includes('mãe') || desc.includes('queen') || desc.includes('matriarc') || desc.includes('matrilineal');
  }
  
  if (overlayId === 'writing_systems') {
    const ids = ['egypt_kemet', 'kush_meroe', 'aksum_empire', 'carthage_empire'];
    return ids.some(id => pId.includes(id)) || 
           desc.includes('escrita') || desc.includes('alfabeto') || desc.includes('ge\'ez') || desc.includes('script') || desc.includes('hieróg') || desc.includes('hierog') || desc.includes('meroít') || desc.includes('meroit') ||
           languagesStr.includes('escrita') || languagesStr.includes('script') || languagesStr.includes('hieroglyph') || languagesStr.includes('ge\'ez') || languagesStr.includes('alphabet');
  }

  if (overlayId === 'trade_currency') {
    const ids = ['mali_empire', 'ghana_empire', 'kilwa_sultanate', 'aksum_empire', 'carthage_empire', 'kanem_bornu', 'king_kongo', 'land_of_punt'];
    return ids.some(id => pId.includes(id)) ||
           desc.includes('moeda') || desc.includes('comércio') || desc.includes('comercio') || desc.includes('gold dust') ||
           desc.includes('caravana') || desc.includes('sal') || desc.includes('pó de ouro') || desc.includes('pó') ||
           desc.includes('coin') || desc.includes('mint') || desc.includes('weight') || desc.includes('peso') || desc.includes('trade') ||
           desc.includes('búzio') || desc.includes('nzimbu') || desc.includes('coquillage') || desc.includes('shell');
  }

  if (overlayId === 'monumental_architecture') {
    const ids = ['egypt_kemet', 'kush_meroe', 'great_zimbabwe', 'aksum_empire', 'numidia'];
    return ids.some(id => pId.includes(id)) ||
           desc.includes('architecture') || desc.includes('arquitetura') || desc.includes('stone') || desc.includes('pedra') ||
           desc.includes('muralha') || desc.includes('obelisco') || desc.includes('stelae') || desc.includes('pirâmide') ||
           desc.includes('pirâ') || desc.includes('pyramid') || desc.includes('templo') || desc.includes('temple') ||
           desc.includes('recinto') || desc.includes('enclosure') || desc.includes('monumental') || desc.includes('construção');
  }

  if (overlayId === 'hydraulic_agriculture') {
    const ids = ['egypt_kemet', 'kush_meroe', 'aksum_empire', 'central_sahara'];
    return ids.some(id => pId.includes(id)) ||
           desc.includes('irrigação') || desc.includes('irriga') || desc.includes('água') || desc.includes('agua') ||
           desc.includes('water') || desc.includes('canal') || desc.includes('hafirs') || desc.includes('foggara') ||
           desc.includes('represa') || desc.includes('eco') || desc.includes('terraço') || desc.includes('terracing') ||
           desc.includes('agricultura') || desc.includes('reservoir') || desc.includes('hidráulica') || desc.includes('hidráulico');
  }
  
  return false;
};

const matchCountry = (feature: any, countryNames: string[]) => {
  const p = feature.properties || {};
  const names = [
    p.NAME, p.name, p.NAME_LONG, p.ADMIN, p.SUBUNIT, p.ISO_A3, p.ADM0_A3
  ].filter(Boolean).map((s: any) => s.toString().toLowerCase());
  
  return countryNames.some(cName => 
    names.includes(cName.toLowerCase()) || 
    names.some((n: string) => n.includes(cName.toLowerCase()))
  );
};

const empireConfig: Record<string, {
  startYear: number;
  peakStartYear: number;
  peakEndYear: number;
  endYear: number;
  maxRadius: number;
  color: string;
}> = {
  egypt_kemet: {
    startYear: -3100,
    peakStartYear: -1500,
    peakEndYear: -1000,
    endYear: -30,
    maxRadius: 65,
    color: "#7a2c22"
  },
  kush_meroe: {
    startYear: -2500,
    peakStartYear: -750,
    peakEndYear: 350,
    endYear: 400,
    maxRadius: 52,
    color: "#8d3cbc"
  },
  aksum_empire: {
    startYear: -100,
    peakStartYear: 300,
    peakEndYear: 600,
    endYear: 940,
    maxRadius: 56,
    color: "#0f8a5f"
  },
  nok_culture: {
    startYear: -1500,
    peakStartYear: -500,
    peakEndYear: -200,
    endYear: 200,
    maxRadius: 48,
    color: "#ea5d3c"
  },
  carthage_empire: {
    startYear: -814,
    peakStartYear: -300,
    peakEndYear: -146,
    endYear: -146,
    maxRadius: 58,
    color: "#20898c"
  },
  land_of_punt: {
    startYear: -2500,
    peakStartYear: -1500,
    peakEndYear: -1000,
    endYear: -500,
    maxRadius: 42,
    color: "#0d9488"
  },
  mali_empire: {
    startYear: 1200,
    peakStartYear: 1300,
    peakEndYear: 1450,
    endYear: 1600,
    maxRadius: 75,
    color: "#d99c15"
  },
  songhai_empire: {
    startYear: 1350,
    peakStartYear: 1460,
    peakEndYear: 1591,
    endYear: 1650,
    maxRadius: 72,
    color: "#a35d37"
  },
  great_zimbabwe: {
    startYear: 1000,
    peakStartYear: 1200,
    peakEndYear: 1450,
    endYear: 1500,
    maxRadius: 46,
    color: "#a35d37"
  },
  kanem_bornu: {
    startYear: 700,
    peakStartYear: 1200,
    peakEndYear: 1600,
    endYear: 1800,
    maxRadius: 58,
    color: "#115e59"
  },
  ashanti_empire: {
    startYear: 1650,
    peakStartYear: 1700,
    peakEndYear: 1874,
    endYear: 1900,
    maxRadius: 48,
    color: "#cca115"
  },
  numidia: {
    startYear: -300,
    peakStartYear: -202,
    peakEndYear: -146,
    endYear: -46,
    maxRadius: 45,
    color: "#7c3aed"
  }
};

const parsePeriodToYears = (periodStr: string): { startYear: number; endYear: number } => {
  try {
    const parts = periodStr.split('-');
    if (parts.length < 2) return { startYear: 0, endYear: 0 };
    
    const parsePart = (part: string): number => {
      const clean = part.toUpperCase().trim();
      const numMatch = clean.match(/^([0-9.,\s]+)/);
      if (!numMatch) return 0;
      let num = parseInt(numMatch[1].replace(/[\s,.]/g, ''), 10);
      if (clean.includes('BC') || clean.includes('BCE') || clean.includes('AC') || clean.includes('AEC')) {
        num = -num;
      }
      return num;
    };

    let start = parsePart(parts[0]);
    let end = parsePart(parts[1]);
    
    if (start > end) {
      const temp = start;
      start = end;
      end = temp;
    }
    return { startYear: start, endYear: end };
  } catch (e) {
    return { startYear: 0, endYear: 0 };
  }
};

const getEmpireStrength = (p: HistoricalPoint, targetYear: number) => {
  let config = empireConfig[p.id];
  if (!config) {
    const parsed = parsePeriodToYears(p.period?.en || p.period?.pt || "");
    if (parsed.startYear === 0 && parsed.endYear === 0) return { strength: 0, r: 0, color: '#94a3b8' };
    
    const start = parsed.startYear;
    const end = parsed.endYear;
    const peakStart = start + (end - start) * 0.35;
    const peakEnd = start + (end - start) * 0.65;
    
    let color = '#7a2c22';
    if (p.era === 'antiquity') color = '#c5a880';
    if (p.era === 'classical_era') color = '#5f8774';
    
    config = {
      startYear: start,
      peakStartYear: peakStart,
      peakEndYear: peakEnd,
      endYear: end,
      maxRadius: 30,
      color: color
    };
  }

  const { startYear, peakStartYear, peakEndYear, endYear, maxRadius, color } = config;

  if (targetYear < startYear || targetYear > endYear) {
    return { strength: 0, r: 0, color };
  }

  let strength = 0;
  if (targetYear >= peakStartYear && targetYear <= peakEndYear) {
    strength = 1;
  } else if (targetYear >= startYear && targetYear < peakStartYear) {
    const range = peakStartYear - startYear;
    strength = range > 0 ? (targetYear - startYear) / range : 1;
  } else {
    const range = endYear - peakEndYear;
    strength = range > 0 ? (endYear - targetYear) / range : 1;
  }

  return {
    strength,
    r: maxRadius * (0.35 + 0.65 * strength),
    color
  };
};

interface CriticalEvent {
  year: number;
  ptTitle: string;
  enTitle: string;
  ptDesc: string;
  enDesc: string;
  pointId: string;
}

const CRITICAL_EVENTS: CriticalEvent[] = [
  {
    year: -3100,
    pointId: "egypt_kemet",
    enTitle: "Unification of Upper & Lower Egypt",
    ptTitle: "Unificação do Alto e Baixo Egito",
    enDesc: "Pharaoh Narmer unites Kemet, beginning the Dynastic Period and triggering monumental administration.",
    ptDesc: "Faraó Narmer unifica as terras do Nilo, iniciando o Período Dinástico e estimulando a administração monumental."
  },
  {
    year: -1500,
    pointId: "land_of_punt",
    enTitle: "Queen Hatshepsut's Expedition to Punt",
    ptTitle: "Expedição da Rainha Hatshepsut a Punt",
    enDesc: "Massive state maritime expedition returns with ebony, gold, and living myrrh trees to Kemet.",
    ptDesc: "Grande expedição marítima real retorna para o Egito carregada de ébano, ouro e mudas vivas de mirra."
  },
  {
    year: -500,
    pointId: "nok_culture",
    enTitle: "Taruga Iron Smelting Pioneer Era",
    ptTitle: "Era Pioneira da Metalurgia em Taruga",
    enDesc: "Nok blacksmiths pioneer advanced high-temperature iron smelting, transforming West African technology.",
    ptDesc: "Metalúrgicos Nok realizam fundição avançada de ferro em alta temperatura, revolucionando a tecnologia na África Ocidental."
  },
  {
    year: -202,
    pointId: "numidia",
    enTitle: "Massinissa Unifies Numidia",
    ptTitle: "Rei Masinissa unifica a Numídia",
    enDesc: "Following the Battle of Zama, Numidia consolidates into a sovereign agrarian and military power.",
    ptDesc: "Após a Batalha de Zama, Masinissa unifica as tribos númidas sob um reino soberano agrário e militar poderoso."
  },
  {
    year: -22,
    pointId: "kush_meroe",
    enTitle: "Kandake Amanirenas Resists Rome",
    ptTitle: "Resistência da Candace Amanirenas contra Roma",
    enDesc: "The warrior queen Candace Amanirenas leads Kushite forces, defeating Roman legions and negotiating peace.",
    ptDesc: "A rainha guerreira Candace de Meroé lidera tropas contra invasões, vence legiões romanas e sela termo de paz."
  },
  {
    year: 330,
    pointId: "aksum_empire",
    enTitle: "Ascension & Decrees of King Ezana",
    ptTitle: "Ascensão e Decretos do Rei Ézana",
    enDesc: "Aksum adopts Ge'ez state writing system and projects sovereignty over the Red Sea shipping channels.",
    ptDesc: "Axum formaliza a escrita Ge'ez em estelas de pedra monumentais e sela controle comercial do Mar Vermelho."
  },
  {
    year: 1235,
    pointId: "mali_empire",
    enTitle: "The Charter of Kouroukan Fouga",
    ptTitle: "A Carta de Kouroukan Fouga",
    enDesc: "Sundiata Keita unifies Mali and enacts one of the world's oldest constitutions, laying assembly rights.",
    ptDesc: "Sundaia Keita funda o Império do Mali e proclama uma das primeiras cartas de direitos humanos do mundo."
  },
  {
    year: 1324,
    pointId: "mali_empire",
    enTitle: "Mansa Musa's Imperial Pilgrimage",
    ptTitle: "A Peregrinação de Esplendor de Mansa Musa",
    enDesc: "Mansa Musa's journey to Mecca distributes so much gold that it alters the global economy for a decade.",
    ptDesc: "Viagem monumental de Mansa Musa a Meca distribui toneladas de ouro puro, impactando a economia global."
  },
  {
    year: 1350,
    pointId: "great_zimbabwe",
    enTitle: "Erection of the Great Enclosure",
    ptTitle: "Construção da Grande Muralha de Zimbábue",
    enDesc: "Cooperative granite masonry structures arise without mortar, symbolizing central power and metallurgy trade.",
    ptDesc: "Pedreiros erguem as colossais muralhas do Grande Recinto sem usar argamassa, demonstrando centralização e força."
  },
  {
    year: 1493,
    pointId: "songhai_empire",
    enTitle: "Askia Muhammad's Renaissance in Tombouctou",
    ptTitle: "Renascimento de Askia Muhammad em Tombuctu",
    enDesc: "Tombouctou reaches academic golden age, housing thousands of astronomy, law, and history manuscripts.",
    ptDesc: "Tombuctu chega ao auge do conhecimento com milhares de manuscritos árabes e africanos de ciência e direito."
  },
  {
    year: 1701,
    pointId: "ashanti_empire",
    enTitle: "The Descent of the Golden Stool",
    ptTitle: "A Descida do Trono de Ouro (Sika Dwa Kofi)",
    enDesc: "Osei Tutu unifies the Ashanti nation through the sacred Golden Stool, establishing democratic councils.",
    ptDesc: "Osei Tutu unifica os clãs Ashanti sob o Trono Sagrado de Ouro, instituindo conselhos soberanos de governo."
  }
];

export default function InteractiveMap({
  language,
  points,
  selectedPointId,
  onSelectPoint,
  activeEra,
  onChangeEra,
  activeRegion,
  onChangeRegion,
  datasetType,
  onChangeDatasetType
}: InteractiveMapProps) {
  const t = translations[language];
  const [hoveredPointId, setHoveredPointId] = useState<string | null>(null);
  
  const [activeOverlays, setActiveOverlays] = useState<string[]>([]);
  const [selectedOverlayEntity, setSelectedOverlayEntity] = useState<{
    type: 'road' | 'courier' | 'metallurgy' | 'matriarchy' | 'writing' | 'trade_currency' | 'architecture' | 'hydraulic_agriculture';
    name: string;
    from?: string;
    to?: string;
    title: string;
    details: string;
    evidence: string;
  } | null>(null);

  // Timelapse Timeline playhead state
  const [timelineYear, setTimelineYear] = useState<number>(-1000);
  const [isTimelinePlaying, setIsTimelinePlaying] = useState<boolean>(false);
  const [viewFluidAreas, setViewFluidAreas] = useState<boolean>(true);
  const [timelapseMode, setTimelapseMode] = useState<'concentric' | 'voronoi' | 'standard'>('concentric');
  const [enableConduciveFlows, setEnableConduciveFlows] = useState<boolean>(true);
  const [enableCriticalRipples, setEnableCriticalRipples] = useState<boolean>(true);
  const [autoPauseOnMilestones, setAutoPauseOnMilestones] = useState<boolean>(true);
  const [lastPausedEventKey, setLastPausedEventKey] = useState<string | null>(null);

  // Playback Loop Effect
  useEffect(() => {
    let timerID: any = null;
    if (isTimelinePlaying) {
      timerID = setInterval(() => {
        setTimelineYear((year) => {
          if (year >= 1800) return -3000;
          return year + 50;
        });
      }, 350);
    }
    return () => {
      if (timerID) clearInterval(timerID);
    };
  }, [isTimelinePlaying]);

  // Handle auto-pausing when hitting a critical milestone for proper reading pacing
  useEffect(() => {
    if (isTimelinePlaying && autoPauseOnMilestones && enableCriticalRipples) {
      // Find active event for the current year (window of 250 years)
      const activeEv = CRITICAL_EVENTS.find(ev => timelineYear >= ev.year && timelineYear <= ev.year + 250);
      if (activeEv) {
        const eventKey = `${activeEv.pointId}-${activeEv.year}`;
        if (eventKey !== lastPausedEventKey) {
          setIsTimelinePlaying(false);
          setLastPausedEventKey(eventKey);
        }
      }
    }
  }, [timelineYear, isTimelinePlaying, autoPauseOnMilestones, enableCriticalRipples, lastPausedEventKey]);

  const handleRoadClick = (road: any) => {
    const n = road.name;
    let titlePT = n;
    let titleEN = n;
    let detailsPT = "";
    let detailsEN = "";
    let evidencePT = "";
    let evidenceEN = "";

    if (n === 'Nile Paved Quarry Highway') {
      titlePT = "Estrada Pavimentada Imperial de Moeris (Nilo)";
      titleEN = "Lake Moeris Imperial Paved Road (Nile Valley)";
      detailsPT = "A famosa estrada de pedreira pavimentada do Lago Moeris em Kemet (Egito antigo). Construída com lajes de arenito e basalto para transportar blocos gigantes de pedra de pedreiras distantes até o vale do Nilo.";
      detailsEN = "The world-famous paved quarry road of Lake Moeris in Kemet (Ancient Egypt). Configured with sandstone and basalt slabs to roll colossal quarry blocks from distant hills down to the Nile Valley.";
      evidencePT = "Consenso Arqueológico: Considerada a estrada de superfície pavimentada com material sólido mais antiga preservada do mundo (c. 2600 a.C.), provando o domínio milenar de infraestrutura física.";
      evidenceEN = "Archaeological consensus: Recognized as the oldest preserved hard-surface paved transport road in human history (c. 2600 BCE), demonstrating mastery of physical civil infrastructure layout.";
    } else if (n === 'Nubian-Axumite Processional Way') {
      titlePT = "Via Processional e Estrada Núbia-Axumita";
      titleEN = "Nubian-Axumite Royal Processional Way";
      detailsPT = "Via processional e cerimonial pavimentada ligando os reinos núbios de Cuxe (Méroe) às rotas de comércio integradas ao sul e norte do Nilo.";
      detailsEN = "Ceremonial paved highway linking the Nubian kingdoms of Kush (Meroë) into regional routes feeding southern highlands and northern trade segments.";
      evidencePT = "Consenso Arqueológico: Sítios como Naqa e Méroe exibem vias processionais com pavimentação de pedras trabalhadas e ladeadas por estátuas memoriais em arenito.";
      evidenceEN = "Consensus: Archaeological sites of Naqa and Meroë feature paved stone processional causeways bounded by state monuments and sandstones.";
    } else if (n === 'Adulis-Aksum paved highway') {
      titlePT = "Rodovia Pavimentada de Adulis a Axum";
      titleEN = "Adulis-to-Aksum Paved Trading Highway";
      detailsPT = "A grande rodoviária comercial de pedras de Axum, conectando a metrópole imperial nas montanhas diretamente ao movimentado porto de Adulis no Mar Vermelho.";
      detailsEN = "The major stone-paved highland transport highway of the elite Aksumite Empire, linking the mountain capital metropolis with the busy seaport of Adulis.";
      evidencePT = "Evidência Historiográfica: Crônicas gregas e romanas anticíclicas atestam uma rota comercial de pedra ligando as altitudes axumitas ao porto de Adulis para exportação de marfim, ouro e mirra.";
      evidenceEN = "Epigraphy: High-elevation stone pavement remains and Roman trade journals substantiate a heavily utilized road connecting Adulis harbors with royal Aksum.";
    } else if (n === 'Carthaginian paved inter-city highway') {
      titlePT = "Estrada Pavimentada Interurbana Púnica";
      titleEN = "Carthaginian Inter-City Paved Road System";
      detailsPT = "Rede de estradas pavimentadas de Cartago conectando a cidade-estado às ricas terras agrícolas líbias rurais e postos de controle da Numídia.";
      detailsEN = "Strategic hard-surfaced road network connecting Carthage to Libyan agricultural hinterlands and crucial Numidian border cavalry structures.";
      evidencePT = "Consenso Arqueológico: Autores clássicos confirmam que engenheiros cartagineses pavimentavam suas estradas com cascalhos e argila bem antes da expansão das famosas vias romanas de pedra.";
      evidenceEN = "Consensus: Classical accounts report Carthaginian engineers pioneered the paving of urban highways using complex gravel layers long before Roman road expansion.";
    } else if (n === 'Sahelian Stone Paved Royal Corridor') {
      titlePT = "Corredor Real Pavimentado do Sahel";
      titleEN = "Sahelian paved Royal Transport Corridor";
      detailsPT = "Trechos imperiais de rotas comerciais pavimentadas ligando os distritos do Mali medieval e Songai, vigiados por guarnições especiais contra saques de caravanas de ouro.";
      detailsEN = "Imperial paved segments along trans-Saharan trading avenues linking standard Gao and Timbuktu cities, fully secured by horse troopers.";
      evidencePT = "Consenso Arqueológico: Registros de juristas e viajantes (como Ibn Battuta e Ibn Khaldun) descrevem excelentes estradas com pavimentação em passagens lamacentas do rio Níger e bacias férteis.";
      evidenceEN = "Consensus: Medieval records by Ibn Battuta and Al-Bakri detail paved river crossings and meticulously maintained imperial horse paths.";
    } else if (n === 'Great Zimbabwe stone-paved causeways') {
      titlePT = "Calçadas de Pedra do Grande Zimbábue";
      titleEN = "Great Zimbabwe Granite Paved Causeways";
      detailsPT = "Caminhos e rampas pavimentadas com blocos de granito plano empilhados sem argamassa. Conduziam os nobres Shona das minas de ouro locais até os portões do Grande Recinto.";
      detailsEN = "Granite-paved pathways and transition ramps constructed without mortar, guiding Shona trade elites from gold mines towards the massive granite fortress towers.";
      evidencePT = "Consenso Arqueológico: Escavações no Grande Recinto revelaram caminhos processionais pavimentados com blocos planos ornamentados, projetados para expressar a soberania e guiar águas pluviais.";
      evidenceEN = "Archaeology: Paved stone pathways and gutters discovered inside the Great Enclosure served to guide noble pedestrian queues and divert seasonal flash rainfall.";
    }

    setSelectedOverlayEntity({
      type: 'road',
      name: n,
      from: road.from,
      to: road.to,
      title: language === 'pt' ? titlePT : titleEN,
      details: language === 'pt' ? detailsPT : detailsEN,
      evidence: language === 'pt' ? evidencePT : evidenceEN
    });
  };

  const handleCourierClick = (courier: any) => {
    const f = courier.from;
    const t = courier.to;
    let titlePT = "";
    let titleEN = "";
    let detailsPT = "";
    let detailsEN = "";
    let evidencePT = "";
    let evidenceEN = "";

    if (f === 'egypt_kemet' && t === 'kush_meroe') {
      titlePT = "Correios Nilóticos de Kemet e Kush";
      titleEN = "Nile River Valley Imperial Postal System";
      detailsPT = "Rede de mensageiros fluviais operando canoas velozes nas cataratas integrada a jinetes montados nas margens do deserto do Nilo.";
      detailsEN = "High-intensity Nile river-courier and shore-messenger grid transmitting state directives between Egypt's capital and Nubian desert garrisons.";
      evidencePT = "Consenso Arqueológico: Papiros administrativos e cartas oficiais detalham uma rede postal imperial que fazia despachos de relatórios diários de nível das águas do Nilo e de tributos.";
      evidenceEN = "Consensus: Royal letters and Papyrus records detail a fully established riverine dispatch network tracking Nile height logs and military alarms.";
    } else if (f === 'mali_empire' && t === 'songhai_empire') {
      titlePT = "Correio Imperial de Jinetes de Mali e Songhai";
      titleEN = "Mansa-Askia Royal Horse Relay System";
      detailsPT = "O sistema de batedores e mensageiros a cavalo de alta velocidade que viajavam entre postos imperiais de postagem seguros para transmitir decretos e orçamentos comerciais.";
      detailsEN = "Fast-paced horseback courier relay grid operated across Sahelian routes allowing messengers to cover massive distances with royal security guarantees.";
      evidencePT = "Evidência Historiográfica: O Tarikh al-Sudan registra que despachos estatais de segurança podiam percorrer centenas de quilômetros de Gao e Timbuktu em poucos dias através de relevos rápidos.";
      evidenceEN = "Medieval Consensus: Tarikh al-Sudan documents rapid communication systems where official imperial horse troopers could travel vast distances in under 48 hours.";
    } else if (f === 'songhai_empire' && t === 'kanem_bornu') {
      titlePT = "Mensageiros Fluviais do Níger e Bacia do Chade";
      titleEN = "Niger & Chad Waterway Messengers";
      detailsPT = "Canoas oficiais rápidas guarnecidas por guerreiros e arqueiros estatais que patrulhavam canais de água e lagoas para entregar decretos comerciais entre os reinos.";
      detailsEN = "Official light canoes operated by state archers patrolling natural waterways and delta basins to carry commercial cargo audits and emergency alerts.";
      evidencePT = "Evidência Historiográfica: O cronista Leo Africanus relata frotas armadas de centenas de canoas oficiais que garantiam que despachos comerciais chegassem em segurança sobre as bacias de água.";
      evidenceEN = "Primary Records: Ibn Battuta and Leo Africanus document organized military-escorted fleets transporting official administrative correspondence.";
    } else if (f === 'king_kongo' && t === 'nok_culture') {
      titlePT = "Corredores Célere Pedestres 'Nambas' do Kongo";
      titleEN = "'Nambas' Sovereign Foot Sprintfleet (Kongo)";
      detailsPT = "Incrível sistema de corredores pedestres profissionais velozes que viajavam descalços por trilhas preparadas na selva carregando mnemônicas contábeis e conchas místicas.";
      detailsEN = "Remarkable foot runner network of athletic couriers sprinting barefoot along cleared public routes to transport voice bulletins and 'nzimbu' shells.";
      evidencePT = "Tradição e Registros: Relatos históricos de capuchinhos e tradição oral registram a corporação dos Nambas, batedores reais que corriam em revezamento cobrindo imensas distâncias das províncias ao soberano.";
      evidenceEN = "Primary Documents: European and oral archives substantiate the athletic guild of royal runners executing long-distance messenger routes with extreme reliability.";
    } else if (f === 'great_zimbabwe' && t === 'kilwa_sultanate') {
      titlePT = "Mensageiros Shona do Oceano Índico";
      titleEN = "Shona-Kilwa Coastal Relay Scribes";
      detailsPT = "Revezamentos de corredores Shona que ligavam as altitudes fortificadas de granito às docas de comércio internacional do Sultanato de Kilwa na costa.";
      detailsEN = "Elite Shona relay networks carrying state notices between the Great Zimbabwe stone complex and the maritime trade docks of Kilwa Sultanate.";
      evidencePT = "Consenso Arqueológico: Evidências de moedas de ouro de Kilwa e porcelana da Dinastia Song da China no Zimbábue provam uma rota coordenada de comércio e despachos rápidos.";
      evidenceEN = "Consensus: Coins and precious maritime luxury objects inside Great Zimbabwe verify high-grade communications between mountain chiefs and Kilwa docks.";
    }

    setSelectedOverlayEntity({
      type: 'courier',
      name: `${f}-to-${t}`,
      from: f,
      to: t,
      title: language === 'pt' ? titlePT : titleEN,
      details: language === 'pt' ? detailsPT : detailsEN,
      evidence: language === 'pt' ? evidencePT : evidenceEN
    });
  };

  const overlayLabels = {
    pt: {
      title: "🌍 Overlays Temáticos Integrados (Ativar Múltiplos Filtros)",
      metallurgy: "🔥 Metalurgia Siderúrgica de Alta Temp.",
      matriarchy: "👑 Soberanas & Sociedades Matrilineares",
      writing: "📜 Sistemas de Escrita e Arquivos Nacionais",
      trade_currency: "🪙 Rotas Comerciais & Cunhagem Soberana",
      architecture: "🧱 Arquitetura Monumental de Pedra",
      hydraulic_agriculture: "💧 Engenharia Hidráulica & Oásis Sustentáveis",
      paved_roads: "🛣️ Estradas Pavimentadas & Infraestrutura",
      state_couriers: "📮 Correio Imperial & Mensageiros Estatais",
      metallurgyDesc: "A ciência metalúrgica e pioneirismo siderúrgico avançado (ex: fornos de tiragem natural em Méroe e Nok, metalurgia complexa em Mapungubwe/Mali).",
      matriarchyDesc: "A incontestável agência política e militar feminina e linhagens de poder matrilineares nas decisões estatais (ex: as líderes Kandakes de Cuxe, Rainhas-Mães de Ashanti).",
      writingDesc: "Sistemas originais de escrita, registros burocráticos e arquivos dinásticos (ex: Hieróglifos de Kemet, escrita Meroítica na Núbia, silabario Ge'ez de Aksum).",
      trade_currencyDesc: "Impérios mercantes globais que cunhavam sua própria moeda metálica régia ou instituíam câmbio padronizado com pesos de ouro calibrados (ex: moedas de ouro de Aksum e Kilwa, pó de ouro e conchas nzimbu no Kongo).",
      architectureDesc: "Monumentos colossais esculpidos em blocos monolíticos ou muralhas erguidas sem argamassa com encaixe físico perfeito (ex: as Stelae gigantes de Aksum, as pirâmides de topo plano de Méroe, o Grande Recinto de pedra do Zimbabue).",
      hydraulic_agricultureDesc: "Sistemas tecnológicos avançados para a canalização de água no deserto e terraceamento agrícola nas colinas (ex: canais de irrigação de Kemet, reservatórios circulares 'hafirs' de Cuxe, galerias subterrâneas de água 'foggara' dos Garamantes, terraços em degraus de Aksum).",
      paved_roadsDesc: "Tecnologia pioneira de pavimentação de vias e infraestrutura viária sólida (ex: a famosa estrada pavimentada de pedreiras de Moeris em Kemet, estradas de pedra em Cartago, calçadas nobres em Méroe e vias pavimentadas ligando Aksum a Adulis).",
      state_couriersDesc: "Rede estatal e corporativa de mensageiros profissionais rápidos, postos de muda de montaria, barqueiros fluviais e corredores pedestres oficiais (ex: correios do Nilo em Kemet, mensageiros a cavalo em Mali-Songai, e corredores oficiais 'Nambas' no Kongo)."
    },
    en: {
      title: "🌍 Integrated Thematic Overlays (Activate Multiple Filters)",
      metallurgy: "🔥 High-Temp Smelting & Metallurgy",
      matriarchy: "👑 Queens & Matrilineal Alliances",
      writing: "📜 Sovereign Writing & Archival Systems",
      trade_currency: "🪙 Global Trade Routes & Coinage",
      architecture: "🧱 Monumental Mortarless Architecture",
      hydraulic_agriculture: "💧 Hydraulic Engineering & Sustainable Oasis",
      paved_roads: "🛣️ Paved Roads & Infrastructure",
      state_couriers: "📮 Imperial Post & State Messengers",
      metallurgyDesc: "Advanced metallurgy and foundational smelting sciences (e.g., direct-reduction high-temp iron in Meroe and Nok, precious gold casting in Mapungubwe/Mali).",
      matriarchyDesc: "Polito-military female ruler frameworks and royal matrilineal power distribution (e.g., Kushite warrior Kandakes, Ashanti sovereign Queen Mothers).",
      writingDesc: "Native writing inventions, state accounting, and dynastic administrative code (e.g., Egyptian Hieroglyphs, Meroitic script of Nubia, Ge'ez syllabary of Aksum).",
      trade_currencyDesc: "Intercontinental mercantile networks that minted sovereign gold/silver coinage or organized calibrated standard weights (e.g., gold coins of Aksum and Kilwa, Ashanti weights, Kongo's nzimbu Shell reserves).",
      architectureDesc: "Colossal structures carved directly into natural rock or massive stone walls laid perfectly without mortar (e.g., giant single-stone Stelae of Aksum, flat-topped pyramids of Meroe, the mortafree Great Enclosure of Zimbabwe).",
      hydraulic_agricultureDesc: "Advanced hydrology to cultivate extreme desert terrains and sustain large-scale agricultural outputs (e.g., Nile dynastic basins, Kushite custom circular reservoirs 'hafirs', underground water aqueducts 'foggara' of Garamantes, Axumite agricultural step terracing).",
      paved_roadsDesc: "Pioneering highway paving systems and robust transit networks (e.g., Lake Moeris paved quarry road in Kemet, Carthage stone paving streets, ceremonial ways of Meroe, and the paved commercial transport routes linking Aksum with Adulis).",
      state_couriersDesc: "Sovereign postal systems and active royal messengers running or riding along organized post-relay routes (e.g., Nilotic state carriers in Kemet, heralds on swift horses in Mali and Songhai, professional tribal sprinters 'Nambas' in Kongo)."
    },
    fr: {
      title: "🌍 Overlays Thématiques Cumulatifs (Filtres Multiples)",
      metallurgy: "🔥 Sidérurgie & Métallurgie Haute Température",
      matriarchy: "👑 Reines & Alliances Matrilinéaires",
      writing: "📜 Systèmes de Documentations Intégrés",
      trade_currency: "🪙 Commerce Transaharien & Monnaies d'Or",
      architecture: "🧱 Architecture Monumentale sans Mortier",
      hydraulic_agriculture: "💧 Génie Hydraulique & Oasis",
      paved_roads: "🛣️ Routes Pavées & Infrastructures",
      state_couriers: "📮 Poste Royale & Messagers de l'État",
      metallurgyDesc: "La maîtrise du feu et la réduction indépendante des métaux (ex: hauts-fourneaux de Méroé et Nok, l'or raffiné de Mapungubwe).",
      matriarchyDesc: "Le pouvoir politique et militaire exceptionnel joué par les femmes de souveraineté directe (ex: Kandakes de Koush, Reines d'Ashanti).",
      writingDesc: "Inventions locales de graphies et tenue d'archives stables (ex: hiéroglyphes de Kemet, écriture Méroïtique, alphabet Guèze d'Axoum).",
      trade_currencyDesc: "Réseaux intercontinentaux frappant leur propre monnaie souveraine ou utilisant des poids d'or et nzimbu étalonnés (ex: or d'Axoum, d'Afrique de l'Est Kilwa).",
      architectureDesc: "Bâtiments colossaux levés de terre en pierres sèches ajustées sans mortier (ex: le Grand Enclos du Zimbabwe, obélisques d'Axoum).",
      hydraulic_agricultureDesc: "Savoir-faire hydrologiques majeurs pour nourrir des populations denses (ex: canaux de Kemet, réservoirs hafirs de Koush, foggara des Garamantes).",
      paved_roadsDesc: "Ingénierie pionnière des voiries dures et réseaux d'accès renforcés (ex: route de gravier pavée du lac Moeris à Kemet, chaussées dallées à Carthage et Méroé, route commerciale pavée pavée d'Axoum à Adulis).",
      state_couriersDesc: "Réseaux de correspondance royale rapide par des coureurs ou cavaliers reliés par des relais organisés (ex: postes nilotiques de Kemet, messagers équestres du Mali et de Songhaï, sprinteurs officiels 'Nambas' du Kongo)."
    },
    es: {
      title: "🌍 Overlays Temáticos Acumulativos (Modo Multifiltro)",
      metallurgy: "🔥 Metalurgia y Siderurgia de Alta Temp.",
      matriarchy: "👑 Soberanas y Alianzas Matrilineales",
      writing: "📜 Sistemas Nativos de Escritura y Grafías",
      trade_currency: "🪙 Rutas de Comercio y Monedas Imperiales",
      architecture: "🧱 Arquitectura Monumental de Piedra Seca",
      hydraulic_agriculture: "💧 Ingeniería Hidráulica y Eco-Oasis",
      paved_roads: "🛣️ Caminos Pavimentados e Infraestructura",
      state_couriers: "📮 Correo Imperial y Mensajeros Estatales",
      metallurgyDesc: "Siderurgia nativa pionera y fundición avanzada de metales (ej. hornos subterráneos de Nok y Meroe, labranza de oro en Mapungubwe).",
      matriarchyDesc: "La jefatura militar y diplomática de reinas y linajes de herencia matrilineal (ej. las Kandakes de Cuxe, Reinas de Ashanti).",
      writingDesc: "Surgimiento autónomo de alfabetos y metodologías documentales estables (ej. jeroglíficos tradicionales, meroítico, silabario Ge'ez).",
      trade_currencyDesc: "Soberanías mercantiles continentales con acuñaciones imperiales de oro y pesas geométricas (ej. monedas de Aksum y Kilwa Kisiwani).",
      architectureDesc: "Edificaciones monumentales labradas en piedra por encaje físico sin mortero (ej. estelas gigantescas de Aksum, murallas del Gran Zimbabue).",
      hydraulic_agricultureDesc: "Ingeniería de aguas y canalizaciones agrícolas complejas (ej. cuenca del Nilo, depósitos de lluvia 'hafirs' en Cuxe, foggaras de Garamantas).",
      paved_roadsDesc: "Infraestructura vial de superficie sólida y calzadas empedradas (ej. el camino de canteras del lago Moeris en Kemet, calles empedradas de Cartago, paseos procesionales pavimentados en Meroe y la ruta de piedra de Aksum al puerto de Adulis).",
      state_couriersDesc: "Sistemas soberanos de envío de despachos mediante jinetes de relevo, remeros de canoa fluviales y corredores oficiales (ej. correos nilóticos en Kemet, carteros a caballo en Mali y Songhai, dinámicos relevos pedestres 'Nambas' en el Kongo)."
    }
  };

  const oLabels = overlayLabels[language] || overlayLabels['en'];

  const toggleOverlay = (over: string) => {
    setActiveOverlays(prev => 
      prev.includes(over) 
        ? prev.filter(item => item !== over) 
        : [...prev, over]
    );
  };

  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Panning & Zoom states
  const [zoomScale, setZoomScale] = useState<number>(1);
  const [panOffset, setPanOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

  // Floating controls handlers
  const handleZoomIn = () => {
    setZoomScale(prev => Math.min(8, prev + 0.4));
  };

  const handleZoomOut = () => {
    setZoomScale(prev => {
      const next = Math.max(1, prev - 0.4);
      if (next === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return next;
    });
  };

  const handleResetZoom = () => {
    setZoomScale(1);
    setPanOffset({ x: 0, y: 0 });
  };

  // Dragging event handlers
  const handleMouseDown = (e: React.MouseEvent<SVGSVGElement>) => {
    if (e.button !== 0) return; // Only allow left-click dragging
    setIsDragging(true);
    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: React.MouseEvent<SVGSVGElement>) => {
    // Constant track of hover cursor coordinates regardless of drag
    const rect = e.currentTarget.getBoundingClientRect();
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }

    if (!isDragging) return;

    // Relative mouse movement vector offset
    const dx = e.clientX - dragStart.x;
    const dy = e.clientY - dragStart.y;

    setPanOffset(prev => ({
      x: prev.x + dx,
      y: prev.y + dy
    }));

    setDragStart({ x: e.clientX, y: e.clientY });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
    setHoveredCountry(null);
  };

  const handleWheel = (e: React.WheelEvent<SVGSVGElement>) => {
    const zoomFactor = 1.05;
    const direction = e.deltaY < 0 ? 1 : -1;
    setZoomScale(prev => {
      const next = direction > 0 ? prev * zoomFactor : prev / zoomFactor;
      const bounded = Math.max(1, Math.min(8, next));
      if (bounded === 1) {
        setPanOffset({ x: 0, y: 0 });
      }
      return bounded;
    });
  };

  // Filter historical points dynamically based on UI selections
  const filteredPoints = points.filter(p => {
    const matchEra = activeEra === 'all' || p.era === activeEra;
    const matchRegion = activeRegion === 'all' || p.region === activeRegion;
    return matchEra && matchRegion;
  });

  // Dedicated trade alignments from LEHH-AfroDidatica dataset
  const tradeLines = [
    { from: 'egypt_kemet', to: 'kush_meroe' },
    { from: 'kush_meroe', to: 'aksum_empire' },
    { from: 'aksum_empire', to: 'land_of_punt' },
    { from: 'egypt_kemet', to: 'land_of_punt' },
    { from: 'carthage_empire', to: 'numidia' },
    { from: 'carthage_empire', to: 'mali_empire' },
    { from: 'numidia', to: 'mali_empire' },
    { from: 'mali_empire', to: 'songhai_empire' },
    { from: 'songhai_empire', to: 'kanem_bornu' },
    { from: 'kanem_bornu', to: 'nok_culture' },
    { from: 'mali_empire', to: 'ashanti_empire' },
    { from: 'ashanti_empire', to: 'nok_culture' },
    { from: 'aksum_empire', to: 'great_zimbabwe' }
  ];

  // Sovereign paved roads/highways network (Part 2)
  const pavedRoadsNetwork = [
    { from: 'egypt_kemet', to: 'kush_meroe', name: 'Nile Paved Quarry Highway' },
    { from: 'kush_meroe', to: 'aksum_empire', name: 'Nubian-Axumite Processional Way' },
    { from: 'aksum_empire', to: 'land_of_punt', name: 'Adulis-Aksum paved highway' },
    { from: 'carthage_empire', to: 'numidia', name: 'Carthaginian paved inter-city highway' },
    { from: 'mali_empire', to: 'songhai_empire', name: 'Sahelian Stone Paved Royal Corridor' },
    { from: 'great_zimbabwe', to: 'kilwa_sultanate', name: 'Great Zimbabwe stone-paved causeways' }
  ];

  // Sovereign rapid postal & messenger systems network (Part 2)
  const stateCouriersNetwork = [
    { from: 'egypt_kemet', to: 'kush_meroe', speed: 'swift_camel' },
    { from: 'mali_empire', to: 'songhai_empire', speed: 'royal_horse' },
    { from: 'songhai_empire', to: 'kanem_bornu', speed: 'swift_canoe' },
    { from: 'king_kongo', to: 'nok_culture', speed: 'namba_runner' },
    { from: 'great_zimbabwe', to: 'kilwa_sultanate', speed: 'run_couriers' }
  ];

  // D3 Projection Configuration
  const width = 500;
  const height = 500;
  
  // High-precision geographic projection focused specifically on the African continent
  const projection = d3.geoMercator()
    .center([16.0, 1.2]) // Center alignment over equatorial Africa
    .scale(230) // Calibrated scale to maximize visual boundaries within 500x500 viewport
    .translate([width / 2, height / 2]);

  const geoPath = d3.geoPath().projection(projection);

  // Helper coordinate projects
  const getPointProjectedCoords = (ptId: string) => {
    const pt = points.find(p => p.id === ptId);
    if (!pt) return null;
    const [lon, lat] = getLonLat(pt.coordinates.x, pt.coordinates.y);
    const projected = projection([lon, lat]);
    if (!projected) return null;
    return { x: projected[0], y: projected[1] };
  };

  // Modern country highlighter links
  const activePoint = points.find(p => p.id === hoveredPointId) || points.find(p => p.id === selectedPointId);
  const activeCountries = activePoint ? getPointAssociatedCountries(activePoint) : [];

  const overlayCountries: string[] = [];
  if (activeOverlays.length > 0) {
    points.forEach(p => {
      const matchesAny = activeOverlays.some(over => pointMatchesOverlay(p, over));
      if (matchesAny) {
        overlayCountries.push(...getPointAssociatedCountries(p));
      }
    });
  }

  const currentCriticalEvent = enableCriticalRipples
    ? CRITICAL_EVENTS.find(ev => timelineYear >= ev.year && timelineYear <= ev.year + 250)
    : undefined;

  return (
    <div id="interactive-map-panel" className="bg-[#fcfbf7] rounded-lg border border-[#e5dfd5] p-5 flex flex-col h-full relative overflow-hidden shadow-sm">
      {/* Dynamic Header */}
      <div className="border-b border-[#e5dfd5]/85 pb-4.5 mb-5 flex flex-col md:flex-row md:items-center justify-between gap-3">
        <div>
          <h3 className="text-sm font-serif font-bold uppercase tracking-wider text-[#7a2c22] flex items-center gap-1.5">
            <Globe className="h-4 w-4" />
            {t.historicalLayers}
          </h3>
        </div>
        <div id="dataset-type-toggle" className="flex items-center self-start md:self-center bg-[#faf9f4] rounded border border-[#d5cebf] p-0.5 shadow-sm text-xs">
          <button
            id="toggle-dataset-curated"
            type="button"
            onClick={() => onChangeDatasetType('curated')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-sans text-[10.5px] whitespace-nowrap ${
              datasetType === 'curated'
                ? 'bg-[#7a2c22] text-[#fcfbf7] font-bold shadow'
                : 'text-[#8c8273] hover:text-[#7a2c22]'
            }`}
            title="Exibir os principais impérios curados detalhadamente"
          >
            🏛️ Destaques (12)
          </button>
          <button
            id="toggle-dataset-polaris"
            type="button"
            onClick={() => onChangeDatasetType('polaris')}
            className={`px-3 py-1.5 rounded transition-all cursor-pointer font-sans text-[10.5px] whitespace-nowrap ${
              datasetType === 'polaris'
                ? 'bg-[#7a2c22] text-[#fcfbf7] font-bold shadow'
                : 'text-[#8c8273] hover:text-[#7a2c22]'
            }`}
            title="Exibir o banco de dados oficial Polaris completo"
          >
            📊 Polaris Completo (152)
          </button>
        </div>
      </div>

      {/* Modern Academic Filters Bar */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4.5 mb-5 bg-[#faf9f4] p-3.5 rounded border border-[#ebdcc5]/40 text-slate-900">
        {/* Era Selector */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-xs text-[#5c544d] font-bold tracking-tight flex items-center gap-1">
            <Calendar className="h-3 w-3 text-[#7a2c22]" />
            {t.chronology}
          </label>
          <select
            id="select-era-filter"
            value={activeEra}
            onChange={(e) => onChangeEra(e.target.value as any)}
            className="bg-[#fcfbf7] border border-[#d5cebf] text-[#2c231e] text-[11.5px] rounded p-2.5 outline-none focus:border-[#7a2c22] scrollbar-none transition-all cursor-pointer shadow-inner"
          >
            <option value="all">📊 {t.allEras}</option>
            <option value="pre_bronze">⌛ {t.pre_bronze}</option>
            <option value="antiquity">🏛️ {t.antiquity}</option>
            <option value="classical_era">👑 {t.classical_era}</option>
          </select>
        </div>

        {/* Region Selector */}
        <div className="flex flex-col gap-1.5 font-sans">
          <label className="text-xs text-[#5c544d] font-bold tracking-tight flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#c5a880]" />
            {t.region}
          </label>
          <select
            id="select-region-filter"
            value={activeRegion}
            onChange={(e) => onChangeRegion(e.target.value as any)}
            className="bg-[#fcfbf7] border border-[#d5cebf] text-[#2c231e] text-[11.5px] rounded p-2.5 outline-none focus:border-[#7a2c22] transition-all cursor-pointer shadow-inner"
          >
            <option value="all">🌍 {t.allRegions}</option>
            <option value="nile_valley">🌊 {t.nile_valley}</option>
            <option value="horn_of_africa">📯 {t.horn_of_africa}</option>
            <option value="west_africa">🌿 {t.west_africa}</option>
            <option value="north_africa">🐫 {t.north_africa}</option>
            <option value="central_sahara">🏜️ {t.central_sahara}</option>
          </select>
        </div>
      </div>

      {/* Dynamic Thematic Overlays (Feature 4 - Advanced Multi-Filter) */}
      <div id="thematic-overlays-container" className="mb-5 bg-[#faf9f4] p-3.5 rounded-lg border border-[#ebdcc5]/60 flex flex-col gap-2 shadow-xs">
        <div className="flex items-center gap-1.5 justify-between">
          <span className="text-[10.5px] font-bold text-[#7a2c22] uppercase font-mono flex items-center gap-1.5">
            <Layers className="h-3.5 w-3.5" />
            {oLabels.title}
          </span>
          {activeOverlays.length > 0 && (
            <button
              onClick={() => setActiveOverlays([])}
              className="text-[9.5px] text-[#7a2c22] hover:underline font-mono cursor-pointer"
            >
              [ {language === 'pt' ? 'Limpar Filtros' : language === 'es' ? 'Limpiar Todo' : language === 'fr' ? 'Effacer Tout' : 'Clear All'} ]
            </button>
          )}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {/* Metallurgy */}
          <button
            id="overlay-btn-metallurgy"
            type="button"
            onClick={() => toggleOverlay('metallurgy')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('metallurgy')
                ? 'bg-[#ea5d3c] border-[#ca4324] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <Flame className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('metallurgy') ? 'text-white' : 'text-[#ea5d3c]'}`} />
            <span className="truncate">{oLabels.metallurgy}</span>
          </button>

          {/* Matriarchy */}
          <button
            id="overlay-btn-matriarchy"
            type="button"
            onClick={() => toggleOverlay('matriarchy')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('matriarchy')
                ? 'bg-[#8d3cbc] border-[#722b9c] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <Crown className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('matriarchy') ? 'text-white' : 'text-[#8d3cbc]'}`} />
            <span className="truncate">{oLabels.matriarchy}</span>
          </button>

          {/* Writing */}
          <button
            id="overlay-btn-writing"
            type="button"
            onClick={() => toggleOverlay('writing_systems')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('writing_systems')
                ? 'bg-[#20898c] border-[#166b6e] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <Scroll className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('writing_systems') ? 'text-white' : 'text-[#20898c]'}`} />
            <span className="truncate">{oLabels.writing}</span>
          </button>

          {/* Trade & Currency */}
          <button
            id="overlay-btn-trade"
            type="button"
            onClick={() => toggleOverlay('trade_currency')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('trade_currency')
                ? 'bg-[#d99c15] border-[#b07d0d] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <Coins className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('trade_currency') ? 'text-white' : 'text-[#d99c15]'}`} />
            <span className="truncate">{oLabels.trade_currency}</span>
          </button>

          {/* Monumental Architecture */}
          <button
            id="overlay-btn-architecture"
            type="button"
            onClick={() => toggleOverlay('monumental_architecture')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('monumental_architecture')
                ? 'bg-[#a35d37] border-[#804523] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <Landmark className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('monumental_architecture') ? 'text-white' : 'text-[#a35d37]'}`} />
            <span className="truncate">{oLabels.architecture}</span>
          </button>

          {/* Hydraulic Agriculture */}
          <button
            id="overlay-btn-hydraulic"
            type="button"
            onClick={() => toggleOverlay('hydraulic_agriculture')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('hydraulic_agriculture')
                ? 'bg-[#0f8a5f] border-[#0a6646] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <Droplet className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('hydraulic_agriculture') ? 'text-white' : 'text-[#0f8a5f]'}`} />
            <span className="truncate">{oLabels.hydraulic_agriculture}</span>
          </button>

          {/* Paved Roads Overlay */}
          <button
            id="overlay-btn-roads"
            type="button"
            onClick={() => toggleOverlay('paved_roads')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('paved_roads')
                ? 'bg-[#b45309] border-[#78350f] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <MapPin className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('paved_roads') ? 'text-white' : 'text-[#b45309]'}`} />
            <span className="truncate">{oLabels.paved_roads}</span>
          </button>

          {/* State Mail & Couriers Overlay */}
          <button
            id="overlay-btn-couriers"
            type="button"
            onClick={() => toggleOverlay('state_couriers')}
            className={`py-1.5 px-2.5 rounded text-[10.5px] font-bold text-left transition-all flex items-center gap-1.5 cursor-pointer border ${
              activeOverlays.includes('state_couriers')
                ? 'bg-[#7a2c22] border-[#501c15] text-white shadow-xs'
                : 'bg-white border-[#ebdcc5]/60 text-slate-700 hover:bg-[#faf9f4]'
            }`}
          >
            <ArrowRightLeft className={`h-3.5 w-3.5 shrink-0 ${activeOverlays.includes('state_couriers') ? 'text-white' : 'text-[#7a2c22]'}`} />
            <span className="truncate">{oLabels.state_couriers}</span>
          </button>
        </div>

        {/* Dynamic stacked description boxes for selected overlays */}
        {activeOverlays.length > 0 && (
          <div className="flex flex-col gap-1.5 mt-1.5 max-h-[140px] overflow-y-auto pr-1">
            {activeOverlays.map(over => {
              let borderCol = 'border-l-3 pl-2 border-l-slate-400';
              let descText = '';
              let titleText = '';
              if (over === 'metallurgy') {
                borderCol = 'border-l-3 pl-2 border-l-[#ea5d3c]';
                titleText = oLabels.metallurgy;
                descText = oLabels.metallurgyDesc;
              } else if (over === 'matriarchy') {
                borderCol = 'border-l-3 pl-2 border-l-[#8d3cbc]';
                titleText = oLabels.matriarchy;
                descText = oLabels.matriarchyDesc;
              } else if (over === 'writing_systems') {
                borderCol = 'border-l-3 pl-2 border-l-[#20898c]';
                titleText = oLabels.writing;
                descText = oLabels.writingDesc;
              } else if (over === 'trade_currency') {
                borderCol = 'border-l-3 pl-2 border-l-[#d99c15]';
                titleText = oLabels.trade_currency;
                descText = oLabels.trade_currencyDesc;
              } else if (over === 'monumental_architecture') {
                borderCol = 'border-l-3 pl-2 border-l-[#a35d37]';
                titleText = oLabels.architecture;
                descText = oLabels.architectureDesc;
              } else if (over === 'hydraulic_agriculture') {
                borderCol = 'border-l-3 pl-2 border-l-[#0f8a5f]';
                titleText = oLabels.hydraulic_agriculture;
                descText = oLabels.hydraulic_agricultureDesc;
              } else if (over === 'paved_roads') {
                borderCol = 'border-l-3 pl-2 border-l-[#b45309]';
                titleText = oLabels.paved_roads;
                descText = oLabels.paved_roadsDesc;
              } else if (over === 'state_couriers') {
                borderCol = 'border-l-3 pl-2 border-l-[#7a2c22]';
                titleText = oLabels.state_couriers;
                descText = oLabels.state_couriersDesc;
              }

              return (
                <div key={over} className={`text-[10px] text-[#5c544d] bg-white border border-[#ebdcc5]/30 rounded p-2 italic leading-relaxed animate-fade-in font-sans ${borderCol}`}>
                  <strong className="block not-italic text-[10.5px] font-bold text-[#2c231e] mb-0.5">{titleText}</strong>
                  {descText}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* SVG Interactive Canvas Container */}
      <div className="flex-1 w-full min-h-[580px] lg:min-h-[660px] bg-[#edf2f5] rounded border border-[#ccdbe0] relative flex items-center justify-center p-3 overflow-hidden shadow-inner transition-all duration-300">
        {/* Soft Parchment Texture Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ebdcc5_1px,transparent_1px)] [background-size:16px_16px] opacity-20 pointer-events-none" />

        {/* Floating Critical Historic Milestone Event Overlay Card */}
        {enableCriticalRipples && currentCriticalEvent && (() => {
          const isPausedOnThis = !isTimelinePlaying && lastPausedEventKey === `${currentCriticalEvent.pointId}-${currentCriticalEvent.year}`;
          return (
            <div 
              id="floating-historical-milestone-card"
              className="absolute left-3.5 top-3.5 z-40 max-w-[240px] sm:max-w-[285px] bg-amber-50/95 backdrop-blur-xs border-2 border-[#7a2c22] rounded-md p-3 shadow-md animate-fade-in text-[#2c231e] font-sans transition-all duration-300 transform scale-100 hover:scale-102 flex flex-col gap-2"
            >
              <div className="flex items-center gap-1 text-[#ea5d3c]">
                <Flame className="h-4 w-4 animate-bounce shrink-0" />
                <span className="text-[9px] font-mono font-black uppercase tracking-wider bg-[#ea5d3c]/10 px-1.5 py-0.5 rounded">
                  {language === 'pt' ? 'MARCO HISTÓRICO' : 'HISTORIC MILESTONE'}
                </span>
                <span className="text-[9.5px] font-mono font-bold ml-auto text-[#7a2c22]">
                  {currentCriticalEvent.year < 0 ? `${Math.abs(currentCriticalEvent.year)} a.C.` : `${currentCriticalEvent.year} d.C.`}
                </span>
              </div>
              
              <h4 className="font-serif text-[12.5px] font-black leading-tight text-[#7a2c22] border-b border-[#7a2c22]/15 pb-1 block">
                {language === 'pt' ? currentCriticalEvent.ptTitle : currentCriticalEvent.enTitle}
              </h4>
              
              <p className="text-[10.5px] text-[#5c544d] leading-relaxed text-left">
                {language === 'pt' ? currentCriticalEvent.ptDesc : currentCriticalEvent.enDesc}
              </p>

              {/* Pacing Control Actions within the card */}
              <div className="mt-1.5 pt-2 border-t border-[#7a2c22]/10 flex flex-col gap-2">
                {isPausedOnThis ? (
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[8.5px] text-[#ea5d3c] font-extrabold animate-pulse leading-none">
                      {language === 'pt' 
                        ? '⏸️ Timelapse pausado para leitura do marco' 
                        : '⏸️ Timelapse paused to read milestone'}
                    </span>
                    <button
                      type="button"
                      onClick={() => setIsTimelinePlaying(true)}
                      className="w-full bg-[#7a2c22] hover:bg-[#862e24] text-white font-black uppercase text-[10px] tracking-wider py-1.5 px-3 rounded shadow-xs transition-all cursor-pointer flex items-center justify-center gap-1"
                    >
                      <span>▶️ {language === 'pt' ? 'CONTINUAR TIMELAPSE' : 'CONTINUE TIMELAPSE'}</span>
                    </button>
                  </div>
                ) : isTimelinePlaying ? (
                  <div className="flex items-center gap-1 text-[8.5px] text-[#8c8273] italic">
                    <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping shrink-0" />
                    <span>{language === 'pt' ? 'Reproduzindo...' : 'Playing...'}</span>
                  </div>
                ) : null}

                {/* Compact Auto-Pause toggle to place power directly in user hand */}
                <label className="flex items-center gap-1.5 cursor-pointer text-[8px] font-bold text-slate-500 select-none">
                  <input 
                    type="checkbox"
                    checked={autoPauseOnMilestones}
                    onChange={(e) => setAutoPauseOnMilestones(e.target.checked)}
                    className="rounded text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] w-3 h-3 text-[#7a2c22] cursor-pointer"
                  />
                  <span>
                    {language === 'pt' 
                      ? 'Pausar automaticamente nos marcos' 
                      : 'Auto-pause on milestones'}
                  </span>
                </label>
              </div>
            </div>
          );
        })()}

        {/* Academic Zoom Dashboard Float Overlay */}
        <div id="map-zoom-dashboard" className="absolute right-3.5 top-3.5 z-30 flex flex-col gap-1">
          <button
            id="btn-zoom-in"
            type="button"
            onClick={handleZoomIn}
            className="w-8.5 h-8.5 rounded border border-[#d5cebf] bg-[#fcfbf7] hover:bg-[#7a2c22] hover:text-[#fcfbf7] active:scale-95 transition-all flex items-center justify-center text-sm font-bold shadow-sm cursor-pointer text-[#2c231e]"
            title="Aproximar o mapa"
          >
            ＋
          </button>
          <button
            id="btn-zoom-out"
            type="button"
            onClick={handleZoomOut}
            className="w-8.5 h-8.5 rounded border border-[#d5cebf] bg-[#fcfbf7] hover:bg-[#7a2c22] hover:text-[#fcfbf7] active:scale-95 transition-all flex items-center justify-center text-sm font-bold shadow-sm cursor-pointer text-[#2c231e]"
            title="Afastar o mapa"
          >
            －
          </button>
          <button
            id="btn-zoom-reset"
            type="button"
            onClick={handleResetZoom}
            className="w-8.5 h-8.5 rounded border border-[#d5cebf] bg-[#fcfbf7] hover:bg-[#7a2c22] hover:text-[#fcfbf7] active:scale-95 transition-all flex items-center justify-center text-xs shadow-sm cursor-pointer text-[#2c231e] font-serif"
            title="Redefinir visualização e centralizar"
          >
            ⟲
          </button>
          {zoomScale > 1 && (
            <div className="text-[9px] font-mono text-[#7a2c22] bg-[#fcfbf7] border border-[#d5cebf] text-center rounded py-0.5 mt-0.5 shadow-sm">
              {Math.round(zoomScale * 100)}%
            </div>
          )}
        </div>

        <svg
          id="africa-svg"
          viewBox="0 0 500 500"
          className={`w-full h-full max-h-[680px] lg:max-h-[750px] aspect-square transition-all relative z-10 select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
          xmlns="http://www.w3.org/2000/svg"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onWheel={handleWheel}
        >
          <defs>
            <clipPath id="africa-clip">
              {(africaData as any).features.map((feature: any, index: number) => {
                const pathD = geoPath(feature);
                if (!pathD) return null;
                return <path key={`clip-country-${index}`} d={pathD} />;
              })}
            </clipPath>
            {points.map((p) => {
              let color = '#7a2c22';
              const conf = empireConfig[p.id];
              if (conf) {
                color = conf.color;
              } else {
                if (p.era === 'antiquity') color = '#c5a880';
                else if (p.era === 'classical_era') color = '#5f8774';
              }
              return (
                <radialGradient id={`fluid-grad-${p.id}`} key={`fluid-grad-${p.id}`} cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor={color} stopOpacity="0.75" />
                  <stop offset="50%" stopColor={color} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={color} stopOpacity="0" />
                </radialGradient>
              );
            })}
          </defs>
          {/* Compass Rose for Cartographic Academic Vibe (Remains static in viewport coordinates for optimal immersion) */}
          <g transform="translate(65, 435) scale(0.6)" className="opacity-40 pointer-events-none">
            <circle r="30" fill="none" stroke="#b5a995" strokeWidth="1" strokeDasharray="3 3" />
            <circle r="25" fill="none" stroke="#b5a995" strokeWidth="0.8" />
            <path d="M 0 -35 L 5 0 L 0 5 L -5 0 Z" fill="#7a2c22" stroke="#7a2c22" strokeWidth="0.5" />
            <path d="M 0 35 L 5 0 L 0 -5 L -5 0 Z" fill="#b5a995" stroke="#b5a995" strokeWidth="0.5" />
            <path d="M -35 0 L 0 -5 L 5 0 L 0 5 Z" fill="#b5a995" stroke="#b5a995" strokeWidth="0.5" />
            <path d="M 35 0 L 0 -5 L -5 0 L 0 5 Z" fill="#b5a995" stroke="#b5a995" strokeWidth="0.5" />
            <text x="-4" y="-39" className="font-serif text-[10px] font-bold fill-[#7a2c22]">N</text>
            <text x="-3" y="47" className="font-serif text-[10px] fill-[#b5a995]">S</text>
            <text x="39" y="3" className="font-serif text-[10px] fill-[#b5a995]">E</text>
            <text x="-48" y="3" className="font-serif text-[10px] fill-[#b5a995]">W</text>
          </g>

          {/* Map Components wrapped inside high precision Pan & Zoom group */}
          <g transform={`translate(${panOffset.x}, ${panOffset.y}) scale(${zoomScale})`} className="transition-transform duration-75">
            {/* D3-Rendered Precise GeoJSON Countries of Africa */}
            <g id="geojson-countries-layer">
              {(africaData as any).features.map((feature: any, index: number) => {
                const pathD = geoPath(feature);
                if (!pathD) return null;
                
                const countryName = feature.properties?.NAME_PT || feature.properties?.NAME || feature.properties?.name || "Território";
                const isHighlightActive = activeCountries.length > 0 && matchCountry(feature, activeCountries);
                const isOverlayCountry = activeOverlays.length > 0 && matchCountry(feature, overlayCountries);

                let countryFill = "#dfd6bd";
                let countryStroke = "#aba084";
                let countryOpacity = "0.85";
                let strokeW = 0.75 / Math.sqrt(zoomScale);

                if (isHighlightActive) {
                  countryFill = "#eedfc1";
                  countryStroke = "#7a2c22";
                  strokeW = 1.6 / Math.sqrt(zoomScale);
                  countryOpacity = "1.0";
                } else if (isOverlayCountry) {
                  countryOpacity = "1.00";
                  strokeW = 1.35 / Math.sqrt(zoomScale);
                  
                  let matchedOverlayForCountry: string | null = null;
                  if (activeOverlays.length > 0) {
                    for (const over of activeOverlays) {
                      const pointsMatchingOver = points.filter(p => pointMatchesOverlay(p, over));
                      const assocCountriesForOver = pointsMatchingOver.flatMap(p => getPointAssociatedCountries(p));
                      if (matchCountry(feature, assocCountriesForOver)) {
                        matchedOverlayForCountry = over;
                        break;
                      }
                    }
                  }

                  if (matchedOverlayForCountry === 'metallurgy') {
                    countryFill = "#fae1d4"; // Warm furnace copper
                    countryStroke = "#c75c32";
                  } else if (matchedOverlayForCountry === 'matriarchy') {
                    countryFill = "#f1e5f8"; // Royal queenly purple
                    countryStroke = "#8d3cbc";
                  } else if (matchedOverlayForCountry === 'writing_systems') {
                     countryFill = "#e0f2f2"; // Ancient scholarly teal papyrus
                     countryStroke = "#20898c";
                  } else if (matchedOverlayForCountry === 'trade_currency') {
                     countryFill = "#fef3c7"; // Golden amber
                     countryStroke = "#d99c15";
                  } else if (matchedOverlayForCountry === 'monumental_architecture') {
                     countryFill = "#f3e8e2"; // Stone/Clay brown
                     countryStroke = "#a35d37";
                  } else if (matchedOverlayForCountry === 'hydraulic_agriculture') {
                     countryFill = "#e6f4ea"; // Aqua emerald green
                     countryStroke = "#0f8a5f";
                  }
                }
                
                return (
                  <path
                     key={`geojson-country-${index}`}
                     d={pathD}
                     fill={countryFill}
                     stroke={countryStroke}
                     strokeWidth={strokeW}
                     className="transition-all duration-350 cursor-pointer"
                     opacity={countryOpacity}
                     onMouseEnter={() => {
                       setHoveredCountry(countryName);
                     }}
                     onMouseLeave={() => {
                       setHoveredCountry(null);
                     }}
                  />
                );
              })}
            </g>

            {/* Dynamic Fluid Areas of Influence (Multiple Advanced Models) */}
            {viewFluidAreas && (
              <g id="fluid-influence-layer" className="pointer-events-none">
                {/* Embedded High-Fidelity CSS Animations for Academic Map Effects */}
                <style>{`
                  @keyframes flowLineAnim {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .animate-flow-line {
                    animation: flowLineAnim 1.2s linear infinite;
                  }

                  @keyframes corePulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                  }
                  .animate-core-pulse {
                    transform-origin: center;
                    animation: corePulse 3s ease-in-out infinite;
                  }

                  @keyframes shockwave {
                    0% {
                      r: 5px;
                      opacity: 1;
                      stroke-width: 3.5;
                    }
                    100% {
                      r: 140px;
                      opacity: 0;
                      stroke-width: 0.5;
                    }
                  }
                  .animate-shockwave {
                    animation: shockwave 2.2s cubic-bezier(0.1, 0.8, 0.3, 1) infinite;
                  }
                `}</style>

                {/* MODE A: Voronoi Territorial Balances Partition */}
                {timelapseMode === 'voronoi' && (() => {
                  const activePointsWithCoords = points
                    .map(p => {
                      const strengthInfo = getEmpireStrength(p, timelineYear);
                      const coords = getPointProjectedCoords(p.id);
                      return {
                        point: p,
                        strength: strengthInfo.strength,
                        color: strengthInfo.color,
                        coords
                      };
                    })
                    .filter(item => item.strength > 0 && item.coords !== null);

                  if (activePointsWithCoords.length === 0) return null;

                  if (activePointsWithCoords.length === 1) {
                    const single = activePointsWithCoords[0];
                    return (
                      <rect
                        width={500}
                        height={500}
                        fill={single.color}
                        fillOpacity={single.strength * 0.16}
                        stroke={single.color}
                        strokeWidth={1.5 / Math.sqrt(zoomScale)}
                        strokeOpacity={single.strength * 0.4}
                        clipPath="url(#africa-clip)"
                        className="transition-all duration-500 ease-out"
                      />
                    );
                  }

                  try {
                    // Eliminate coordinate duplicates to protect D3 Voronoi computations from crashing
                    const seenCoords = new Set<string>();
                    const uniqueItems = activePointsWithCoords.filter(item => {
                      const key = `${item.coords!.x.toFixed(2)},${item.coords!.y.toFixed(2)}`;
                      if (seenCoords.has(key)) return false;
                      seenCoords.add(key);
                      return true;
                    });

                    if (uniqueItems.length === 1) {
                      const single = uniqueItems[0];
                      return (
                        <rect
                          width={500}
                          height={500}
                          fill={single.color}
                          fillOpacity={single.strength * 0.16}
                          stroke={single.color}
                          strokeWidth={1.5 / Math.sqrt(zoomScale)}
                          strokeOpacity={single.strength * 0.4}
                          clipPath="url(#africa-clip)"
                        />
                      );
                    }

                    const delaunayPts = uniqueItems.map(item => [item.coords!.x, item.coords!.y] as [number, number]);
                    const delaunay = d3.Delaunay.from(delaunayPts);
                    const voronoi = delaunay.voronoi([0, 0, 500, 500]);

                    return uniqueItems.map((item, idx) => {
                      const cellPath = voronoi.renderCell(idx);
                      if (!cellPath) return null;
                      return (
                        <path
                          key={`voronoi-cell-${item.point.id}`}
                          d={cellPath}
                          fill={item.color}
                          fillOpacity={item.strength * 0.16}
                          stroke={item.color}
                          strokeWidth={1.25 / Math.sqrt(zoomScale)}
                          strokeOpacity={item.strength * 0.35}
                          strokeDasharray="4 3"
                          clipPath="url(#africa-clip)"
                          className="transition-all duration-500 ease-out"
                        >
                           <title>{language === 'pt' ? `Esfera de Voronoi: ${item.point.name.pt || item.point.name.en}` : `Voronoi Sphere: ${item.point.name.en || item.point.name.pt}`}</title>
                        </path>
                      );
                    });
                  } catch (err) {
                    console.error("D3 Voronoi calculation error:", err);
                    return null;
                  }
                })()}

                {/* MODE B: Isorhythmic Concentric Contours (Core / Hinterland) */}
                {timelapseMode === 'concentric' && points.map((p) => {
                  const { strength, r, color } = getEmpireStrength(p, timelineYear);
                  if (strength <= 0) return null;

                  const coords = getPointProjectedCoords(p.id);
                  if (!coords) return null;

                  const scaleF = 1 / Math.sqrt(zoomScale);

                  return (
                    <g key={`concentric-levels-${p.id}`} className="transition-all duration-350 ease-out">
                      {/* 1. Core Center: Solid thick ring indicating central administration */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={r * 0.45}
                        fill={color}
                        fillOpacity={strength * 0.22}
                        stroke={color}
                        strokeWidth={1.8 * scaleF}
                        opacity={strength}
                        className="animate-core-pulse"
                      />
                      {/* 2. Direct Control Area: Solid thin ring */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={r * 0.95}
                        fill={color}
                        fillOpacity={strength * 0.08}
                        stroke={color}
                        strokeWidth={0.95 * scaleF}
                        opacity={strength * 0.75}
                      />
                      {/* 3. Hinterland (Sphere of Tribute): Dotted peripheral ring */}
                      <circle
                        cx={coords.x}
                        cy={coords.y}
                        r={r * 1.45}
                        fill="none"
                        stroke={color}
                        strokeWidth={0.75 * scaleF}
                        strokeDasharray={`${3 * scaleF} ${4 * scaleF}`}
                        opacity={strength * 0.45}
                      />
                    </g>
                  );
                })}

                {/* MODE C: Classic Standard Flat Gradient Glow */}
                {timelapseMode === 'standard' && points.map((p) => {
                  const { strength, r, color } = getEmpireStrength(p, timelineYear);
                  if (strength <= 0) return null;

                  const coords = getPointProjectedCoords(p.id);
                  if (!coords) return null;

                  return (
                    <circle
                      key={`influence-std-${p.id}`}
                      cx={coords.x}
                      cy={coords.y}
                      r={r}
                      fill={`url(#fluid-grad-${p.id})`}
                      opacity={strength * 0.85}
                      className="transition-all duration-350 ease-out"
                    />
                  );
                })}
              </g>
            )}

            {/* Dynamic Conducive Flow Networks (Pulsing Lines along Roads/Couriers when capitals are active) */}
            {enableConduciveFlows && (
              <g id="conducive-flow-networks-layer" className="pointer-events-none">
                {pavedRoadsNetwork.map((road, idx) => {
                  const fromPoint = points.find(p => p.id === road.from);
                  const toPoint = points.find(p => p.id === road.to);
                  if (!fromPoint || !toPoint) return null;

                  const fromStr = getEmpireStrength(fromPoint, timelineYear);
                  const toStr = getEmpireStrength(toPoint, timelineYear);

                  const activeStr = Math.max(fromStr.strength, toStr.strength);
                  if (activeStr <= 0) return null;

                  const fromCoords = getPointProjectedCoords(road.from);
                  const toCoords = getPointProjectedCoords(road.to);
                  if (!fromCoords || !toCoords) return null;

                  const scaleF = 1 / Math.sqrt(zoomScale);
                  const color = fromStr.strength > 0 ? fromStr.color : toStr.color;

                  return (
                    <g key={`flow-road-${idx}`} opacity={activeStr * 0.75}>
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={color}
                        strokeWidth={2.2 * scaleF}
                        strokeDasharray="6 6"
                        className="animate-flow-line"
                      />
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={color}
                        strokeWidth={5.5 * scaleF}
                        opacity="0.25"
                      />
                    </g>
                  );
                })}

                {stateCouriersNetwork.map((courier, idx) => {
                  const fromPoint = points.find(p => p.id === courier.from);
                  const toPoint = points.find(p => p.id === courier.to);
                  if (!fromPoint || !toPoint) return null;

                  const fromStr = getEmpireStrength(fromPoint, timelineYear);
                  const toStr = getEmpireStrength(toPoint, timelineYear);

                  const activeStr = Math.max(fromStr.strength, toStr.strength);
                  if (activeStr <= 0) return null;

                  const fromCoords = getPointProjectedCoords(courier.from);
                  const toCoords = getPointProjectedCoords(courier.to);
                  if (!fromCoords || !toCoords) return null;

                  const scaleF = 1 / Math.sqrt(zoomScale);
                  const color = fromStr.strength > 0 ? fromStr.color : toStr.color;

                  return (
                    <g key={`flow-courier-${idx}`} opacity={activeStr * 0.75}>
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={color}
                        strokeWidth={1.5 * scaleF}
                        strokeDasharray="4 4"
                        className="animate-flow-line"
                        style={{ animationDuration: '0.8s' }}
                      />
                    </g>
                  );
                })}
              </g>
            )}

            {/* Critical Event Shockwave Ripples Layer */}
            {enableCriticalRipples && currentCriticalEvent && (() => {
              const coords = getPointProjectedCoords(currentCriticalEvent.pointId);
              if (!coords) return null;
              const evPoint = points.find(p => p.id === currentCriticalEvent.pointId);
              const evColor = evPoint ? getEmpireStrength(evPoint, timelineYear).color : '#ea5d3c';
              return (
                <g id="shockwave-ripples-layer" className="pointer-events-none">
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={10}
                    fill="none"
                    stroke={evColor}
                    className="animate-shockwave"
                  />
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={10}
                    fill="none"
                    stroke={evColor}
                    className="animate-shockwave"
                    style={{ animationDelay: '0.7s' }}
                  />
                  <circle
                    cx={coords.x}
                    cy={coords.y}
                    r={10}
                    fill="none"
                    stroke={evColor}
                    className="animate-shockwave"
                    style={{ animationDelay: '1.4s' }}
                  />
                </g>
              );
            })()}

            {/* Intersecting dynamic trade/migration lines */}
            <g id="trade-lines-layer">
              {tradeLines.map((line, idx) => {
                const fromCoords = getPointProjectedCoords(line.from);
                const toCoords = getPointProjectedCoords(line.to);
                if (!fromCoords || !toCoords) return null;

                const isLineActive = 
                  selectedPointId === line.from || 
                  selectedPointId === line.to ||
                  hoveredPointId === line.from ||
                  hoveredPointId === line.to;

                return (
                  <g key={`trade-line-${idx}`}>
                    <line
                      x1={fromCoords.x}
                      y1={fromCoords.y}
                      x2={toCoords.x}
                      y2={toCoords.y}
                      stroke={isLineActive ? "#7a2c22" : "#9c8262"}
                      strokeWidth={isLineActive ? (2.0 / Math.sqrt(zoomScale)) : (0.8 / Math.sqrt(zoomScale))}
                      strokeDasharray={isLineActive ? "4 3" : "4 5"}
                      className="transition-all duration-300 pointer-events-none"
                      opacity={isLineActive ? "0.95" : "0.22"}
                    />
                  </g>
                );
              })}
            </g>

            {/* Dynamic Paved Roads Layer (Part 2) */}
            {activeOverlays.includes('paved_roads') && (
              <g id="paved-roads-layer">
                {pavedRoadsNetwork.map((road, idx) => {
                  const fromCoords = getPointProjectedCoords(road.from);
                  const toCoords = getPointProjectedCoords(road.to);
                  if (!fromCoords || !toCoords) return null;
                  
                  const isSelected = selectedOverlayEntity?.type === 'road' && selectedOverlayEntity.name === road.name;

                  return (
                    <g 
                      key={`paved-road-${idx}`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleRoadClick(road);
                      }}
                    >
                      {/* Invisible wider stroke for easy click triggers */}
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke="transparent"
                        strokeWidth={14 / Math.sqrt(zoomScale)}
                      />
                      {/* Base shadow dark representation */}
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={isSelected ? "#b45309" : "#78350f"}
                        strokeWidth={(isSelected ? 6.5 : 4.5) / Math.sqrt(zoomScale)}
                        strokeLinecap="round"
                        opacity={isSelected ? "0.95" : "0.65"}
                        className="transition-all duration-200"
                      />
                      {/* Paved brick golden line on top */}
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={isSelected ? "#ffffff" : "#fbbf24"}
                        strokeWidth={(isSelected ? 3.2 : 2.2) / Math.sqrt(zoomScale)}
                        strokeDasharray={`${6 / Math.sqrt(zoomScale)} ${4 / Math.sqrt(zoomScale)}`}
                        strokeLinecap="round"
                        opacity={isSelected ? "1.0" : "0.9"}
                        className="transition-all duration-200"
                      />
                      <title>{road.name}</title>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Dynamic State Mail & Courier Messenger Lines & Runners (Part 2) */}
            {activeOverlays.includes('state_couriers') && (
              <g id="state-couriers-layer">
                <style>{`
                  @keyframes courierFlow {
                    to {
                      stroke-dashoffset: -20;
                    }
                  }
                  .animate-courier-line {
                    animation: courierFlow 1.5s linear infinite;
                  }
                `}</style>
                {stateCouriersNetwork.map((courier, idx) => {
                  const fromCoords = getPointProjectedCoords(courier.from);
                  const toCoords = getPointProjectedCoords(courier.to);
                  if (!fromCoords || !toCoords) return null;

                  // Find midpoint of coordinates to represent runner badge
                  const midX = (fromCoords.x + toCoords.x) / 2;
                  const midY = (fromCoords.y + toCoords.y) / 2;
                  const scaleFactor = 1 / Math.sqrt(zoomScale);

                  const isSelected = selectedOverlayEntity?.type === 'courier' && 
                                     selectedOverlayEntity.from === courier.from && 
                                     selectedOverlayEntity.to === courier.to;

                  return (
                    <g 
                      key={`state-courier-${idx}`}
                      className="cursor-pointer group"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleCourierClick(courier);
                      }}
                    >
                      {/* Invisible wider stroke for easy click triggers */}
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke="transparent"
                        strokeWidth={14 / Math.sqrt(zoomScale)}
                      />
                      {/* Animated courier line */}
                      <line
                        x1={fromCoords.x}
                        y1={fromCoords.y}
                        x2={toCoords.x}
                        y2={toCoords.y}
                        stroke={isSelected ? "#ea5d3c" : "#7a2c22"}
                        strokeWidth={(isSelected ? 3.5 : 2.0) / Math.sqrt(zoomScale)}
                        strokeDasharray="6 4"
                        className="animate-courier-line transition-all duration-200"
                        opacity={isSelected ? "1.0" : "0.85"}
                      />
                      {/* Envelope / Post station pin at the midpoint */}
                      <g transform={`translate(${midX}, ${midY}) scale(${scaleFactor * (isSelected ? 1.35 : 1.0)})`} className="transition-all duration-200">
                        <circle r="8.5" fill={isSelected ? "#ea5d3c" : "#7a2c22"} stroke="#faf9f4" strokeWidth="1.2" className="shadow-xs" />
                        <g transform="translate(0, -0.5)">
                          <rect x="-4" y="-3" width="8" height="6" rx="0.5" fill="#faf9f4" />
                          <path d="M-4 -3 L0 0.5 L4 -3" fill="none" stroke={isSelected ? "#ea5d3c" : "#7a2c22"} strokeWidth="0.8" />
                        </g>
                      </g>
                    </g>
                  );
                })}
              </g>
            )}

            {/* Anchored Hotspots dynamically positioned via geographic projection */}
            <g id="hotspots-layer">
              {filteredPoints.map((p) => {
                const isSelected = p.id === selectedPointId;
                const isHovered = p.id === hoveredPointId;

                // Geographic projection placement
                const [lon, lat] = getLonLat(p.coordinates.x, p.coordinates.y);
                const projected = projection([lon, lat]);
                if (!projected) return null;
                
                const [pX, pY] = projected;

                const matchingPointOverlays = activeOverlays.filter(over => pointMatchesOverlay(p, over));
                const matchesActiveOverlay = matchingPointOverlays.length > 0;

                const { strength: currentYrStrength } = getEmpireStrength(p, timelineYear);
                const isCurrentlyActive = currentYrStrength > 0;

                const pinColor = p.era === 'pre_bronze'
                  ? 'bg-[#7a2c22] border-[#501c15]'
                  : p.era === 'antiquity'
                    ? 'bg-[#c5a880] border-[#957c5a]'
                    : 'bg-[#5f8774] border-[#3e5a4d]';

                let pulseColor = p.era === 'pre_bronze'
                  ? 'bg-[#7a2c22]/40'
                  : p.era === 'antiquity'
                    ? 'bg-[#c5a880]/40'
                    : 'bg-[#5f8774]/40';

                let nodeBorderHighlight = '';
                if (matchesActiveOverlay) {
                  const representativeOver = matchingPointOverlays[0];
                  if (representativeOver === 'metallurgy') {
                    pulseColor = 'bg-[#ea5d3c]/60';
                    nodeBorderHighlight = 'ring-4 ring-[#ea5d3c]/50 scale-125 bg-[#ea5d3c] border-amber-950 animate-pulse';
                  } else if (representativeOver === 'matriarchy') {
                    pulseColor = 'bg-[#8d3cbc]/60';
                    nodeBorderHighlight = 'ring-4 ring-[#8d3cbc]/50 scale-125 bg-[#8d3cbc] border-[#2e0847] animate-pulse';
                  } else if (representativeOver === 'writing_systems') {
                    pulseColor = 'bg-[#20898c]/60';
                    nodeBorderHighlight = 'ring-4 ring-[#20898c]/50 scale-125 bg-[#20898c] border-[#083536] animate-pulse';
                  } else if (representativeOver === 'trade_currency') {
                    pulseColor = 'bg-[#d99c15]/60';
                    nodeBorderHighlight = 'ring-4 ring-[#d99c15]/50 scale-125 bg-[#d99c15] border-[#422e03] animate-pulse';
                  } else if (representativeOver === 'monumental_architecture') {
                    pulseColor = 'bg-[#a35d37]/60';
                    nodeBorderHighlight = 'ring-4 ring-[#a35d37]/50 scale-125 bg-[#a35d37] border-amber-950 animate-pulse';
                  } else if (representativeOver === 'hydraulic_agriculture') {
                    pulseColor = 'bg-[#0f8a5f]/60';
                    nodeBorderHighlight = 'ring-4 ring-[#0f8a5f]/50 scale-125 bg-[#0f8a5f] border-green-950 animate-pulse';
                  }
                }

                // Size scales inverted by square-root zoom factors to avoid oversized components upon zoom
                const scaleFactor = 1 / Math.sqrt(zoomScale);
                const diameter = 18 * scaleFactor;
                const triggerVolume = 40 * scaleFactor;

                return (
                  <foreignObject
                    key={`hotspot-obj-${p.id}`}
                    x={pX - triggerVolume / 2}
                    y={pY - triggerVolume / 2}
                    width={triggerVolume}
                    height={triggerVolume}
                    className="overflow-visible pointer-events-auto cursor-pointer"
                    style={{ opacity: viewFluidAreas && !isCurrentlyActive ? 0.3 : 1, transition: 'opacity 0.45s ease-in-out' }}
                  >
                    <div
                      id={`hotspot-host-${p.id}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectPoint(p);
                      }}
                      onMouseEnter={() => setHoveredPointId(p.id)}
                      onMouseLeave={() => setHoveredPointId(null)}
                      className="w-full h-full flex items-center justify-center relative group focus:outline-none"
                      style={{ transform: `scale(${1 / Math.sqrt(zoomScale)})`, transformOrigin: 'center' }}
                    >
                      {/* Glowing core animation on selection, hover, active overlay, or active timelapse year */}
                      {(isSelected || isHovered || matchesActiveOverlay || (viewFluidAreas && isCurrentlyActive)) && (
                        <span className={`absolute inset-0 rounded-full animate-ping scale-150 duration-1000 ${viewFluidAreas && isCurrentlyActive ? 'bg-[#ea5d3c]/30' : pulseColor} opacity-50`} />
                      )}
                      
                      {/* Outer circle pointer */}
                      <div
                        id={`hotspot-node-${p.id}`}
                        className={`w-4.5 h-4.5 rounded-full border-2 shadow-sm transition-all duration-300 ${pinColor} ${
                          matchesActiveOverlay
                            ? nodeBorderHighlight
                            : isSelected 
                              ? 'scale-135 ring-4 ring-[#7a2c22]/35 bg-red-800' 
                              : isHovered 
                                ? 'scale-120 border-red-900 bg-[#7a2c22]' 
                                : 'scale-100'
                        }`}
                      />

                      {/* Floating thematic badge overlay */}
                      {matchesActiveOverlay && (
                        <div className="absolute -top-3.5 -right-3.5 z-45 bg-[#221e1a] border border-[#ebdcc5]/95 rounded-full p-1 shadow-md flex gap-1 items-center scale-95 transition-all animate-bounce">
                          {matchingPointOverlays.map(over => {
                            if (over === 'metallurgy') return <Flame key={over} className="h-2.5 w-2.5 text-[#ea5d3c]" />;
                            if (over === 'matriarchy') return <Crown key={over} className="h-2.5 w-2.5 text-[#8d3cbc]" />;
                            if (over === 'writing_systems') return <Scroll key={over} className="h-2.5 w-2.5 text-[#20898c]" />;
                            if (over === 'trade_currency') return <Coins key={over} className="h-2.5 w-2.5 text-[#d99c15]" />;
                            if (over === 'monumental_architecture') return <Landmark key={over} className="h-2.5 w-2.5 text-[#a35d37]" />;
                            if (over === 'hydraulic_agriculture') return <Droplet key={over} className="h-2.5 w-2.5 text-[#0f8a5f]" />;
                            return null;
                          })}
                        </div>
                      )}

                      {/* Elegant Tooltip banner pointing on float */}
                      <div
                        id={`hotspot-tooltip-${p.id}`}
                        className="absolute left-1/2 bottom-full mb-2 -translate-x-1/2 bg-white border border-[#d5cebf] py-1 px-2.5 rounded shadow-md pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50 text-slate-800"
                        style={{ transform: `scale(${Math.sqrt(zoomScale)})`, transformOrigin: 'bottom center' }}
                      >
                        <div className="font-serif text-[11px] font-bold text-[#7a2c22] flex items-center gap-1">
                          <Landmark className="h-3 w-3 shrink-0" />
                          <span>{p.name[language]}</span>
                        </div>
                        <div className="text-[10px] text-[#5c544d] font-mono leading-none mt-0.5">
                          {p.period[language]}
                        </div>
                      </div>
                    </div>
                  </foreignObject>
                );
              })}
            </g>
          </g>
        </svg>

        {/* Floating precise country name indicator (GeoJSON discovery) */}
        {hoveredCountry && (
          <div
            className="absolute bg-[#221e1a] text-[#faf9f4] text-[10px] px-2 py-1 rounded shadow-md pointer-events-none z-40 transition-all duration-75 border border-[#4d443a] font-serif"
            style={{
              left: `${mousePos.x + 12}px`,
              top: `${mousePos.y + 12}px`
            }}
          >
            🗺️ {hoveredCountry}
          </div>
        )}

        {/* Dynamic Cartographic Legend Panel (Feature requested by user) */}
        {activeOverlays.length > 0 && (
          <div
            id="academic-thematic-legend"
            className="absolute left-3.5 bottom-3.5 z-30 max-w-sm w-[90%] md:w-80 bg-[#1e1a17]/95 text-[#f5f2e9] border border-[#ebdcc5]/40 rounded-lg p-3.5 shadow-2xl animate-fade-in font-sans flex flex-col gap-2.5"
          >
            <div className="flex items-center justify-between border-b border-[#ebdcc5]/20 pb-2">
              <span className="text-[10px] uppercase font-bold tracking-wider text-[#ea996c] font-mono flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-[#ea996c]" />
                {selectedOverlayEntity 
                  ? (language === 'pt' ? 'Detalhes do Overlay' : 'Overlay Details')
                  : (language === 'pt' ? 'Legenda Temática Ativa' : 'Active Thematic Legend')}
              </span>
              <div className="flex items-center gap-1.5">
                {selectedOverlayEntity && (
                  <button
                    type="button"
                    onClick={() => setSelectedOverlayEntity(null)}
                    className="text-[#ea996c] hover:text-[#fff] text-[9px] bg-[#ea996c]/10 px-1.5 py-0.5 rounded cursor-pointer transition-all border border-[#ea996c]/30"
                  >
                    ← {language === 'pt' ? 'Voltar' : 'Back'}
                  </button>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setActiveOverlays([]);
                    setSelectedOverlayEntity(null);
                  }}
                  className="text-white/60 hover:text-white text-[9.5px] bg-white/10 px-1.5 py-0.5 rounded cursor-pointer transition-all border-0 focus:outline-none"
                  title={language === 'pt' ? 'Fechar todas as legendas' : 'Close all legends'}
                >
                  ✕ {language === 'pt' ? 'Limpar' : 'Clear'}
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-3 max-h-[220px] overflow-y-auto pr-1 text-xs select-text">
              {selectedOverlayEntity ? (
                /* Detail of the specifically clicked entity */
                <div 
                  id="specific-overlay-detail-box" 
                  className={`p-3 rounded flex flex-col gap-2 text-justify animate-fade-in ${
                    selectedOverlayEntity.type === 'road'
                      ? 'border-l-3 border-l-[#fbbf24] bg-[#fbbf24]/10 text-white'
                      : 'border-l-3 border-l-[#ea5d3c] bg-[#ea5d3c]/10 text-white'
                  }`}
                >
                  <div className="flex items-center gap-1.5 font-bold text-white leading-tight">
                    {selectedOverlayEntity.type === 'road' 
                      ? <MapPin className="h-4 w-4 text-[#fbbf24]" />
                      : <ArrowRightLeft className="h-4 w-4 text-[#ea5d3c]" />
                    }
                    <h4 className="not-italic text-[11px] uppercase tracking-wide text-white">
                      {selectedOverlayEntity.title}
                    </h4>
                  </div>
                  <p className="text-[10px] text-[#dfd9ce]/95 leading-relaxed font-light">
                    {selectedOverlayEntity.details}
                  </p>
                  <div className="text-[9.5px] text-[#ea996c] border-t border-white/10 pt-1.5 font-sans leading-relaxed">
                    <span className="font-bold text-white block mb-0.5">🔬 Evidência Acadêmica / Scientific Evidence:</span>
                    {selectedOverlayEntity.evidence}
                  </div>
                </div>
              ) : (
                /* List of active overlays instructions or static content */
                activeOverlays.map(over => {
                  let badgeCol = 'bg-slate-700/80';
                  let iconEl = <Flame className="h-4 w-4 text-[#ea5d3c]" />;
                  let titleT = '';
                  let descT = '';
                  let evidenceT = '';

                  // Check if this is interactive line-based overlay
                  if (over === 'paved_roads') {
                    return (
                      <div key={over} className="p-3 bg-[#fbbf24]/5 border border-[#fbbf24]/20 rounded flex flex-col gap-1.5 text-justify text-[#ebdcc5]">
                        <div className="flex items-center gap-1.5 font-bold text-white leading-none">
                          <MapPin className="h-4 w-4 text-[#fbbf24]" />
                          <h4 className="not-italic text-[10.5px] uppercase tracking-wider text-[#fbbf24]">{oLabels.paved_roads}</h4>
                        </div>
                        <p className="text-[9.5px] leading-relaxed italic text-white/90">
                          {language === 'pt'
                            ? "🛣️ Estradas Pavimentadas prontas! Clique direto em qualquer linha dourada/amarela no mapa para ver nome e análises físicas detalhadas."
                            : "🛣️ Paved Roads ready! Click directly on any golden/yellow line on the map to see its physical analysis and historic details."}
                        </p>
                        <div className="text-[9px] text-[#c5a880] leading-tight border-t border-white/5 pt-1">
                          {language === 'pt'
                            ? "Exemplos: Estrada de Moeris (c. 2600 a.C.), vias púnicas pavimentadas, caminhos de pedra de Axum."
                            : "Examples: Lake Moeris road (c. 2600 BCE), Punic intra-city lanes, Aksumite stone highways."}
                        </div>
                      </div>
                    );
                  }

                  if (over === 'state_couriers') {
                    return (
                      <div key={over} className="p-3 bg-[#7a2c22]/10 border border-[#7a2c22]/40 rounded flex flex-col gap-1.5 text-justify text-[#ebdcc5]">
                        <div className="flex items-center gap-1.5 font-bold text-white leading-none">
                          <ArrowRightLeft className="h-4 w-4 text-[#ea5d3c]" />
                          <h4 className="not-italic text-[10.5px] uppercase tracking-wider text-[#ea5d3c]">{oLabels.state_couriers}</h4>
                        </div>
                        <p className="text-[9.5px] leading-relaxed italic text-white/90">
                          {language === 'pt'
                            ? "📮 Rede Postal Ativa! Clique na linha vermelha animada para investigar a velocidade, mensageiros e relevos."
                            : "📮 Imperial Post Active! Click any animated red line on the map to inspect speed, runners, and relays."}
                        </p>
                        <div className="text-[9px] text-[#c5a880] leading-tight border-t border-white/5 pt-1">
                          {language === 'pt'
                            ? "Exemplos: Mensageiros do Nilo, jinetes imperiais de cavalaria Mali-Songai, corredores rápidos Nambas do Kongo."
                            : "Examples: Nile River dispatch canoe grids, Mali horse couriers, holy Nambas runners of Kongo."}
                        </div>
                      </div>
                    );
                  }

                  if (over === 'metallurgy') {
                    badgeCol = 'border-l-3 border-l-[#ea5d3c] bg-[#ea5d3c]/10 text-white';
                    titleT = oLabels.metallurgy;
                    descT = oLabels.metallurgyDesc;
                    evidenceT = language === 'pt' 
                      ? "Exemplos no mapa: Fornos de fundição de Taruga (Cultura Nok) e minas reais de ferro em Méroe."
                      : "Map Examples: Taruga smelting furnaces (Nok Culture) and imperial ironworks in Méroë.";
                  } else if (over === 'matriarchy') {
                    iconEl = <Crown className="h-4 w-4 text-[#8d3cbc]" />;
                    badgeCol = 'border-l-3 border-l-[#8d3cbc] bg-[#8d3cbc]/10 text-white';
                    titleT = oLabels.matriarchy;
                    descT = oLabels.matriarchyDesc;
                    evidenceT = language === 'pt'
                      ? "Exemplos no mapa: Linha dinástica das Candaces guerreiras em Kush (Méroe) e herança real de trono matrilinear Ashanti."
                      : "Map Examples: Warrior Kandake lineage in Kush (Meroë) and matrilineal Ashanti queens.";
                  } else if (over === 'writing_systems' || over === 'writing') {
                    iconEl = <Scroll className="h-4 w-4 text-[#20898c]" />;
                    badgeCol = 'border-l-3 border-l-[#20898c] bg-[#20898c]/10 text-white';
                    titleT = oLabels.writing;
                    descT = oLabels.writingDesc;
                    evidenceT = language === 'pt'
                      ? "Exemplos no mapa: Hieróglifos do Nilo (Kemet), Escrita Meroítica original, silabário Ge'ez de Axum, Tifinagh de Cartago."
                      : "Map Examples: Nile Valley Hieroglyphs, original Meroitic script, Ge'ez syllabary in Aksum, Tifinagh in Carthage.";
                  } else if (over === 'trade_currency') {
                    iconEl = <Coins className="h-4 w-4 text-[#d99c15]" />;
                    badgeCol = 'border-l-3 border-l-[#d99c15] bg-[#d99c15]/10 text-white';
                    titleT = oLabels.trade_currency;
                    descT = oLabels.trade_currencyDesc;
                    evidenceT = language === 'pt'
                      ? "Exemplos no mapa: Cunhagem de moedas de ouro de Axum e Kilwa, pó de ouro e conchas nzimbu no Kongo."
                      : "Map Examples: Gold coin mints of Aksum and Kilwa, gold-dust exchange and Kongo's nzimbu shells.";
                  } else if (over === 'monumental_architecture') {
                    iconEl = <Landmark className="h-4 w-4 text-[#a35d37]" />;
                    badgeCol = 'border-l-3 border-l-[#a35d37] bg-[#a35d37]/10 text-white';
                    titleT = oLabels.architecture;
                    descT = oLabels.architectureDesc;
                    evidenceT = language === 'pt'
                      ? "Exemplos no mapa: Obeliscos gigantes de Axum, pirâmides íngremes de Nubia, muralhas de pedra do Grande Zimbabue."
                      : "Map Examples: Monolithic Obelisks of Aksum, steep pyramids of Nubia, mortarless granite walls of Great Zimbabwe.";
                  } else if (over === 'hydraulic_agriculture') {
                    iconEl = <Droplet className="h-4 w-4 text-[#0f8a5f]" />;
                    badgeCol = 'border-l-3 border-l-[#0f8a5f] bg-[#0f8a5f]/10 text-white';
                    titleT = oLabels.hydraulic_agriculture;
                    descT = oLabels.hydraulic_agricultureDesc;
                    evidenceT = language === 'pt'
                      ? "Exemplos no mapa: Bacias de cheias do Nilo, reservatórios circulares 'hafirs' de Cuxe, foggaras de Garamantas."
                      : "Map Examples: Dynastic Nile flood basins, artificial reservoirs 'hafirs' in Kush, underground foggaras of Garamantes.";
                  }

                  return (
                    <div key={over} className={`p-2.5 rounded flex flex-col gap-1 text-justify ${badgeCol}`}>
                      <div className="flex items-center gap-1.5 font-bold text-white leading-none">
                        {iconEl}
                        <h4 className="not-italic text-[10.5px] tracking-tight">{titleT}</h4>
                      </div>
                      <p className="text-[10px] text-[#dfd9ce]/90 leading-relaxed font-light">
                        {descT}
                      </p>
                      <div className="text-[9px] text-[#ea996c] border-t border-white/5 pt-1 font-mono leading-tight">
                        📍 {evidenceT}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
            
            <div className="text-[8px] text-[#c5a880] text-center font-serif leading-none border-t border-[#ebdcc5]/10 pt-1.5">
              Seshat Global History Databank © 2026
            </div>
          </div>
        )}

        {/* Empty boundary fallback */}
        {filteredPoints.length === 0 && (
          <div className="absolute text-[#8b7e66] text-xs font-serif italic text-center max-w-[200px] z-20">
            Nenhuma civilização atende aos filtros de data ou região. Por favor, redefina os filtros.
          </div>
        )}
      </div>

      {/* 🧭 Painel de Timelapse - Áreas de Influência Fluida Dinâmicas */}
      <div 
        id="timelapse-dashboard-panel"
        className="mt-3.5 bg-[#fbfbf8] border border-[#e5dfd5] rounded-lg p-3.5 flex flex-col gap-3 shadow-xs"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#e5dfd5]/45 pb-2">
          <div className="flex items-center gap-2">
            <Layers className="h-4.5 w-4.5 text-[#7a2c22] shrink-0 animate-pulse" />
            <div>
              <h4 className="font-serif text-[11px] font-extrabold uppercase tracking-wide text-[#7a2c22]">
                {language === 'pt' ? 'Mapeamento de Áreas de Influência Fluida' : 'Mapping of Fluid Areas of Influence'}
              </h4>
              <p className="text-[9.5px] text-[#8c8273] leading-tight">
                {language === 'pt' 
                  ? 'Os territórios acendem e apagam com gradientes circulares coloridos e suaves.' 
                  : 'Territories light up and fade with smooth, colorful circular gradients.'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-[14px] font-mono font-black text-[#7a2c22] bg-white border border-[#e5dfd5] px-2.5 py-0.5 rounded shadow-xs animate-pulse">
              {timelineYear < 0 ? `${Math.abs(timelineYear)} a.C. / BC` : `${timelineYear} d.C. / AD`}
            </span>
            <label className="flex items-center gap-1.5 cursor-pointer text-[10px] font-bold text-slate-600 select-none">
              <input 
                id="toggle-fluid-areas"
                type="checkbox"
                checked={viewFluidAreas}
                onChange={(e) => setViewFluidAreas(e.target.checked)}
                className="rounded text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] accent-[#7a2c22] cursor-pointer"
              />
              {language === 'pt' ? 'Glow Ativo' : 'Active Glow'}
            </label>
          </div>
        </div>

        {/* Advanced Model Configurations Bento Grid */}
        {viewFluidAreas && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 bg-[#faf9f4] border border-[#ebdcc5]/40 rounded-md p-3 text-[10px] font-sans text-slate-700 animate-fade-in shadow-xs">
            {/* Column 1: Spheres / Partition Representation Selector */}
            <div className="flex flex-col gap-1.5 border-r border-[#e5dfd5]/45 pr-2 last:border-0">
              <span className="font-black text-[#7a2c22] uppercase tracking-wide text-[9px] flex items-center gap-1">
                <Globe className="h-3.5 w-3.5" />
                {language === 'pt' ? 'MODELO DE TERRITÓRIO' : 'TERRITORY MODEL'}
              </span>
              <div className="flex flex-col gap-1.5">
                <label className="flex items-start gap-1.5 cursor-pointer select-none font-medium text-[9.5px]">
                  <input 
                    type="radio" 
                    name="timelapseMode" 
                    checked={timelapseMode === 'concentric'} 
                    onChange={() => setTimelapseMode('concentric')}
                    className="text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] mt-0.5 cursor-pointer"
                  />
                  <span>
                    <strong className="text-slate-800 font-bold block leading-none">{language === 'pt' ? 'Contornos de Densidade' : 'Density Contours'}</strong>
                    <span className="text-[8.5px] text-[#8c8273]">{language === 'pt' ? 'Anéis concêntricos Core/Hinterland' : 'Concentric Core/Hinterland rings'}</span>
                  </span>
                </label>
                <label className="flex items-start gap-1.5 cursor-pointer select-none font-medium text-[9.5px]">
                  <input 
                    type="radio" 
                    name="timelapseMode" 
                    checked={timelapseMode === 'voronoi'} 
                    onChange={() => setTimelapseMode('voronoi')}
                    className="text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] mt-0.5 cursor-pointer"
                  />
                  <span>
                    <strong className="text-slate-800 font-bold block leading-none">{language === 'pt' ? 'Voronoi Geopolítico' : 'Geopolitical Voronoi'}</strong>
                    <span className="text-[8.5px] text-[#8c8273]">{language === 'pt' ? 'Balanço geopolítico com transição fluida' : 'Dynamic mathematical partitions'}</span>
                  </span>
                </label>
                <label className="flex items-start gap-1.5 cursor-pointer select-none font-medium text-[9.5px]">
                  <input 
                    type="radio" 
                    name="timelapseMode" 
                    checked={timelapseMode === 'standard'} 
                    onChange={() => setTimelapseMode('standard')}
                    className="text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] mt-0.5 cursor-pointer"
                  />
                  <span>
                    <strong className="text-slate-800 font-bold block leading-none">{language === 'pt' ? 'Brilho Fluido Clássico' : 'Classic Fluid Glow'}</strong>
                    <span className="text-[8.5px] text-[#8c8273]">{language === 'pt' ? 'Círculos sombreados tradicionais do mapa' : 'Traditional simplified visual gradients'}</span>
                  </span>
                </label>
              </div>
            </div>

            {/* Column 2: Conducive Flows (Redes de Fluxo Conducentes) */}
            <div className="flex flex-col gap-1.5 border-r border-[#e5dfd5]/45 pr-2 last:border-0 justify-start">
              <span className="font-black text-[#7a2c22] uppercase tracking-wide text-[9px] flex items-center gap-1">
                <ArrowRightLeft className="h-3.5 w-3.5" />
                {language === 'pt' ? 'REDES DE FLUXO' : 'FLOW NETWORKS'}
              </span>
              <label className="flex items-start gap-2 cursor-pointer select-none font-medium text-[9.5px]">
                <input 
                  type="checkbox" 
                  checked={enableConduciveFlows} 
                  onChange={(e) => setEnableConduciveFlows(e.target.checked)}
                  className="rounded text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] mt-0.5 cursor-pointer"
                />
                <span>
                  <strong className="text-slate-800 font-bold block leading-none">{language === 'pt' ? 'Fluxos Conducentes' : 'Conducive Flows'}</strong>
                  <span className="text-[8.5px] text-[#8c8273] leading-tight block">
                    {language === 'pt' 
                      ? 'Acende e envia pulsações ao longo de rodovias e rotas postais imperiais ativas.' 
                      : 'Lights up and sends pulses along active imperial highways and postal channels.'}
                  </span>
                </span>
              </label>
            </div>

            {/* Column 3: Shockwave Ripples (Histórico de Ondas de Choque) */}
            <div className="flex flex-col gap-1.5 justify-start">
              <span className="font-black text-[#7a2c22] uppercase tracking-wide text-[9px] flex items-center gap-1">
                <Flame className="h-3.5 w-3.5 animate-pulse" />
                {language === 'pt' ? 'ONDAS DE CHOQUE (RIPPLES)' : 'EVENT RIPPLES'}
              </span>
              <label className="flex items-start gap-2 cursor-pointer select-none font-medium text-[9.5px]">
                <input 
                  type="checkbox" 
                  checked={enableCriticalRipples} 
                  onChange={(e) => setEnableCriticalRipples(e.target.checked)}
                  className="rounded text-[#7a2c22] focus:ring-[#7a2c22] border-[#e5dfd5] mt-0.5 cursor-pointer"
                />
                <span>
                  <strong className="text-slate-800 font-bold block leading-none">{language === 'pt' ? 'Ondas Críticas' : 'Critical Ripples'}</strong>
                  <span className="text-[8.5px] text-[#8c8273] leading-tight block">
                    {language === 'pt' 
                      ? 'Dispara choque circulares e flutua cartões com os marcos arqueológicos e datas exatas.' 
                      : 'Fires radial shockwaves and floats cards showing archaeological milestones at exact years.'}
                  </span>
                </span>
              </label>
            </div>
          </div>
        )}

        {/* Play and Slider Controls */}
        <div className="flex items-center gap-4">
          <button
            id="btn-play-timelapse"
            type="button"
            onClick={() => setIsTimelinePlaying(!isTimelinePlaying)}
            className={`px-4 py-2 rounded text-[11px] font-black uppercase tracking-wider flex items-center gap-1.5 transition-all cursor-pointer border ${
              isTimelinePlaying
                ? 'bg-[#ea5d3c] border-[#d94e2a] text-white shadow-sm'
                : 'bg-[#7a2c22] border-[#5a1c15] text-[#faf9f4] hover:bg-[#862e24] shadow-sm'
            }`}
          >
            <span>{isTimelinePlaying ? '⏸️ PAUSE' : '▶️ PLAY TIMELAPSE'}</span>
          </button>

          <div className="flex-1 flex flex-col gap-1">
            <input
              id="timelapse-year-slider"
              type="range"
              min="-3000"
              max="1800"
              step="50"
              value={timelineYear}
              onChange={(e) => {
                setTimelineYear(parseInt(e.target.value));
                if (isTimelinePlaying) setIsTimelinePlaying(false);
              }}
              className="w-full h-2 bg-[#e5dfd5] rounded-lg appearance-none cursor-ew-resize accent-[#7a2c22] focus:outline-none transition-all"
            />
            <div className="flex justify-between text-[8px] font-mono text-slate-500 px-0.5">
              <span>-3000 AC</span>
              <span>-1500 AC</span>
              <span>0 (ERA COMUM)</span>
              <span>900 DC</span>
              <span>1800 DC</span>
            </div>
          </div>
        </div>

        {/* Quick Navigate to Milestone Chips */}
        {enableCriticalRipples && (
          <div className="flex flex-col gap-1 border-t border-[#e5dfd5]/45 pt-2">
            <span className="text-[8.5px] font-extrabold uppercase tracking-widest text-[#7a2c22]/80 font-mono">
              📌 {language === 'pt' ? 'Atalhos de Marcos Históricos (Clique para viajar no tempo)' : 'Historic Milestone Shortcuts (Click to time-travel)'}
            </span>
            <div className="flex flex-wrap gap-1.5 max-h-[75px] overflow-y-auto pr-1 pb-1">
              {CRITICAL_EVENTS.map((ev) => {
                const isCurrent = timelineYear >= ev.year && timelineYear <= ev.year + 250;
                const formattedYear = ev.year < 0 ? `${Math.abs(ev.year)} a.C.` : `${ev.year} d.C.`;
                const title = language === 'pt' ? ev.ptTitle : ev.enTitle;
                return (
                  <button
                    key={`shortcut-ev-${ev.pointId}-${ev.year}`}
                    type="button"
                    onClick={() => {
                      setTimelineYear(ev.year);
                      setIsTimelinePlaying(false);
                      // Set lastPausedEventKey to this so it is paused on this event and doesn't auto-pause again
                      setLastPausedEventKey(`${ev.pointId}-${ev.year}`);
                    }}
                    className={`px-2 py-0.5 rounded text-[9.5px] font-sans transition-all cursor-pointer flex items-center gap-1.5 border ${
                      isCurrent
                        ? 'bg-[#7a2c22] border-[#5a1c15] text-[#faf9f4] font-bold shadow-xs'
                        : 'bg-[#faf9f4] hover:bg-amber-50/70 border-[#e5dfd5] text-[#5c544d] hover:text-[#7a2c22]'
                    }`}
                    title={`${formattedYear} - ${title}`}
                  >
                    <span className={`w-1.5 h-1.5 rounded-full ${isCurrent ? 'bg-[#ea5d3c] animate-ping' : 'bg-slate-400'}`} />
                    <span className="font-mono text-[9px] font-black">{formattedYear}</span>
                    <span className="truncate max-w-[130px] sm:max-w-[180px]">{title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Cartographic Legend */}
      <div className="mt-4 flex flex-wrap gap-4 justify-between items-center text-xs font-sans border-t border-[#e5dfd5]/85 pt-3">
        <div className="flex gap-4 items-center flex-wrap">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#7a2c22] border border-[#501c15]" />
            <span className="text-[#5c544d] font-serif text-[11px]">{t.pre_bronze}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#c5a880] border border-[#957c5a]" />
            <span className="text-[#5c544d] font-serif text-[11px]">{t.antiquity}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#5f8774] border border-[#3e5a4d]" />
            <span className="text-[#5c544d] font-serif text-[11px]">{t.classical_era}</span>
          </div>
          <div className="flex items-center gap-1.5 text-[#8a8174]">
            <ArrowRightLeft className="w-3.5 h-3.5 text-[#9c8262]" />
            <span className="text-[10px] italic">Banda de rotas comerciais interconectadas</span>
          </div>
        </div>

        <div className="text-[#8c8273] text-[10px] font-mono">
          Modelos: {filteredPoints.length} atlas ativos
        </div>
      </div>
    </div>
  );
}
