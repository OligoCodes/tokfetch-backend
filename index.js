const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json()); // Serve frontend files

app.get('/api/tiktok', async (req, res) => {
  const { url } = req.query;

  if (!url) {
    return res.status(400).json({ error: 'No TikTok URL provided' });
  }

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

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch TikTok data' });
  }
});

app.listen(PORT, () => {
  console.log(`✅️ Server is running on port ${PORT}`);
});
