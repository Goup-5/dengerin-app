const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')

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
}
  
module.exports = LandingController;