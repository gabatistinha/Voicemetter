const { scrapeMap } = require('./src/scraper');
const fs = require('fs-extra');
const path = require('path');

const MAPS = ['factory', 'woods', 'customs', 'interchange', 'shoreline', 'lab'];

async function buildAll() {
    console.log('Iniciando pipeline de build completo...');

    for (const slug of MAPS) {
        try {
            console.log(`--- Processando: ${slug} ---`);
            const data = await scrapeMap(slug);
            if (data) {
                console.log(`Dados extraídos para ${slug}: ${data.locations.length} marcadores.`);
            }
        } catch (error) {
            console.error(`Falha ao processar ${slug}:`, error);
        }
    }

    console.log('Pipeline concluído!');
}

buildAll();
