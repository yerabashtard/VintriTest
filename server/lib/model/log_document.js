const { Prefix, Type } = require('./../../utils/constants')
const { DbDocument } = require('./db_document')

class LogDocument extends DbDocument {
  constructor (message, logLevel) {
    super(Prefix.LOG, Type.LOG)
    this.message = message
    this.logLevel = logLevel
  }

  insert () {
    super.insert()
  }
}

module.exports.LogDocument = LogDocument
