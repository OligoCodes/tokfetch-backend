const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/api/tiktok', async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).json({ error: 'No TikTok URL provided' });
  }

  console.log("Fetching TikTok URL:", url);
  console.log("Using API Key:", process.env.API_KEY);

  const apiURL = `https://tiktok-download-without-watermark.p.rapidapi.com/analysis?url=${url}&hd=0`;

  try {
    const response = await fetch(apiURL, {
      method: 'GET',
      headers: {
        'x-rapidapi-host': 'tiktok-download-without-watermark.p.rapidapi.com',
        'x-rapidapi-key': process.env.API_KEY
      },
    });

    const data = await response.json();
    console.log("Fetched data:", data);

    res.json(data);
  } catch (err) {
    console.error("Error fetching TikTok data:", err);
    res.status(500).json({ error: 'Failed to fetch TikTok data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅️ Server running on http://localhost:${PORT}`);
});
