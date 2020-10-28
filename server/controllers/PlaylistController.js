const { Playlist } = require("../models/index");

class PLayListController {
  static index(req, res, next) {
    res.status(200).json({ connectionStatus: "OK" })
  }

}

module.exports = PLayListController;