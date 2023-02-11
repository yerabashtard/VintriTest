const { randomUUID } = require('crypto')
const { Database } = require('./../database')

/**
 * Generic DbDocument. Child classes can extend this class to create whatever kind of documents they wish.
 */
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

  /**
   * Insert this dbDocument into the database. According to the documents this insert function is supposed
   * to return a Database Builder which has a callback which is called when the operation is complete. On
   * testing however no Database Builder object is returned! Proceeding with an asynchronous insert for now.
   */
  insert () {
    Database.insert(this)
  }
}

module.exports.DbDocument = DbDocument
