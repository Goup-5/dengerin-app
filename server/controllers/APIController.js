const { default: Axios } = require('axios')

class APIController {

    static async searchDeezer(req, res) {
        try {
            const search = req.body.search
            let response = await Axios({
                url: `ttps://api.deezer.com/search?q=${search}`,
                method: 'get',
            })
            res.status(200).json(response.data)
        } catch (err) {
            res.status(500).json(err)
        }
        
    }
    
}
  
module.exports = APIController;