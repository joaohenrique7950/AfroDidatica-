/**
 * Dynamic content translator utilizing Google's keyless client-side translation API.
 * Highly responsive, robust, and supports all major continent/world-region languages.
 */
export async function translateText(text: string, targetLang: string, sourceLang: string = 'auto'): Promise<string> {
  if (!text || !text.trim()) return '';

  // Chunk text to prevent hitting URL length limit
  const chunks = chunkTextByLines(text, 1200);

  try {
    const translatedChunks = await Promise.all(
      chunks.map(async (chunk) => {
        // Safe keyless gtx API endpoint
        const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&q=${encodeURIComponent(chunk)}`;
        const response = await fetch(url);
        
        if (!response.ok) {
          throw new Error(`Translator service responded with code: ${response.status}`);
        }

        const data = await response.json();
        
        // Parse nested sentence responses
        if (data && data[0]) {
          const segments = data[0];
          let chunkResult = '';
          for (let i = 0; i < segments.length; i++) {
            if (segments[i] && segments[i][0]) {
              chunkResult += segments[i][0];
            }
          }
          return chunkResult;
        }
        return chunk;
      })
    );

    return translatedChunks.join('\n');
  } catch (error) {
    console.error('Translation failed. Returning source markdown...', error);
    return text;
  }
}

/**
 * Helper to split text on logical line breaks or paragraph wrappers, preserving markdown formatting.
 */
function chunkTextByLines(text: string, maxLength: number): string[] {
  const chunks: string[] = [];
  const lines = text.split('\n');
  let currentChunk: string[] = [];
  let currentLength = 0;

  for (const line of lines) {
    // If the line itself is massive, chunk it aggressively
    if (line.length > maxLength) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
        currentChunk = [];
        currentLength = 0;
      }
      
      const subchunks = line.match(new RegExp(`.{1,${maxLength}}`, 'g')) || [line];
      for (const sc of subchunks) {
        chunks.push(sc);
      }
      continue;
    }

    if (currentLength + line.length + 1 > maxLength) {
      if (currentChunk.length > 0) {
        chunks.push(currentChunk.join('\n'));
      }
      currentChunk = [line];
      currentLength = line.length;
    } else {
      currentChunk.push(line);
      currentLength += line.length + 1;
    }
  }

  if (currentChunk.length > 0) {
    chunks.push(currentChunk.join('\n'));
  }

  return chunks;
}

/**
 * List of languages supported across world regions/continents
 */
export interface WorldLanguage {
  code: string;
  name: string;
  region: string;
  flag: string;
}

export const WORLD_LANGUAGES: WorldLanguage[] = [
  // Europe & Americas
  { code: 'pt', name: 'Português', region: 'Americas / Europe', flag: '🇧🇷' },
  { code: 'en', name: 'English', region: 'Americas / Global', flag: '🇺🇸' },
  { code: 'es', name: 'Español', region: 'Americas / Europe', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', region: 'Europe / Africa', flag: '🇫🇷' },
  { code: 'it', name: 'Italiano', region: 'Europe', flag: '🇮🇹' },
  { code: 'de', name: 'Deutsch', region: 'Europe', flag: '🇩🇪' },
  
  // Africa
  { code: 'sw', name: 'Kiswahili', region: 'East Africa', flag: '🇰🇪' },
  { code: 'yo', name: 'Yorùbá', region: 'West Africa', flag: '🇳🇬' },
  { code: 'zu', name: 'isiZulu', region: 'Southern Africa', flag: '🇿🇦' },
  { code: 'am', name: 'Amharic (አማርኛ)', region: 'Horn of Africa', flag: '🇪🇹' },
  { code: 'ar', name: 'العربية', region: 'North Africa / Middle East', flag: '🇪🇬' },
  
  // Asia & Oceania
  { code: 'hi', name: 'Hindi (हिन्दी)', region: 'South Asia', flag: '🇮🇳' },
  { code: 'bn', name: 'Bengali (বাংলা)', region: 'South Asia', flag: '🇧🇩' },
  { code: 'zh-CN', name: 'Mandarin (🇨🇳)', region: 'East Asia', flag: '🇨🇳' },
  { code: 'ja', name: 'Japanese (日本語)', region: 'East Asia', flag: '🇯🇵' },
  { code: 'ko', name: 'Korean (한국어)', region: 'East Asia', flag: '🇰🇷' },
  { code: 'vi', name: 'Tiếng Việt', region: 'Southeast Asia', flag: '🇻🇳' },
  { code: 'id', name: 'Bahasa Indonesia', region: 'Southeast Asia', flag: '🇮🇩' },
];

import { HistoricalPoint } from '../types';

/**
 * Translates an entire dictionary of UI strings to the target language in a single batch.
 * Leverages structured index prefixing to keep mappings secure across API translation.
 */
export async function translateDictionary(
  dict: Record<string, string>,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<Record<string, string>> {
  if (targetLang === sourceLang) return dict;
  
  const keys = Object.keys(dict);
  const values = keys.map(k => dict[k]);
  
  // Create indexed lines to preserve order and key binding perfectly
  const serialized = values.map((val, idx) => `[${idx}] ${val}`).join('\n');
  
  try {
    const translatedText = await translateText(serialized, targetLang, sourceLang);
    const translatedLines = translatedText.split('\n');
    
    const result: Record<string, string> = { ...dict };
    
    for (const line of translatedLines) {
      const match = line.match(/^\[(\d+)\]\s*(.*)$/);
      if (match) {
        const idx = parseInt(match[1], 10);
        const val = match[2].trim();
        if (idx >= 0 && idx < keys.length && val) {
          result[keys[idx]] = val;
        }
      }
    }
    return result;
  } catch (error) {
    console.error(`Dictionary batch translation from ${sourceLang} to ${targetLang} failed:`, error);
    return dict;
  }
}

/**
 * Translates a complete HistoricalPoint on demand (on point select), keeping coordinates intact.
 */
export async function translatePoint(
  point: HistoricalPoint,
  targetLang: string,
  sourceLang: string = 'en'
): Promise<HistoricalPoint> {
  // If already present or custom translation is ready, skip
  if (point.name[targetLang]) {
    return point;
  }

  try {
    const src = point.name[sourceLang] ? sourceLang : (point.name['pt'] ? 'pt' : 'en');
    
    // Batch translate core text fields
    const corePromises = [
      translateText(point.name[src] || '', targetLang, src),
      translateText(point.description[src] || '', targetLang, src),
      translateText(point.period[src] || '', targetLang, src),
      translateText(point.regionLabel[src] || '', targetLang, src),
      translateText(point.eraLabel[src] || '', targetLang, src),
    ];
    
    const [tName, tDesc, tPeriod, tRegion, tEra] = await Promise.all(corePromises);

    // Dynamic translation for primary source documents
    let translatedDocs = point.primaryDocuments || [];
    if (point.primaryDocuments && point.primaryDocuments.length > 0) {
      translatedDocs = await Promise.all(
        point.primaryDocuments.map(async (doc) => {
          const docSrc = doc.title[src] ? src : (doc.title['pt'] ? 'pt' : 'en');
          const [tTitle, tSource, tContent] = await Promise.all([
            translateText(doc.title[docSrc] || '', targetLang, docSrc),
            translateText(doc.source[docSrc] || '', targetLang, docSrc),
            translateText(doc.content[docSrc] || '', targetLang, docSrc)
          ]);
          return {
            ...doc,
            title: { ...doc.title, [targetLang]: tTitle },
            source: { ...doc.source, [targetLang]: tSource },
            content: { ...doc.content, [targetLang]: tContent }
          };
        })
      );
    }

    // Dynamic translation for academic reference notes
    let translatedBib = point.bibliography || [];
    if (point.bibliography && point.bibliography.length > 0) {
      translatedBib = await Promise.all(
        point.bibliography.map(async (bib) => {
          if (!bib.note) return bib;
          const bibSrc = bib.note[src] ? src : (bib.note['pt'] ? 'pt' : 'en');
          const tNote = await translateText(bib.note[bibSrc] || '', targetLang, bibSrc);
          return {
            ...bib,
            note: { ...bib.note, [targetLang]: tNote }
          };
        })
      );
    }

    // Dynamic translation for Seshat historical variables
    let translatedSeshat = point.seshatData;
    if (point.seshatData) {
      const seshatKeys = Object.keys(point.seshatData) as Array<keyof typeof point.seshatData>;
      const tSeshatData: any = {};
      
      await Promise.all(
        seshatKeys.map(async (key) => {
          const fieldObj = point.seshatData![key];
          if (fieldObj) {
            const fSrc = fieldObj[src] ? src : (fieldObj['pt'] ? 'pt' : 'en');
            const tVal = await translateText(fieldObj[fSrc] || '', targetLang, fSrc);
            tSeshatData[key] = { ...fieldObj, [targetLang]: tVal };
          }
        })
      );
      
      translatedSeshat = { ...point.seshatData, ...tSeshatData };
    }

    return {
      ...point,
      name: { ...point.name, [targetLang]: tName || point.name[src] },
      description: { ...point.description, [targetLang]: tDesc || point.description[src] },
      period: { ...point.period, [targetLang]: tPeriod || point.period[src] },
      regionLabel: { ...point.regionLabel, [targetLang]: tRegion || point.regionLabel[src] },
      eraLabel: { ...point.eraLabel, [targetLang]: tEra || point.eraLabel[src] },
      primaryDocuments: translatedDocs,
      bibliography: translatedBib,
      seshatData: translatedSeshat
    };
  } catch (error) {
    console.error(`Failed to on-demand translate point ${point.id} to ${targetLang}:`, error);
    return point;
  }
}

