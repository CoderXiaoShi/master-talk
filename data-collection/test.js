
import sequelize from './database.js';
import { Article } from './models/article.js'

// const article = await Article.findOne({ where: { rest_id: 1815967241759785345 } })
const article = await Article.findAll({ where: { rest_id: '1815967241759785345' } })

console.log(article)

