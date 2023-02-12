const { Prefix, Type } = require('./../../utils/constants')
const { DbDocument } = require('./db_document')

/**
 * Class used to create a log document which can be added to the database.
 */
class LogDocument extends DbDocument {
  constructor (message, logLevel) {
    super(Prefix.LOG, Type.LOG)
    this.message = message
    this.logLevel = logLevel
  }

  /**
   * Insert this document into the database
   */
  insert () {
    super.insert()
  }
}

module.exports.LogDocument = LogDocument
