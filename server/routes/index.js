const LandingController = require('../controllers/LandingController');
const PLayListController = require('../controllers/PlaylistController'); 
const UserController = require('../controllers/UserController'); 
const router = require('express').Router();

const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

//Router Landing ================================================================
router.post('/register', LandingController.register)
router.post('/login', LandingController.login)

router.use(authentication)

//Router Playlist ================================================================
router.get('/playlist', PLayListController.readPlaylist)
router.post('/playlist', PLayListController.createPlaylist)
router.get('/playlist/:id', PLayListController.getPlaylistById)
router.put('/playlist/:id', authorization, PLayListController.updateAllPlaylistId)
router.patch('/playlist/:id', authorization, PLayListController.updateSongPlaylistId)
router.delete('/playlis/:id', authorization, PLayListController.deletePlaylistId)


//User
router.post('/register', UserController.register)


module.exports = router;