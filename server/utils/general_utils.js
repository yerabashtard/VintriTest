/**
 * File that will contain generally useful functions that could be re-used.
 */

/**
 * This function will attempt to turn a string into a valid int. If the provided value is already a number it
 * will be returned normally.
 *
 * @param value - Value that should be a number
 */
const parseInt = (value) => {
  value = Number(value)
  return value >= 0 ? Math.floor(value) : Math.ceil(value)
}

/**
 * This function is used to check that an email address is valid.
 *
 * @param emailAddress - Email address to check
 * @returns {boolean}
 */
const isEmailValid = (emailAddress) => {
  const regEx = /^[a-z_\-0-9.*#$!~%^&+?|]+@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-z\-0-9]+\.)+[a-z]{2,}))$/
  return regEx.test(emailAddress)
}

module.exports.parseInt = parseInt
module.exports.isEmailValid = isEmailValid
