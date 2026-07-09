const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

app.use(express.static('web'));
app.use('/data', express.static('data'));

app.get('/api/maps/:slug', async (req, res) => {
    const slug = req.params.slug;
    const dataPath = path.join(__dirname, 'data', slug, 'map_data.json');
    try {
        const data = await require(dataPath);
        res.json(data);
    } catch (error) {
        res.status(404).json({ error: 'Mapa não encontrado' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
