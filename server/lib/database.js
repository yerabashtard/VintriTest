const config = require('./../config/config.js')
const { Err, HTTP_STATUS } = require('./../../local_modules/errors')
const NoSql = require('nosql')

let _instance = null

class Database {
  constructor () {
    if (!_instance) {
      _instance = NoSql.load(config.dbLocation)
    }
  }

  static insert (doc) {
    if (!doc.id || !doc.type) {
      throw new Err(HTTP_STATUS.BAD_REQUEST, 'id and type must be part of a document for it to be inserted.')
    }
    _instance.insert(doc)
  }

  static count () {

  }
}

module.exports.Database = Database
