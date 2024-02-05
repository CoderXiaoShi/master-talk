const puppeteer = require('puppeteer')

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('https://twitter.com/elonmusk')
  await page.setViewport({ width: 1280, height: 800 });

  

})()
