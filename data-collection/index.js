import puppeteer from 'puppeteer';
import fs from 'fs'
import path from 'path'
import sequelize from './database.js';
import { Article } from './models/article.js'
import { downloadUrl } from './utils.js'

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
  // console.log(response);
  if (response.url().includes('/UserTweets')) {
    try {
      let res = await response.json()
      // console.log(res)
      // return

      const { instructions } = res.data.user.result.timeline_v2.timeline
      for (const item of instructions) {
        if (item.type === 'TimelineAddEntries') {
          const { entries } = item;

          for (const articleItem of entries) {
            /*
              OK 1. 纯文本
              2. 纯文本 + 图片
              3. 纯文本 + 转发内容
            */
            if (articleItem.content.entryType === 'TimelineTimelineItem') {
              // itemContent.tweet_results.result.legacy
              try {
                const rest_id = articleItem.content.itemContent.tweet_results.result.rest_id
                console.log('rest_id: ', rest_id);
                const article = await Article.findAll({ where: { rest_id } });
                console.log("article: ", article);
                if (article.length == 0) {
                  await Article.create({
                    jsonStr: JSON.stringify(articleItem.content),
                    rest_id,
                    content: articleItem.content.itemContent.tweet_results.result.legacy.full_text
                  })
                }
              } catch (error) {
                console.log(2, error)
              }
              // const media = articleItem.content.itemContent.tweet_results?.result?.legacy?.entities?.media || []
              // if (media.length) {
              //   console.log(media[0].media_url_https);
              //   await downloadUrl(browser, media[0].media_url_https);
              // }
            } else if (articleItem.content.entryType === 'TimelineTimelineCursor') {
              console.log('cursor')
            }
          }

        }
      }
    } catch (error) {
      console.log(1, error)
    }
  }
})
