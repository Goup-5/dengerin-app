const { default: Axios } = require('axios')
const { PlaylistSong, Song, Playlist } = require('../models/index')
const timeFormat = require('../helper/secToMinutes')
const { verifyToken } = require("../helper/jwt")

class SongController {
    static async searchSongs(req, res, next) {
        try {
            const search = req.body.q
            console.log(search);
            let response = await Axios({
                url: `https://api.deezer.com/search?q=${search}`,
                method: 'get'
            })
            let data = [];
            console.log(response);
            response.data.data.forEach((el) => {
                data.push({
                    id: el.id,
                    title: el.title,
                    duration: timeFormat(el.duration),
                    artist: el.artist.name,
                    link: el.preview,
                    artist_link: el.artist.picture
                })
            });
            res.status(200).json(data);
        } catch (err) {
            next(err);
        }
    }

    static async getSongs(req, res, next){
        try {
            // let access_token = req.headers.access_token;
            // const decoded = verifyToken(access_token)
            let data = await Playlist.findOne({where:{id:req.params.id}, include:[Song]})
            // console.log(decoded, "<<< decoded");
            res.status(200).json(data);
        } catch (error){
            next(error);
        }
    }

    static async addSong(req, res, next) {
        try {
            const id = req.params.songid;
            const search = req.params.search;
            let response = await Axios({
                url: `https://api.deezer.com/search?q=${search}`,
                method: 'get',
            })
            let data = [];
            response.data.data.forEach((el) => {
                if(el.id == id){
                    data.push({
                        title: el.title,
                        duration: el.duration,
                        artist: el.artist.name,
                        link: el.preview,
                        artist_link: el.artist.picture
                    })
                }
            });
            let newSong = await Song.create(data[0], {returning:true});
            let payload = {
                PlaylistId: req.params.id,
                SongId: newSong.id
            }
            let songPlaylist = await PlaylistSong.create(payload)
            res.status(200).json(songPlaylist);
        } catch (err) {
            next(err)
        }
    }

    static async deleteSong(req, res, next) {
        try {
            const songid = req.params.songid;
            let songPlaylist = await PlaylistSong.destroy({where:{SongId:songid}});
            let song = await Song.destroy({where:{id:songid}})
            res.status(200).json({message: `Song ${songid} deleted`});
        } catch (err) {
            next(err)
        }
    }
}

module.exports = SongController