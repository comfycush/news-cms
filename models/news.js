'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class News extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      News.belongsTo(models.User, {foreignKey: 'authorId'})
      News.belongsTo(models.Category, {foreignKey: 'categoryId'})
    }
  };
  News.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'title is required'
        }
      }
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'content is required'
        }
      }
    },
    imgUrl: DataTypes.STRING,
    status: {
      type: DataTypes.STRING,
      allowNull: false
    },
    authorId: DataTypes.INTEGER,
    categoryId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'News',
  });
  return News;
};