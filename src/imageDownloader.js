const axios = require('axios');
const fs = require('fs-extra');
const path = require('path');

async function downloadImage(url, dest) {
    const response = await axios({
        url,
        method: 'GET',
        responseType: 'stream'
    });

    return new Promise((resolve, reject) => {
        const writer = fs.createWriteStream(dest);
        response.data.pipe(writer);
        writer.on('finish', resolve);
        writer.on('error', reject);
    });
}

async function downloadTiles(mapConfig, mapSlug) {
    const baseUrl = "https://tiles.mapgenie.io/games/";
    const tileSet = mapConfig.tile_sets[0]; // Usando o primeiro conjunto de tiles
    const extension = tileSet.extension;
    const pathPrefix = tileSet.path;
    
    const outputDir = path.join(__dirname, '../data', mapSlug, 'tiles');
    await fs.ensureDir(outputDir);

    console.log(`Iniciando download de tiles para ${mapSlug}...`);
    // Aqui poderíamos iterar sobre x, y, z se quiséssemos baixar os tiles localmente.
    // Mas conforme o histórico, o projeto usa o servidor do MapGenie diretamente.
    // Salvaremos apenas a configuração de tiles.
}

module.exports = { downloadImage, downloadTiles };
