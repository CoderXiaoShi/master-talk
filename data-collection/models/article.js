// models.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Article = sequelize.define('article', {
  jsonStr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export { Article };
