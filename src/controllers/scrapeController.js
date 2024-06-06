const puppeteer = require('puppeteer');

async function scrapeMedium(topic) {
    console.log(`Starting to scrape Medium for topic: ${topic}`);

    let browser;
    try {
            browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto(`https://medium.com/search?q=${topic}`);
        const articles = await page.evaluate(() => {
            const articleElements = document.querySelectorAll('article');
            const arrayOfArticles= Array.from(articleElements).map(article =>({
                title: article.querySelector('h2') ? article.querySelector('h2').innerText : '',
                author: article.querySelector('p') ? article.querySelector('p').innerText : '',
                link: article.querySelector('div[role="link"]') ? article.querySelector('div[role="link"]').getAttribute('data-href') : '',
                publish_date: article.querySelector('span')? article.querySelector('span').innerText:'',
            }));
            return arrayOfArticles.splice(0,5);
        });

        await browser.close();
        return articles;

    } catch (error) {
        if (browser) {
            await browser.close();
        }
        console.error('Error scraping Medium:', error);
        throw new Error('Scraping failed');
    }
}

module.exports = { scrapeMedium };
