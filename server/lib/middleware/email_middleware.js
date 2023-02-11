const asyncHandler = require('express-async-handler')
const { Err, HTTP_STATUS } = require('./../../../local_modules/errors')
const { isEmailValid } = require('./../../utils/general_utils')

/**
 * Check to make sure the x-user header has been included and the email address is valid
 */
const USER_EMAIL_HEADER = 'x-user'
const checkEmailInHeader = asyncHandler(async (req, res, next) => {
  const userEmail = req.headers[USER_EMAIL_HEADER]
  if (!userEmail) {
    throw new Err(HTTP_STATUS.BAD_REQUEST, 'Could not find x-user header in request.')
  }
  if (!isEmailValid(userEmail)) {
    throw new Err(HTTP_STATUS.BAD_REQUEST, `Email address is not valid. Received: ${userEmail}`)
  }
  next()
})

module.exports.checkEmailInHeader = checkEmailInHeader
