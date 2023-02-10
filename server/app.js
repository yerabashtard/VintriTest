const beers = require('./routes/beers')
const { Database } = require('./lib/database')
// Initialize database
const db = new Database()
const express = require('express')
const { Logger } = require('./lib/logger')
const logger = new Logger('app.js')
const port = require('./config/config').port

// Start up server
const app = express()
app.listen(port, () => {
  logger.info(`Beer services running on ${port}`)
})

app.use('/beers', beers)

// Catch any uncaught exceptions
process.on('uncaughtException', (err) => {
  logger.error(err.toString())
  process.exit(1)
})

/**
 * Override the default Express error handler. NOTE: This must be the last middleware defined as per Express
 * documentation - https://expressjs.com/en/guide/error-handling.html
 */
app.use((err, req, res, next) => {
  logger.error(err.toString())
  res.status(err.code).send(err.toString())
})
