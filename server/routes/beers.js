const asyncHandler = require('express-async-handler')
const dataRequests = require('./../lib/data_requests')
const express = require('express')
const { Err, HTTP_STATUS } = require('./../../local_modules/errors')
const { Logger } = require('./../lib/logger')
const logger = new Logger('beers')
const { parseInt } = require('./../utils/general_utils')
const { RatingDocument } = require('./../lib/model/rating_document')
const router = express.Router()

/**
 * This call can be used to obtain beers by name.
 */
router.get('/:name', asyncHandler(async (req, res) => {
  const name = req.params.name
  const rawBeers = await dataRequests.getBeers(name)
  const filteredBeers = rawBeers.map(rawBeer => {
    return {
      id: rawBeer.id,
      name: rawBeer.name,
      description: rawBeer.description,
      first_brewed: rawBeer.first_brewed,
      food_pairing: rawBeer.food_pairing
    }
  })
  res.status(HTTP_STATUS.OK).json(filteredBeers)
}))

/**
 * This call is used to post a rating of a beer by its id
 */
router.post('/rate/:id', asyncHandler((req, res) => {
  const beerId = req.params.id
  const body = req.body
  if (!body.rating) {
    throw new Err(HTTP_STATUS.BAD_REQUEST, 'Body must contain a rating.')
  }
  const rating = parseInt(body.rating)
  if (isNaN(rating) || rating < 1 || rating > 5) {
    throw new Err(HTTP_STATUS.BAD_REQUEST, 'Rating must be a number between 1 and 5.')
  }
  const rateDoc = new RatingDocument(beerId, rating, body.comments)
  rateDoc.insert()
  logger.info(`Successfully entered rating for Beer ID: ${beerId}`)
  res.status(HTTP_STATUS.OK).end()
}))

module.exports = router
