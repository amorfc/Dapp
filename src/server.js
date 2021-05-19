const express = require('express')
const bodyParser = require('body-parser')
const morgan = require('morgan')

const app = express()

process.env.NODE_ENV !== "prod" && app.use(morgan("dev"))

app.use('*', (req, res) => res.status(404).json({ error: "not found anything amerovski urlde problemo" }))

module.exports = app

