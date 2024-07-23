import puppeteer from 'puppeteer';
import fs from 'fs'
import path from 'path'
import sequelize from './database.js';
import { Article } from './models/article.js'

// Or import puppeteer from 'puppeteer-core';

// 同步数据库
await sequelize.sync();

// Launch the browser and open a new blank page
const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250,
  args: ['--window-size=1920,1080'],
  userDataDir: './dist',
});
const page = await browser.newPage();

// Navigate the page to a URL.
// await page.goto('https://www.dedao.cn/');
await page.goto('https://x.com/elonmusk');

// Set screen size.
await page.setViewport({ width: 1680, height: 1080 });

page.on('response', async response => {
  // 用户必须登录, 否则会报错
  if (response.url().includes('/UserTweets')) {
    let res = await response.json()
    console.log(res)
    // return

    const { instructions } = res.data.user.result.timeline_v2.timeline
    for (const item of instructions) {
      if (item.type === 'TimelineAddEntries') {
        const { entries } = item;

        for (const articleItem of entries) {
          if (articleItem.content.entryType === 'TimelineTimelineItem') {
            // console.log('TimelineTimelineItem: ', articleItem);
            await Article.create({
              // jsonStr: articleItem.content.itemContent.tweet_results.result.legacy.full_text
              jsonStr: JSON.stringify(articleItem.content),
              content: articleItem.content.itemContent.tweet_results.result.legacy.full_text
            })
          } else if (articleItem.content.entryType === 'TimelineTimelineCursor') {
            console.log('cursor')
          }
        }

      }
    }

    // 写入文件
    // fs.writeFileSync(
    //   path.resolve('./UserTweets.json'),
    //   JSON.stringify(res)
    // )
  }
})

// 来如果大模型能力进一步
// https://www.dedao.cn/pc/ledgers/notes/article_comment_list
// page


// // Type into search box.
// await page.locator('.devsite-search-field').fill('automate beyond recorder');

// // Wait and click on first result.
// await page.locator('.devsite-result-item-link').click();

// // Locate the full title with a unique string.
// const textSelector = await page
//   .locator('text/Customize and automate')
//   .waitHandle();
// const fullTitle = await textSelector?.evaluate(el => el.textContent);

// // Print the full title.
// console.log('The title of this blog post is "%s".', fullTitle);

// await browser.close();