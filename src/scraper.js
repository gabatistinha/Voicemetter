const puppeteer = require('puppeteer');
const fs = require('fs-extra');
const path = require('path');

async function scrapeMap(mapSlug) {
    const url = `https://mapgenie.io/tarkov/maps/${mapSlug}`;
    console.log(`Iniciando scrap de: ${url}`);

    const browser = await puppeteer.launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    const page = await browser.newPage();

    try {
        await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });

        // Aguarda o carregamento dos dados no window.mapData
        await page.waitForFunction(() => window.mapData && window.mapData.locations, { timeout: 30000 });

        const data = await page.evaluate(() => {
            return {
                map: window.mapData.map,
                mapConfig: window.mapData.mapConfig,
                groups: window.mapData.groups,
                categories: window.mapData.categories,
                locations: window.mapData.locations
            };
        });

        const outputDir = path.join(__dirname, '../data', mapSlug);
        await fs.ensureDir(outputDir);

        await fs.writeJson(path.join(outputDir, 'map_data.json'), data, { spaces: 2 });
        await fs.writeJson(path.join(outputDir, 'locations.json'), data.locations, { spaces: 2 });
        await fs.writeJson(path.join(outputDir, 'categories.json'), data.categories, { spaces: 2 });
        await fs.writeJson(path.join(outputDir, 'groups.json'), data.groups, { spaces: 2 });
        await fs.writeJson(path.join(outputDir, 'map_config.json'), data.mapConfig, { spaces: 2 });

        console.log(`Dados salvos com sucesso em: ${outputDir}`);
        return data;
    } catch (error) {
        console.error(`Erro ao fazer scrap de ${mapSlug}:`, error);
    } finally {
        await browser.close();
    }
}

module.exports = { scrapeMap };

if (require.main === module) {
    const slug = process.argv[2] || 'factory';
    scrapeMap(slug);
}
