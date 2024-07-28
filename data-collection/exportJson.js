import fs from 'fs'
import path from 'path'

import sequelize from './database.js';
import { Article } from './models/article.js'
import { execSync } from 'child_process';

// Or import puppeteer from 'puppeteer-core';

// 同步数据库
await sequelize.sync();

let list = await Article.findAll();

list = list.map(item => {
  return {
    rest_id: item.rest_id,
    jsonStr: JSON.parse(item.jsonStr),
    author: JSON.parse(item.author),
    content: item.content,
  }
}).sort((first, second) => {
  let n1D = new Date(first.jsonStr.itemContent.tweet_results.result.legacy.created_at);
  let n2D = new Date(second.jsonStr.itemContent.tweet_results.result.legacy.created_at);
  return n2D - n1D;
})

// execSync('rm -rf ../website/public/*')
execSync('cp ./assets/* ../website/public/')

fs.writeFileSync('../website/src/assets/data.json', JSON.stringify(list, null, 2), 'utf8')

execSync('rm -rf ./assets/* ')
