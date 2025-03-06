const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());

app.get('/fetch-songs', async (req, res) => {
    try {
        const { data } = await axios.get('https://www.melon.com/chart/top100/index.htm');
        const $ = cheerio.load(data);
        const songs = [];

        $('.lst50').each((index, element) => {
            const title = $(element).find('.ellipsis.rank01 a').text();
            const releaseDate = $(element).find('.ellipsis.rank03 span').text(); // 예시로 가정
            songs.push({ title, releaseDate });
        });

        res.json(songs);
    } catch (error) {
        console.error('Error fetching songs:', error);
        res.status(500).send('Error fetching songs');
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
