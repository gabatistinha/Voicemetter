const fs = require('fs-extra');
const path = require('path');
const { downloadImage } = require('./imageDownloader');

async function extractIcons(mapSlug) {
    const spriteUrl = "https://cdn.mapgenie.io/images/sprites/tarkov/markers@2x.png";
    const outputDir = path.join(__dirname, '../data/assets');
    await fs.ensureDir(outputDir);

    const dest = path.join(outputDir, 'markers@2x.png');
    
    if (!await fs.exists(dest)) {
        console.log(`Baixando sprite sheet de ícones...`);
        await downloadImage(spriteUrl, dest);
    }

    // O mapeamento das posições dos ícones geralmente está no script map.js ou em um JSON separado.
    // Conforme o histórico, o sprite_map.json contém essas posições.
}

module.exports = { extractIcons };
