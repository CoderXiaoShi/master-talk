// models.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Article = sequelize.define('article', {
  jsonStr: {
    type: DataTypes.STRING,
    allowNull: true
  },
  rest_id: {
    type: DataTypes.STRING,
    allowNull: false
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  }
});

export { Article };
