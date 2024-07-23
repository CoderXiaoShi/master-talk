// models.js
import { DataTypes } from 'sequelize';
import sequelize from '../database.js';

const Article = sequelize.define('article', {
  jsonStr: {
    type: DataTypes.STRING,
    allowNull: false
  },
});

export { Article };
