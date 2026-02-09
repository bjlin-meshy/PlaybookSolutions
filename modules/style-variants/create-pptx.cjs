const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require('C:/Users/fong8/.agents/skills/pptx/scripts/html2pptx.js');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Meshy AI';
    pptx.title = '10 Styles - Asset Blockout Acceleration';

    const slides = [
        '01-cyberpunk.html',
        '02-blueprint.html',
        '03-glassmorphism.html',
        '04-retro-arcade.html',
        '05-minimal-zen.html',
        '06-dark-mode.html',
        '07-aurora.html',
        '08-isometric.html',
        '09-brutalist.html',
        '10-neumorphism.html'
    ];

    const baseDir = 'D:/2026/0127_PlaybookSolutions/10-styles';

    for (const slideFile of slides) {
        const htmlPath = path.join(baseDir, slideFile);
        console.log(`Processing: ${slideFile}`);
        try {
            await html2pptx(htmlPath, pptx);
            console.log(`  ✓ Added slide`);
        } catch (err) {
            console.error(`  ✗ Error: ${err.message}`);
        }
    }

    const outputPath = path.join(baseDir, '10-styles-presentation.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved: ${outputPath}`);
}

createPresentation().catch(console.error);
