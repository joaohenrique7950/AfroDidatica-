import { jsPDF } from 'jspdf';
import { GeneratedPedagogy, Language } from '../types';

interface TextSegment {
  text: string;
  isBold: boolean;
}

/**
 * Parses a line containing '**' into text segments with bold markers.
 */
function parseTextSegments(text: string): TextSegment[] {
  const parts = text.split('**');
  return parts.map((part, index) => ({
    text: part,
    isBold: index % 2 !== 0
  }));
}

/**
 * Formats and generates a beautiful, high-quality PDF from a GeneratedPedagogy resource
 */
export function generatePedagogyPDF(resource: GeneratedPedagogy, gradeLevel: string = '') {
  const doc = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4'
  });

  const pageHeight = 297;
  const pageWidth = 210;
  const marginX = 20;
  const printableWidth = pageWidth - (marginX * 2); // 170mm

  // Styled branding colors
  const primaryColor = [122, 44, 34]; // Charcoal red/terracotta (#7a2c22)
  const textColor = [44, 35, 30]; // Soft charcoal (#2c231e)
  const grayColor = [92, 84, 77]; // Secondary slate gray (#5c544d)
  const lightBgColor = [250, 248, 243]; // Off-white/cream (#faf8f3)
  const outlineColor = [229, 223, 213]; // Soft border (#e5dfd5)

  let yCursor = 25;
  let pageNumber = 1;

  // Translation helpers for PDF metadata
  const translations = {
    pt: {
      header: 'AFRODIDÁTICA: PORTAL PEDAGÓGICO',
      civilization: 'Sítio / Civilização: ',
      format: 'Formato: ',
      created: 'Criado em: ',
      lang: 'Idioma: ',
      grade: 'Nível de Ensino: ',
      footer: 'AfroDidática • Base de Dados Alinhada ao Seshat',
      lesson_plan: 'Plano de Aula',
      activity: 'Atividade Prática',
      didactic_sequence: 'Sequência Didática',
      primary: 'Ensino Fundamental I',
      middle: 'Ensino Fundamental II',
      high: 'Ensino Médio',
      university: 'Ensino Superior'
    },
    en: {
      header: 'AFRODIDÁTICA: PEDAGOGICAL PORTAL',
      civilization: 'Site / Civilization: ',
      format: 'Format: ',
      created: 'Created on: ',
      lang: 'Language: ',
      grade: 'Grade Level: ',
      footer: 'AfroDidática • Database Aligned with Seshat',
      lesson_plan: 'Lesson Plan',
      activity: 'Practical Activity',
      didactic_sequence: 'Didactic Sequence',
      primary: 'Primary School',
      middle: 'Middle School',
      high: 'High School',
      university: 'Higher Education'
    },
    fr: {
      header: 'AFRODIDÁTICA : PORTAIL PÉDAGOGIQUE',
      civilization: 'Site / Civilisation : ',
      format: 'Format : ',
      created: 'Créé le : ',
      lang: 'Langue : ',
      grade: 'Niveau Scolaire : ',
      footer: 'AfroDidática • Base de Données Directe Seshat',
      lesson_plan: 'Plan de Cours',
      activity: 'Activité Pratique',
      didactic_sequence: 'Séquence Didactique',
      primary: 'École Primaire',
      middle: 'Collège',
      high: 'Lycée',
      university: 'Enseignement Supérieur'
    },
    es: {
      header: 'AFRODIDÁTICA: PORTAL PEDAGÓGICO',
      civilization: 'Sitio / Civilización: ',
      format: 'Formato: ',
      created: 'Creado el: ',
      lang: 'Idioma: ',
      grade: 'Nivel Escolar: ',
      footer: 'AfroDidática • Base de Datos Directa Seshat',
      lesson_plan: 'Plan de Clase',
      activity: 'Actividad Práctica',
      didactic_sequence: 'Secuencia Didáctica',
      primary: 'Primaria',
      middle: 'Secundaria',
      high: 'Preparatoria / Bachillerato',
      university: 'Universidad'
    }
  };

  const activeLang = resource.language in translations ? resource.language : 'pt';
  const labels = translations[activeLang];

  const formatLabel = labels[resource.format] || resource.format;
  const gradeLabel = gradeLevel ? (labels[gradeLevel as keyof typeof labels] || gradeLevel) : '';

  /**
   * Helper to draw headers and footers on pages
   */
  const drawPageDecoration = (pageNum: number) => {
    // Top border accent
    doc.setFillColor(primaryColor[0], primaryColor[1], primaryColor[2]);
    doc.rect(0, 0, pageWidth, 4, 'F');

    // Page margin line or header text (from page 2 onwards)
    if (pageNum > 1) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(labels.header, marginX, 12);
      
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(8);
      doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
      doc.text(resource.title.substring(0, 50) + (resource.title.length > 50 ? '...' : ''), pageWidth - marginX - 60, 12, { align: 'right' });

      doc.setDrawColor(outlineColor[0], outlineColor[1], outlineColor[2]);
      doc.setLineWidth(0.2);
      doc.line(marginX, 14, pageWidth - marginX, 14);
    }

    // Footers
    doc.setDrawColor(outlineColor[0], outlineColor[1], outlineColor[2]);
    doc.setLineWidth(0.2);
    doc.line(marginX, pageHeight - 15, pageWidth - marginX, pageHeight - 15);

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(grayColor[0], grayColor[1], grayColor[2]);
    doc.text(labels.footer, marginX, pageHeight - 10);
    doc.text(`${pageNum}`, pageWidth - marginX, pageHeight - 10, { align: 'right' });
  };

  /**
   * Check height and add a new page if necessary
   */
  const checkPageBreak = (neededHeight: number) => {
    if (yCursor + neededHeight > pageHeight - 20) {
      doc.addPage();
      pageNumber += 1;
      drawPageDecoration(pageNumber);
      yCursor = 22; // Start coordinates on subsequent pages
      return true;
    }
    return false;
  };

  // --- RENDERING PAGE 1 HEADER ---
  drawPageDecoration(1);

  // Portal Super Header text
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.text(labels.header, marginX, 15);

  yCursor = 20;
  doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  doc.setLineWidth(1.2);
  doc.line(marginX, yCursor, pageWidth - marginX, yCursor);

  // Document Title
  yCursor += 10;
  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
  
  const wrappedTitle = doc.splitTextToSize(resource.title, printableWidth);
  wrappedTitle.forEach((line: string) => {
    doc.text(line, marginX, yCursor);
    yCursor += 9;
  });

  // Space before Meta Box
  yCursor += 1;

  // Metadata Display Box (Beige)
  doc.setFillColor(lightBgColor[0], lightBgColor[1], lightBgColor[2]);
  doc.setDrawColor(outlineColor[0], outlineColor[1], outlineColor[2]);
  doc.setLineWidth(0.3);
  doc.rect(marginX, yCursor, printableWidth, gradeLabel ? 26 : 21, 'FD');

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(9.5);
  doc.setTextColor(textColor[0], textColor[1], textColor[2]);

  let boxY = yCursor + 6;

  // Left Column
  doc.text(labels.civilization, marginX + 5, boxY);
  doc.setFont('helvetica', 'normal');
  doc.text(resource.pointName, marginX + 38, boxY);
  
  doc.setFont('helvetica', 'bold');
  doc.text(labels.format, marginX + 5, boxY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(formatLabel, marginX + 38, boxY + 6);

  // Right Column
  doc.setFont('helvetica', 'bold');
  doc.text(labels.created, marginX + 90, boxY);
  doc.setFont('helvetica', 'normal');
  doc.text(resource.createdAt, marginX + 115, boxY);

  doc.setFont('helvetica', 'bold');
  doc.text(labels.lang, marginX + 90, boxY + 6);
  doc.setFont('helvetica', 'normal');
  doc.text(resource.language.toUpperCase(), marginX + 115, boxY + 6);

  if (gradeLabel) {
    doc.setFont('helvetica', 'bold');
    doc.text(labels.grade, marginX + 5, boxY + 12);
    doc.setFont('helvetica', 'normal');
    doc.text(gradeLabel, marginX + 38, boxY + 12);
  }

  yCursor += (gradeLabel ? 32 : 27);

  // --- RENDERING BODY CONTENT ---
  // Let's divide content by lines and group into paragraphs
  const rawLines = resource.content.split('\n');
  
  // Custom smart rendering
  for (let i = 0; i < rawLines.length; i++) {
    const line = rawLines[i].trim();
    if (!line) {
      yCursor += 3.5; // blank line
      continue;
    }

    // Horizontal Rule
    if (line.startsWith('---')) {
      checkPageBreak(8);
      yCursor += 2;
      doc.setDrawColor(outlineColor[0], outlineColor[1], outlineColor[2]);
      doc.setLineWidth(0.4);
      doc.line(marginX, yCursor, pageWidth - marginX, yCursor);
      yCursor += 4;
      continue;
    }

    // Main Headers (# ou ##)
    if (line.startsWith('# ') || line.startsWith('## ')) {
      const headerText = line.replace(/^#+\s+/, '');
      checkPageBreak(15);
      
      yCursor += 5;
      doc.setFont('times', 'bold');
      doc.setFontSize(15);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      
      const wrappedH = doc.splitTextToSize(headerText, printableWidth);
      wrappedH.forEach((hl: string) => {
        doc.text(hl, marginX, yCursor);
        yCursor += 6;
      });
      // Draw a subtle line under main headings
      doc.setDrawColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.setLineWidth(0.2);
      doc.line(marginX, yCursor - 1, marginX + 45, yCursor - 1);
      
      yCursor += 2;
      continue;
    }

    // Sub-headers (###)
    if (line.startsWith('### ')) {
      const subheaderText = line.replace(/^###+\s+/, '');
      checkPageBreak(12);
      
      yCursor += 4;
      doc.setFont('times', 'bold');
      doc.setFontSize(12.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      
      const wrappedS = doc.splitTextToSize(subheaderText, printableWidth);
      wrappedS.forEach((sl: string) => {
        doc.text(sl, marginX, yCursor);
        yCursor += 5.5;
      });
      yCursor += 1;
      continue;
    }

    // Lists (bullet points starts with - or * or digit like 1.)
    const isBulletList = line.startsWith('- ') || line.startsWith('* ');
    const isNumberedList = /^\d+\.\s+/.test(line);

    if (isBulletList || isNumberedList) {
      let cleanText = '';
      let bulletChar = '•';
      
      if (isBulletList) {
        cleanText = line.substring(2).trim();
      } else {
        const match = line.match(/^(\d+\.)\s+(.*)$/);
        bulletChar = match ? match[1] : '1.';
        cleanText = match ? match[2].trim() : line;
      }

      checkPageBreak(8);
      
      const listIndentX = marginX + 6;
      const listTextWidth = printableWidth - 8;
      
      // Split into wrapped lines
      // Let's first strip bold markers temporarily to do wrapping or preserve them
      const segments = parseTextSegments(cleanText);
      const rawPlainString = segments.map(s => s.text).join('');
      const wrappedLines = doc.splitTextToSize(rawPlainString, listTextWidth);

      // Draw Bullet
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(10.5);
      doc.setTextColor(primaryColor[0], primaryColor[1], primaryColor[2]);
      doc.text(bulletChar, marginX + 1, yCursor);

      // Draw Multi-line List Content
      let lineTextOffset = 0; // Current char offset analyzed
      wrappedLines.forEach((wLine: string, lineIndex: number) => {
        if (lineIndex > 0) {
          checkPageBreak(6);
        }
        
        // Render this wrapped line with bold segments correctly preserving styles
        let currentX = listIndentX;
        let charCursorInLine = 0;
        
        // Find segments that hit this line
        const lineLen = wLine.length;
        let charsRendered = 0;
        let cumulativeRef = 0;
        
        segments.forEach((seg) => {
          const segStart = cumulativeRef;
          const segEnd = cumulativeRef + seg.text.length;
          cumulativeRef = segEnd;

          // Check if this segment overlaps with the current line
          const lineStartInRaw = lineTextOffset;
          const lineEndInRaw = lineTextOffset + lineLen;

          const overlapStart = Math.max(segStart, lineStartInRaw);
          const overlapEnd = Math.min(segEnd, lineEndInRaw);

          if (overlapStart < overlapEnd) {
            // Cut segment piece for this line
            const pieceStartIdx = overlapStart - segStart;
            const pieceEndIdx = overlapEnd - segStart;
            const pieceText = seg.text.substring(pieceStartIdx, pieceEndIdx);

            doc.setFont('helvetica', seg.isBold ? 'bold' : 'normal');
            doc.setFontSize(10);
            doc.setTextColor(textColor[0], textColor[1], textColor[2]);
            doc.text(pieceText, currentX, yCursor);
            
            // Advance X cursor
            currentX += doc.getTextWidth(pieceText);
            charsRendered += pieceText.length;
          }
        });
        
        lineTextOffset += lineLen;
        yCursor += 5.5;
      });

      yCursor += 1; // space after bullet item
      continue;
    }

    // Regular Paragraph (not list or header)
    checkPageBreak(10);
    const segments = parseTextSegments(line);
    const rawPlainString = segments.map(s => s.text).join('');
    const wrappedLines = doc.splitTextToSize(rawPlainString, printableWidth);

    let lineTextOffset = 0;
    wrappedLines.forEach((wLine: string, lineIndex: number) => {
      if (lineIndex > 0) {
        checkPageBreak(5.5);
      }

      let currentX = marginX;
      const lineLen = wLine.length;
      let cumulativeRef = 0;

      segments.forEach((seg) => {
        const segStart = cumulativeRef;
        const segEnd = cumulativeRef + seg.text.length;
        cumulativeRef = segEnd;

        const lineStartInRaw = lineTextOffset;
        const lineEndInRaw = lineTextOffset + lineLen;

        const overlapStart = Math.max(segStart, lineStartInRaw);
        const overlapEnd = Math.min(segEnd, lineEndInRaw);

        if (overlapStart < overlapEnd) {
          const pieceStartIdx = overlapStart - segStart;
          const pieceEndIdx = overlapEnd - segStart;
          const pieceText = seg.text.substring(pieceStartIdx, pieceEndIdx);

          // We use times for standard textbook feel
          doc.setFont('times', seg.isBold ? 'bold' : 'normal');
          doc.setFontSize(11);
          doc.setTextColor(textColor[0], textColor[1], textColor[2]);
          doc.text(pieceText, currentX, yCursor);
          
          currentX += doc.getTextWidth(pieceText);
        }
      });

      lineTextOffset += lineLen;
      yCursor += 5.5;
    });

    yCursor += 1.5; // space after paragraph
  }

  // Save the PDF binary as blob/URL and trigger download
  const safeTitle = resource.title.toLowerCase().replace(/[^a-z0-9]+/g, '_');
  doc.save(`ancient_africa_pedagogy_${safeTitle}.pdf`);
}
