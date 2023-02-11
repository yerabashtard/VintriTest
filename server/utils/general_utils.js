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

module.exports.parseInt = parseInt
