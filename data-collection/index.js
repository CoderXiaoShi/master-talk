const puppeteer = require('puppeteer')

/*
  https://twitter.com/i/api/graphql/kfCWRG0roHHybC2Z9TwrOQ/UserTweets
*/

;(async () => {
  const browser = await puppeteer.launch({ headless: true })
  const page = await browser.newPage()
  await page.goto('https://twitter.com/elonmusk')
  await page.setViewport({ width: 1280, height: 800 });

  

})()
