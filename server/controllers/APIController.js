const { default: Axios } = require('axios')
const { SongPlaylist } = require('../models/index')
const timeFormat = require('../helper/secToMinutes')

class APIController {

    static async searchDeezer(req, res, next) {
        try {
            const search = req.body.search
            let response = await Axios({
                url: `https://api.deezer.com/search?q=${search}`,
                method: 'get',
            })
            res.status(200).json(response.data)
        } catch (err) {
            next(err)
        }
        
    }
    static async searchSongs(req, res, next) {
        try {
            const search = req.body.search
            let response = await Axios({
                url: `https://api.deezer.com/search?q=${search}`,
                method: 'get',
            })
            let data = [];
            response.data.data.forEach((el) => {
                data.push({
                    id: el.id,
                    title: el.title,
                    duration: timeFormat(el.duration),
                    artist: el.artist.name,
                    link: el.preview,
                    artist_link: el.artist.link
                })
            });
            res.status(200).json(data);
        } catch (err) {
            next(err)
        }
    }
    
}
  
module.exports = APIController;