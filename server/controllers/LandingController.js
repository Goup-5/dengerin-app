const { User } = require('../models/index')
const { comparePassword } = require('../helper/bcrypt')
const { signToken } = require('../helper/jwt')

class LandingController {
    static async register(req, res) {
        try {
           const payload = {
               email: req.body.email,
               password: req.body.password
           } 

           const user = await User.create(payload)
           res.status(201).json({
               id: user.id,
               email: user.email
           })
        } catch (err) {
            res.status(500).json(err)
        }
    }

    static async login(req, res) {
        try {
            const payload = {
                email: req.body.email,
                password: req.body.password
            }

            const user = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (!user) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else if (!comparePassword(payload.password, user.password)) {
                res.status(401).json({
                    message: "Wrong email or password"
                })
            } else {
                const access_token = signToken({
                    id: user.id,
                    email: user.email
                })

                res.status(200).json({
                    access_token
                })
            }
        } catch (err) {
            res.status(500).json(err)
        }
    }
}
  
module.exports = LandingController;