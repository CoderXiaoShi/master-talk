import puppeteer from 'puppeteer';
import sequelize from './database.js';
import { Article } from './models/article.js'
import { downloadUrl } from './utils.js'
import { execSync } from 'child_process';

// 同步数据库
await sequelize.sync();

const browser = await puppeteer.launch({
  headless: false,
  slowMo: 250,
  args: ['--window-size=1920,1080'],
  userDataDir: './dist',
});

const sleep = num => new Promise(resolve => setTimeout(resolve, num));

const getNews = async (originId) => {

  const page = await browser.newPage();
  await page.goto(`https://x.com/${originId}`);
  await page.setViewport({ width: 1680, height: 1080 });

  /*
    区分消息类型  
    1. 纯文本
    2. 纯文本 + 图片
    3. 纯转帖 纯文本 + 图片
  */
  let author = {
    name: '',
    screen_name: '',
    photo: '',
    profile_banner_url: ''
  }

  page.on('response', async response => {
    // UserByScreenName banner

    if (response.url().includes('UserByScreenName')) {
      let res = await response.json(); // 名称
      const {
        name, // 昵称
        profile_banner_url, // banner
        profile_image_url_https, // 头像
        screen_name, // id
      } = res.data.user.result.legacy;
      let photo = profile_image_url_https.replace('_normal.jpg', '_200x200.jpg')
      author.name = name;
      author.photo = photo.split('/').pop();
      author.profile_banner_url = profile_banner_url.split('/').pop();
      author.screen_name = screen_name;
      // console.log('profile_banner_url', profile_banner_url)
      // console.log('photo', photo)
      // 下载banner
      await downloadUrl(browser, profile_banner_url);
      // 下载头像
      await downloadUrl(browser, photo);
    }
    // 用户必须登录, 否则会报错
    if (response.url().includes('/UserTweets')) {
      try {
        let res = await response.json();

        const { instructions } = res.data.user.result.timeline_v2.timeline
        for (const item of instructions) {
          if (item.type === 'TimelineAddEntries') {
            const { entries } = item;

            for (const articleItem of entries) {
              /*
                区分消息类型  
                1. 纯文本
                2. 纯文本 + 图片
                3. 纯转帖 纯文本 + 图片
              */
              if (articleItem.content.entryType === 'TimelineTimelineItem') {
                try {
                  const rest_id = articleItem.content.itemContent.tweet_results.result.rest_id
                  const article = await Article.findAll({ where: { rest_id } });
                  if (article.length == 0) {
                    await Article.create({
                      jsonStr: JSON.stringify(articleItem.content),
                      rest_id,
                      author: JSON.stringify(author),
                      originId: originId,
                      content: articleItem.content.itemContent.tweet_results.result.legacy.full_text
                    })
                  }
                } catch (error) {
                  console.log(2, error)
                }
                const media = articleItem.content.itemContent.tweet_results?.result?.legacy?.entities?.media || []
                if (Array.isArray(media)) {
                  for (const item of media) {
                    await downloadUrl(browser, item.media_url_https);
                  }
                }
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
  return page
}

; (async () => {
  /**/
  let userIds = [
    'elonmusk',
    'openai'
  ]
  let pageMap = {}
  let run = async () => {
    for (const userId of userIds) {
      try {
        if (pageMap[userId]) {
          pageMap[userId].reload();
        } else {
          pageMap[userId] = await getNews(userId);
        }
      } catch (error) {
        console.error('err', error);
      }
    }
    // 导出数据
    await sleep(1000 * 60 * 5); // 等待5分钟
    execSync('node ./exportJson.js')

    setTimeout(() => {
      run();
    }, 1000 * 60 * 30)
  }

  run();

})();
