const { Router } = require('express')
const UserController = require('./users.controller')

const router = new Router()

router.route('/register').post(UserController.register)
router.route('/login').post(UserController.login)



module.exports = router