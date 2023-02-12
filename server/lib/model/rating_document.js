const { Prefix, Type } = require('./../../utils/constants')
const { DbDocument } = require('./db_document')

/**
 * Class used to create a rating document which can be added to the database.
 */
class RatingDocument extends DbDocument {
  constructor (beerId, rating, comments) {
    super(Prefix.RATING, Type.RATING)
    this.beerId = beerId
    this.rating = rating
    this.comments = comments
  }

  /**
   * Insert this document into the database
   */
  insert () {
    super.insert()
  }
}

module.exports.RatingDocument = RatingDocument
