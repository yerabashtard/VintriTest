const { LogDocument } = require('./model/log_document')

const LOG_LEVEL = {
  DEBUG: 'DEBUG',
  INFO: 'INFO',
  WARN: 'WARN',
  ERROR: 'ERROR'
}

/**
 * Logger class used to send logs to the database
 */
class Logger {
  constructor (name) {
    this.name = name
  }

  debug (message) {
    console.debug(`${this.name} - ${message}`)
    const logDoc = new LogDocument(message, LOG_LEVEL.DEBUG)
    logDoc.insert()
  }

  info (message) {
    console.info(`${this.name} - ${message}`)
    const logDoc = new LogDocument(message, LOG_LEVEL.INFO)
    logDoc.insert()
  }

  warn (message) {
    console.warn(`${this.name} - ${message}`)
    const logDoc = new LogDocument(message, LOG_LEVEL.WARN)
    logDoc.insert()
  }

  error (message) {
    console.error(`${this.name} - ${message}`)
    const logDoc = new LogDocument(message, LOG_LEVEL.ERROR)
    logDoc.insert()
  }
}

module.exports.Logger = Logger
