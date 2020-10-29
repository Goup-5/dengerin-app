const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')
const {OAuth2Client} = require('google-auth-library');

class LandingController {
    static async register(req, res, next) {
        try {
           const payload = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password
           } 

           const user = await User.create(payload)
           res.status(201).json({
                id: user.id,
                username: req.body.username,
                email: user.email
           })
        } catch (err) {
            next(err)
        }
    }

    static async login(req, res, next) {
        try {
            const payload = {
                username: req.body.username,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    username: payload.username
                }
            })
            console.log(payload.password)
            console.log(user.password)
            

            if (!user) {
                res.status(401).json({
                    message: "Wrong username or password"
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: "Wrong username or password"
                })
            } else {
                const access_token = signToken({
                    id: user.id,
                    username: req.body.username,
                })

                res.status(200).json({
                    access_token
                })
            }
        } catch (err) {
            next(err)
        }
    }

    static googleLogin(req, res, next){
        let { google_access_token } = req.body
        const client = new OAuth2Client(process.env.CLIENT_ID);
        let email = ''
        let username = ''
        client.verifyIdToken({
          idToken: google_access_token,
          audience: process.env.CLIENT_ID,
        })
        .then(ticket=>{
          const payload = ticket.getPayload();
          username = payload.email
          email = payload.email 
          return User.findOne({where:{email}})
        })
        .then(user=>{
          if(user){
            return user
          }else{
            let newUser = {
                username,
                email,
                password:'12345678'
            }
            return User.create(newUser)
          }
        })
        .then(data=>{
            let access_token = signToken({id: data.id, username: data.username, email:data.email})
            res.status(200).json({access_token})
        })
        .catch(err=>{
            console.log(err)
        })
    }
}
  
module.exports = LandingController;