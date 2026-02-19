const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require(process.env.HTML2PPTX_PATH || path.join(__dirname, 'html2pptx.js'));

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

    const baseDir = __dirname;

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

    const outputPath = path.join(__dirname, '10-styles-presentation.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved: ${outputPath}`);
}

createPresentation().catch(console.error);
