const puppeteer = require('puppeteer');

const scrapeData = async (url, slug, drawNo) => {
    const finalUrl = `${url}/${slug}/${drawNo}`;

    const browser = await puppeteer.launch({
        executablePath: '/usr/bin/google-chrome-stable',
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    const page = await browser.newPage();

    await page.goto(finalUrl, { waitUntil: 'networkidle2' });

    const resultsHtmlArray = await page.$$eval('.B', elements =>
        elements.map(element => element.innerHTML)
    );

    await browser.close();

    return resultsHtmlArray;
};

module.exports = {
    scrapeData
};