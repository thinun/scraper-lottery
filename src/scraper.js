const puppeteer = require('puppeteer');

const scrapeData = async (url, slug, drawNo) => {
    const finalUrl = `${url}/${slug}/${drawNo}`;

    console.log(finalUrl)



    const browser = await puppeteer.launch();

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
