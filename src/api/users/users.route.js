const { Router } = require('express')
const AuthControler = require('../authController')
const UserController = require('./users.controller')

const router = new Router()

router.route('/register').post(UserController.register)
router.route('/login').post(UserController.login)
router.route('/logout').post(AuthControler.verifyUserJwt, UserController.logout)
router.route('/enter').post(AuthControler.verifyUserJwt, UserController.enter)



module.exports = router