const axios = require('axios')
const beerDataUrl = require('./../config/config').beerDataUrl
const { Logger } = require('./logger')
const logger = new Logger('data_requests')
/**
 * Functions in this file can be used to obtain data from external servers.
 */

/**
 * Perform a get on the PunkAPI using the provided name parameter. As per PunkAPI documentation any spaces
 * will be converted to underscores.
 */
const getBeers = async (name) => {
  const BASE_PATH = 'v2/beers/'
  name = name.trim().replace(/\s/g, '_')
  const url = _getUrl(BASE_PATH, { beer_name: name })
  try {
    const resp = await axios.get(url.toString())
    return resp.data
  } catch (err) {
    logger.error(`Error getting data from ${url.toString()}. Reason: ${err.response.data.toString()}`)
    throw err
  }
}

/**
 * Build a URL object to avoid issues when building urls using string appending. One example is having to
 * account for a trailing / which the URL class will take care of.
 *
 * @param path - Optional parameter that indicates the path of the url that is desired
 * @param queryParams - Optional object that can be used be to add query parameters to the request url
 * @returns {URL} - URL object that was created
 * @private
 */
const _getUrl = (path, queryParams) => {
  const url = new URL(beerDataUrl)
  url.pathname = path
  const searchParams = new URLSearchParams(queryParams)
  // toString should url encode here
  url.search = searchParams.toString()
  return url
}

module.exports.getBeers = getBeers
