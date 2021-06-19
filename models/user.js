'use strict';
const {
  Model
} = require('sequelize');

const {hashPassword} = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.News, {foreignKey: 'authorId'})
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      allowNull: {
        args: false, 
        msg: 'email is required'
      },
      unique: {
        msg: 'this email is already used by another user'
      },
      validate: {
        notEmpty: {
          msg: 'email is required'
        },
        isEmail: {
          msg: 'email is in incorrect format'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: {
        args: false,
        msg: 'password is required'
      },
      validate: {
        min: 5,
        notEmpty: {
          msg: 'password is required'
        }
      }
    },
    role: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    address: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
    hooks: {
      beforeCreate: (instance) => {
        instance.password = hashPassword(instance.password)
      }
    }
  });
  return User;
};