const APIController = require('../controllers/APIController');
const LandingController = require('../controllers/LandingController');
const PLayListController = require('../controllers/PlaylistController'); 
const UserController = require('../controllers/UserController'); 
const router = require('express').Router();

const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')


//Router Landing ================================================================
router.post('/googleLogin', LandingController.googleLogin)
router.post('/register', LandingController.register)
router.post('/login', LandingController.login)


router.use(authentication)

//Router Playlist ================================================================
router.get('/playlist', PLayListController.readPlaylist)
router.post('/playlist', PLayListController.createPlaylist)
router.get('/playlist/:id', PLayListController.getPlaylistById)
router.put('/playlist/:id', authorization, PLayListController.updateAllPlaylistId)
// router.patch('/playlist/:id', authorization, PLayListController.updateSongPlaylistId)
router.delete('/playlist/:id', authorization, PLayListController.deletePlaylistId)


//Router 3rd Party API !!!! ini masih gua taro sebelum authen, nanti mah taro dibawah, soalnya authen-nya belum bener
router.post('/search', APIController.searchDeezer)
router.get('/billboard', APIController.billboard)
router.get('/randomJokes', APIController.randomJokes)



// User
// router.post('/register', UserController.register)


module.exports = router;