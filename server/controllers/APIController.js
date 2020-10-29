const { default: Axios } = require('axios')

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
    
}
  
module.exports = APIController;