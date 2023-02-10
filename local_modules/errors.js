/**
 * This would normally be a module published as a private npm repo so that it could be re-used by multiple
 * projects. I'll create this pared down version and use it locally.
 */

// Enum of HTTP status codes
const HTTP_STATUS = {
  BAD_REQUEST: 400
}

class Err extends Error {
  constructor (code, message) {
    super(message, {})
    this.code = code
  }
}

module.exports.Err = Err
module.exports.HTTP_STATUS = HTTP_STATUS
