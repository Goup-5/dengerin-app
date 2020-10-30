const { Playlist, PlaylistSong, Song } = require("../models/index");
const { verifyToken } = require("../helper/jwt");


class PLayListController {
  static index(req, res, next) {
    res.status(200).json({ connectionStatus: "OK" })
  }

  static async readPlaylist (req, res, next){
    try {
      let playlistSongs = await Playlist.findAll({include:[Song], order: [['id', 'DESC']]});
      res.status(200).json(playlistSongs);
    } catch (err) {
      next(err);
    }
  }

  static async getPlaylistById (req, res, next){
    try {
      let playlist = await Playlist.findOne({where:{id:req.params.id}});
      res.status(200).json(playlist);
    } catch (err) {
      next(err);
    }
  }

  static async createPlaylist (req, res, next){
      console.log(req.headers.access_token)
    try {
      let user = verifyToken(req.headers.access_token)
      let payload = {
        playlist_name: req.body.playlist_name,
        UserId: user.id
      }
      let playlist = await Playlist.create(payload);
      res.status(200).json(playlist);
    } catch (err) {
      next(err);
    }
  }

  static async updateAllPlaylistId (req, res, next) {
    try {
      let playlistId = req.params.id;
      let payload = {
        playlist_name: req.body.playlist_name
      }
      let playlist = await Playlist.update(payload, {where:{id:playlistId}});
      res.status(200).json(payload)
    } catch (error) {
      next(error);
    }
  }

  static async deletePlaylistId (req, res, next) {
    try {
      let playlistId = req.params.id;
      let playlist = await Playlist.destroy({where:{id: playlistId}});
      res.status(200).json({message: `Playlist ${playlistId} deleted`})
    } catch (error) {
      next(error);
    }
  }

}

module.exports = PLayListController;