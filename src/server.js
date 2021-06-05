const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const users = require('./api/users/users.route')
const cards = require('./api/cards/cards.route')
const books = require('./api/books/books.route')
const courses = require('./api/courses/courses.route')

const app = express()

process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))

app.use(express.json())

app.use('/api/v1/user', users)
app.use('/api/v1/card', cards)
app.use('/api/v1/book', books)
app.use('/api/v1/course', courses)
app.use('*', (req, res) => res.status(404).json({ error: "not found anything amerovski URLde problemo" }))

module.exports = app

