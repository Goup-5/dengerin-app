const PLayListController = require('../controllers/PlaylistController'); 
const router = require('express').Router();

router.get('/', PLayListController.index)

module.exports = router;