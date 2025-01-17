'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsToMany(models.Playlist, {
        through: models.PlaylistSong,
        foreignKey: "SongId"
      })
    }
  };
  Song.init({
    title: DataTypes.STRING,
    artist: DataTypes.STRING,
    duration: DataTypes.INTEGER,
    link: DataTypes.STRING,
    artist_link: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};