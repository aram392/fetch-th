const express = require('express')
const pointsRouter = require('./controllers/points')
const app = express()

app.use(express.json())
app.use('/api/points', pointsRouter)

module.exports = app