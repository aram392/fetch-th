const express = require('express')
const transactionRouter = require('./controllers/transactions')
const app = express()

app.use(express.json())
app.use('/api', transactionRouter)

module.exports = app