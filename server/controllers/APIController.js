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

    static async billboard(req, res, next) {
        try {
            const date = '2019-05-11'
            const range = '1-10'
            let response = await Axios({
                crossDomain: true,
                url: `https://billboard-api2.p.rapidapi.com/billboard-200?date=${date}&range=${range}`,
                method: 'get',
                headers: {
                    'x-rapidapi-host': "billboard-api2.p.rapidapi.com",
                    'x-rapidapi-key': "b32eeef690msh107d7c25f7fadabp1498d2jsn2b719fae361b"
                }
            })
            res.status(200).json(response.data.content)
        } catch (err) {
            next(err)
        }
        
    }

    static async randomJokes(req,res,next){
        let result = await Axios.get("https://sv443.net/jokeapi/v2/joke/Programming",{
          params:{
            blacklistFlags: "religious,political,racist,sexist",
            type:"twopart"
          }
        })
        res.status(200).json({setup:result.data.setup,delivery:result.data.delivery})
    }
    
}
  
module.exports = APIController;