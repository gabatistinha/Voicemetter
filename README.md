# MapGenie Scraper - Escape From Tarkov

Este projeto é um sistema de web scraping desenvolvido para extrair dados de mapas, marcadores e categorias do site MapGenie (mapgenie.io), especificamente para o jogo Escape From Tarkov.

## Estrutura do Projeto

- `src/scraper.js`: Scraper principal usando Puppeteer para extrair dados do objeto global `window.mapData`.
- `src/coordinateMapper.js`: Módulo para normalização de coordenadas (lat/lng).
- `src/iconExtractor.js`: Módulo para baixar assets e sprites de ícones.
- `src/imageDownloader.js`: Utilitário para download de imagens e tiles.
- `build-all.js`: Script de automação para extrair dados de múltiplos mapas.
- `server.js`: Servidor Express para servir os dados extraídos via API.

## Mapas Suportados

- Factory
- Woods
- Customs
- Interchange
- Shoreline
- The Lab

## Como Usar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Execute o scraper para um mapa específico:
   ```bash
   node src/scraper.js factory
   ```

3. Execute o build para todos os mapas:
   ```bash
   node build-all.js
   ```

4. Inicie o servidor de API:
   ```bash
   npm start
   ```

## Dados Extraídos

Os dados são salvos no diretório `data/{map-slug}/` nos seguintes arquivos:
- `locations.json`: Todos os marcadores com título, descrição e coordenadas.
- `categories.json`: Categorias de marcadores.
- `groups.json`: Grupos de categorias (Loot, Enemies, etc).
- `map_config.json`: Configurações de tiles e zoom.
- `map_data.json`: Objeto completo contendo todas as informações acima.
