import puppeteer from 'puppeteer';
import fs from 'fs';
import path from 'path';

export const downloadUrl = async (browser, url) => {
  const page = await browser.newPage();
  // await page.goto('https://pbs.twimg.com/amplify_video_thumb/1815187415759237120/img/GGRZguHIBiPpMp4I.jpg', { waitUntil: 'networkidle2' });
  await page.goto('url', { waitUntil: 'networkidle2' });
  const imageBuffer = await page.screenshot();
  if (!fs.existsSync('assets')) {
    fs.mkdirSync('assets');
  }
  await fs.writeFileSync('./assets/GGRZguHIBiPpMp4I.jpg', imageBuffer);
  page.close();
}
