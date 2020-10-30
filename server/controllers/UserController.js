const { User } = require("../models/index");

class UserController {
  static index(req, res, next) {
    res.status(200).json({ connectionStatus: "OK" })
  }

  static register(req, res, next) {
    const payload = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }

    User.create(payload)
      .then(data => res.status(201).json({
        username: data.username,
        email: data.email
      }))
      .catch(err => next(err))
  }

  static getUser(req, res, next) {
    const username = req.loggedIn.username;
    res.status(200).json({ username })
  }

}

module.exports = UserController;