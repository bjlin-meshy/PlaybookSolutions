const pptxgen = require('pptxgenjs');
const path = require('path');
const html2pptx = require('C:/Users/fong8/.agents/skills/pptx/scripts/html2pptx.js');

async function createPresentation() {
    const pptx = new pptxgen();
    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'Meshy AI';
    pptx.title = '3D Printing - Full-Color Miniature Customization';

    const slides = [
        '01-cover.html',
        '02-versus.html',
        '03-business-value.html',
        '04-workflow.html',
        '05-step-input.html',
        '06-step-generate.html',
        '07-step-polish.html',
        '08-final-result.html'
    ];

    const baseDir = 'D:/2026/0127_PlaybookSolutions/3dprinting-miniature';

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

    const outputPath = path.join(baseDir, '3dprinting-miniature.pptx');
    await pptx.writeFile({ fileName: outputPath });
    console.log(`\nPresentation saved: ${outputPath}`);
}

createPresentation().catch(console.error);
