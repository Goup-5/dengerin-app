'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Playlist.belongsTo(models.User, {
        foreignKey: "UserId",
        targetKey: "id"
      })

      Playlist.belongsToMany(models.Song, {
        through: models.PlaylistSong,
        foreignKey: "PlaylistId"
      })
    }
  };
  Playlist.init({
    playlist_name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: 'Playlist name is require, cannot be empty!'
        }, 
        notEmpty: {
          args: true,
          msg: 'Playlist name is require, cannot be empty!'
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};