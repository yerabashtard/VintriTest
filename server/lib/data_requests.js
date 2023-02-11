/**
 * Functions in this file can be used to obtain data from external servers.
 */
const axios = require('axios')
const config = require('./../config/config')
const { Logger } = require('./logger')
const logger = new Logger('data_requests')
const NodeCache = require('node-cache')
const beerRequestCache = new NodeCache({ stdTTL: config.cacheTTL, checkperiod: config.checkPeriod })
beerRequestCache.on('expired', (key) => {
  logger.info(`${key} has expired and will be removed from the cache.`)
})

/**
 * Perform a get on the PunkAPI using the provided name parameter. As per PunkAPI documentation any spaces
 * will be converted to underscores. A check will be performed to see if the result we are looking for is
 * cached. If so then the cached version will be returned.
 */
const getBeers = async (name) => {
  name = name.trim().replace(/\s/g, '_')
  if (beerRequestCache.has(name)) {
    logger.debug(`Cached result for ${name} will be returned.`)
    return beerRequestCache.get(name)
  }
  const BASE_PATH = 'v2/beers/'
  const url = _getUrl(BASE_PATH, { beer_name: name })
  try {
    logger.debug(`Obtaining results for "${name}" from PunkAPI.`)
    const resp = await axios.get(url.toString())
    const result = resp.data
    beerRequestCache.set(name, result)
    return result
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
  const url = new URL(config.beerDataUrl)
  url.pathname = path
  const searchParams = new URLSearchParams(queryParams)
  // toString should url encode here
  url.search = searchParams.toString()
  return url
}

module.exports.getBeers = getBeers
