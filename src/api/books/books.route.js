const { Router } = require('express')
const AuthControler = require('../authController')
const BooksController = require('./books.controller')
const router = new Router()

router.route('/get_all_books').get(AuthControler.verifyUserJwt, BooksController.getAllBooks)

module.exports = router