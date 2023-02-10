const { randomUUID } = require('crypto')
const { Database } = require('./../database')

class DbDocument {
  constructor (prefix, type, id) {
    if (!id) {
      id = randomUUID()
    }
    this.id = `${prefix}${id}`
    this.type = type
    const timestamp = Date.now()
    this.created = timestamp
    this.modified = timestamp
  }

  insert () {
    Database.insert(this)
  }
}

module.exports.DbDocument = DbDocument
