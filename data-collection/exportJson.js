import fs from 'fs'
import path from 'path'

import sequelize from './database.js';
import { Article } from './models/article.js'

// Or import puppeteer from 'puppeteer-core';

// 同步数据库
await sequelize.sync();

let list = await Article.findAll()

list = list.map(item => {
  return {
    rest_id: item.rest_id,
    content: item.content
  }
})

console.log(list)

if (!fs.existsSync('../dist')) {
  fs.mkdirSync('../dist')
}

fs.writeFileSync('../dist/data.json', JSON.stringify(list, null, 2), 'utf8')
