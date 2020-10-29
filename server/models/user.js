'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helper/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Playlist, {
        foreignKey: "UserId"
      })
    }
  };
  //p

  User.init({
    username: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Username already registered'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Username is requiere, can't be empty!`
        },
        len: {
          args: [6],
          msg: 'Username minimal 6 character'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: `Password is requiere, can't be empty!`
        },
        len: {
          args: [8],
          msg: 'Password minimal 8 character'
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
        args: true,
        msg: 'Email already registered'
      },
      validate: {
        notEmpty: {
          args: true,
          msg: `Email is requiere, can't be empty!`
        },
        isEmail: {
          args: true,
          msg: 'Email must be valid an email address!'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(user) {
        user.password = hashPassword(user.password)
      },
      afterCreate(user) {
        delete user.dataValues.password;
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};