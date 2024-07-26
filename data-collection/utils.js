import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

const sleep = npm => new Promise(resolve => setTimeout(resolve, npm));

export const downloadUrl = async (browser, url) => {
  let filename = url.split('/').pop();
  if (fs.existsSync(`./assets/${filename}`)) {
    return;
  }
  const page = await browser.newPage();
  try {
    await sleep(1000 * Math.random());
    page.on('response', async response => {
      if (!fs.existsSync('assets')) {
        fs.mkdirSync('assets');
      }
      response.buffer().then(response => {
        fs.createWriteStream(`./assets/${filename}`).write(response);
      });
    })

    await page.goto(url, { waitUntil: 'networkidle2' });
  } catch (error) {
    console.error(error);
  } finally {
    page.close();
  }
}
