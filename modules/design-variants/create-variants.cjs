const pptxgen = require('pptxgenjs');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Design variants configuration
const variants = [
  { id: 1, name: 'Glassmorphism Premium', bgColor: '0F172A', accent: '6366F1', secondary: '8B5CF6', text: 'FFFFFF', muted: '94A3B8', isDark: true },
  { id: 2, name: 'Minimalist Monochrome', bgColor: 'FFFFFF', accent: '2563EB', secondary: '3B82F6', text: '0F172A', muted: '64748B', isDark: false },
  { id: 3, name: 'Aurora Gradient', bgColor: '0F0F23', accent: '06B6D4', secondary: '8B5CF6', tertiary: 'EC4899', text: 'FFFFFF', muted: 'A1A1AA', isDark: true },
  { id: 4, name: 'Corporate Professional', bgColor: 'F8FAFC', accent: '1E40AF', secondary: '3B82F6', text: '1E293B', muted: '64748B', isDark: false },
  { id: 5, name: 'Neubrutalism', bgColor: 'FFFBEB', accent: 'FACC15', secondary: '000000', text: '000000', muted: '525252', isDark: false },
  { id: 6, name: 'Dark Luxury', bgColor: '0A0A0A', accent: 'D4AF37', secondary: 'B8860B', text: 'FAFAF9', muted: 'A8A29E', isDark: true },
  { id: 7, name: 'Soft Pastel', bgColor: 'FAF5FF', accent: 'A855F7', secondary: 'EC4899', tertiary: '0EA5E9', text: '1E1B4B', muted: '6B7280', isDark: false },
  { id: 8, name: 'Cyberpunk Futuristic', bgColor: '0D0221', accent: 'FF00FF', secondary: '00FFFF', text: 'FFFFFF', muted: '9CA3AF', isDark: true },
  { id: 9, name: 'Nature Organic', bgColor: 'FFFBEB', accent: '166534', secondary: '22C55E', text: '1C1917', muted: '57534E', isDark: false },
  { id: 10, name: '3D Tech Gradient', bgColor: '030712', accent: '7C3AED', secondary: '0EA5E9', tertiary: 'F472B6', text: 'FFFFFF', muted: '9CA3AF', isDark: true }
];

// Generate gradient background PNG
async function createGradientBg(variant, filename) {
  let svg;
  
  if (variant.isDark && (variant.tertiary || variant.id === 1)) {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#${variant.bgColor}"/>
          <stop offset="100%" style="stop-color:#${variant.bgColor}"/>
        </linearGradient>
        <radialGradient id="g2" cx="20%" cy="30%" r="60%">
          <stop offset="0%" style="stop-color:#${variant.accent};stop-opacity:0.25"/>
          <stop offset="100%" style="stop-color:#${variant.accent};stop-opacity:0"/>
        </radialGradient>
        <radialGradient id="g3" cx="80%" cy="70%" r="50%">
          <stop offset="0%" style="stop-color:#${variant.secondary};stop-opacity:0.2"/>
          <stop offset="100%" style="stop-color:#${variant.secondary};stop-opacity:0"/>
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g1)"/>
      <rect width="100%" height="100%" fill="url(#g2)"/>
      <rect width="100%" height="100%" fill="url(#g3)"/>
    </svg>`;
  } else if (variant.id === 8) { // Cyberpunk
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
      <defs>
        <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" style="stop-color:#0D0221"/>
          <stop offset="100%" style="stop-color:#1A0A2E"/>
        </linearGradient>
      </defs>
      <rect width="100%" height="100%" fill="url(#g1)"/>
      ${Array.from({length: 12}, (_, i) => 
        `<line x1="0" y1="${i * 45}" x2="960" y2="${i * 45}" stroke="#${i % 2 === 0 ? variant.accent : variant.secondary}" stroke-width="0.5" opacity="0.3"/>`
      ).join('')}
    </svg>`;
  } else {
    svg = `<svg xmlns="http://www.w3.org/2000/svg" width="960" height="540">
      <rect width="100%" height="100%" fill="#${variant.bgColor}"/>
    </svg>`;
  }
  
  await sharp(Buffer.from(svg)).png().toFile(filename);
  return filename;
}

async function createSlide(pptx, variant, bgPath) {
  const slide = pptx.addSlide();
  
  // Add background
  slide.addImage({ path: bgPath, x: 0, y: 0, w: 10, h: 5.625, sizing: { type: 'cover', w: 10, h: 5.625 } });
  
  // Style badge
  const badgeOpts = { x: 3.8, y: 0.6, w: 2.4, h: 0.4, fontSize: 11, align: 'center', valign: 'middle' };
  if (variant.isDark) {
    badgeOpts.fill = { color: variant.accent, transparency: 80 };
    badgeOpts.color = variant.accent;
    badgeOpts.line = { color: variant.accent, pt: 1 };
  } else {
    badgeOpts.fill = { color: variant.accent };
    badgeOpts.color = 'FFFFFF';
  }
  slide.addText(`Style ${variant.id}`, badgeOpts);
  
  // Title
  slide.addText('Playbook Solutions', { 
    x: 0.5, y: 1.2, w: 9, h: 0.8, 
    fontSize: 44, fontFace: 'Arial', bold: true, 
    color: variant.text, align: 'center'
  });
  
  // Subtitle
  slide.addText('Revolutionizing Traditional Art Workflow with 3D Gen AI', { 
    x: 1, y: 2.0, w: 8, h: 0.5, 
    fontSize: 18, fontFace: 'Arial', 
    color: variant.muted, align: 'center'
  });
  
  // Stats card
  const cardY = 2.7;
  const cardH = 1.4;
  if (variant.isDark) {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { 
      x: 1.5, y: cardY, w: 7, h: cardH, 
      fill: { color: 'FFFFFF', transparency: 92 },
      line: { color: 'FFFFFF', pt: 0.5, transparency: 85 },
      rectRadius: 0.15
    });
  } else if (variant.id === 5) { // Brutalism
    slide.addShape(pptx.shapes.RECTANGLE, { 
      x: 1.5, y: cardY, w: 7, h: cardH, 
      fill: { color: 'FFFFFF' },
      line: { color: '000000', pt: 3 },
      shadow: { type: 'outer', blur: 0, offset: 4, angle: 45, color: '000000', opacity: 1 }
    });
  } else {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { 
      x: 1.5, y: cardY, w: 7, h: cardH, 
      fill: { color: 'FFFFFF' },
      shadow: { type: 'outer', blur: 8, offset: 2, angle: 45, color: '000000', opacity: 0.1 },
      rectRadius: 0.1
    });
  }
  
  // Stats
  const stats = [
    { value: '90%', label: 'Time Saved', x: 2.3 },
    { value: '75%', label: 'Cost Reduction', x: 4.5 },
    { value: '10x', label: 'Productivity', x: 6.7 }
  ];
  
  stats.forEach(stat => {
    slide.addText(stat.value, { 
      x: stat.x, y: cardY + 0.25, w: 1.4, h: 0.6, 
      fontSize: 28, fontFace: 'Arial', bold: true, 
      color: variant.accent, align: 'center'
    });
    slide.addText(stat.label, { 
      x: stat.x, y: cardY + 0.85, w: 1.4, h: 0.35, 
      fontSize: 11, fontFace: 'Arial', 
      color: variant.muted, align: 'center'
    });
  });
  
  // CTA Button
  const btnY = 4.3;
  if (variant.id === 5) { // Brutalism
    slide.addShape(pptx.shapes.RECTANGLE, { 
      x: 3.7, y: btnY, w: 2.6, h: 0.5, 
      fill: { color: variant.accent },
      line: { color: '000000', pt: 3 },
      shadow: { type: 'outer', blur: 0, offset: 3, angle: 45, color: '000000', opacity: 1 }
    });
    slide.addText('Start Free Trial', { 
      x: 3.7, y: btnY, w: 2.6, h: 0.5, 
      fontSize: 13, fontFace: 'Arial', bold: true, 
      color: '000000', align: 'center', valign: 'middle'
    });
  } else {
    slide.addShape(pptx.shapes.ROUNDED_RECTANGLE, { 
      x: 3.7, y: btnY, w: 2.6, h: 0.5, 
      fill: { color: variant.accent },
      rectRadius: 0.08
    });
    slide.addText('Start Free Trial', { 
      x: 3.7, y: btnY, w: 2.6, h: 0.5, 
      fontSize: 13, fontFace: 'Arial', bold: true, 
      color: variant.isDark ? 'FFFFFF' : (variant.id === 6 ? '0A0A0A' : 'FFFFFF'), 
      align: 'center', valign: 'middle'
    });
  }
  
  // Variant label
  slide.addText(`${variant.id}. ${variant.name}`, { 
    x: 6.5, y: 5.2, w: 3.2, h: 0.3, 
    fontSize: 10, fontFace: 'Arial', 
    color: variant.muted, align: 'right'
  });
}

async function main() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.title = 'Playbook Solutions - 10 Design Variants';
  pptx.author = 'UI/UX Pro Max';
  
  const outputDir = __dirname;
  
  console.log('Creating 10 design variants...\n');
  
  for (const variant of variants) {
    console.log(`Processing variant ${variant.id}: ${variant.name}`);
    
    // Create gradient background
    const bgPath = path.join(outputDir, `bg-${variant.id}.png`);
    await createGradientBg(variant, bgPath);
    
    // Create slide
    await createSlide(pptx, variant, bgPath);
    console.log(`  ✓ Slide ${variant.id} created`);
  }
  
  // Save presentation
  const outputPath = path.join(outputDir, 'design-variants.pptx');
  await pptx.writeFile({ fileName: outputPath });
  console.log(`\n✓ Presentation saved: ${outputPath}`);
  
  // Clean up background images
  for (const variant of variants) {
    try {
      fs.unlinkSync(path.join(outputDir, `bg-${variant.id}.png`));
    } catch (e) {}
  }
  console.log('✓ Cleaned up temporary files');
}

main().catch(console.error);
