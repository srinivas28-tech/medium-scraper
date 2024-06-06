const express = require('express');
const { scrapeMedium } = require('../controllers/scrapeController');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = express.Router();

router.use(bodyParser.json());
router.use(cors());

let articlesCache = [];

router.post('/scrape', async (req, res) => {
  const { topic } = req.body;
  if (!topic) {
    return res.status(400).json({ error: 'Topic is required' });
  }
  try {
    articlesCache = await scrapeMedium(topic);
    console.log(articlesCache);
    res.status(200).json({ articles: articlesCache });
  } catch (error) {
    res.status(500).json({ error: 'Scraping failed' });
  }
});

router.get('/articles', (req, res) => {
  res.status(200).json({ articles: articlesCache });
});

module.exports = router;
