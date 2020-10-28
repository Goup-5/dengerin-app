const PLayListController = require('../controllers/PlaylistController'); 
const UserController = require('../controllers/UserController'); 
const router = require('express').Router();

router.get('/', PLayListController.index)

//User
router.post('/register', UserController.register)


module.exports = router;