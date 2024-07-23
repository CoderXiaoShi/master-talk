// database.js
import { Sequelize } from 'sequelize';

// 创建SQLite数据库连接，使用文件数据库
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export default sequelize;
