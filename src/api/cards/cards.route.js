const Router = require('express')
const CardsController = require('./cards.controller')
const AuthControler = require('../authController')
const router = new Router()

router.route('/add_card').post(AuthControler.verifyUserJwt, CardsController.addCard)
router.route('/get_card').get(AuthControler.verifyUserJwt, CardsController.getCard)
router.route('/update_card').post(AuthControler.verifyUserJwt, CardsController.updateCard)

module.exports = router