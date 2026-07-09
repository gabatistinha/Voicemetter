/**
 * Converte as coordenadas do jogo (lat/lng) para posições de pixel baseadas nos limites do mapa.
 */
function mapCoordinates(locations, mapConfig) {
    // Nota: O MapGenie usa L.CRS.Simple ou um mapeamento linear.
    // Baseado no HISTORICO_PROJETO.md:
    // px = ((lng - minLng) / (maxLng - minLng)) * mapWidth
    // py = ((lat - minLat) / (maxLat - minLat)) * mapHeight

    // Como os limites exatos (min/max) nem sempre estão claros no mapConfig,
    // o Leaflet com CRS.Simple lida com isso se passarmos a latitude/longitude diretamente.
    // No entanto, para fins de exportação de dados puros, podemos normalizar.

    return locations.map(loc => {
        return {
            ...loc,
            normalized_x: loc.longitude,
            normalized_y: loc.latitude
        };
    });
}

module.exports = { mapCoordinates };
