const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')
const users = require('./api/users/users.route')

const app = express()

process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/api/v1/user', users)
app.use('*', (req, res) => res.status(404).json({ error: "not found anything amerovski urlde problemo" }))

module.exports = app

