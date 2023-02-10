const asyncHandler = require('express-async-handler')
const dataRequests = require('./../lib/data_requests')
const express = require('express')
const { Err, HTTP_STATUS } = require('./../../local_modules/errors')
const router = express.Router()

router.get('/:name', asyncHandler(async (req, res) => {
  const name = req.params.name
  if (!name) {
    throw new Err(HTTP_STATUS.BAD_REQUEST, `Name must contain a valid string. Received ${name}`)
  }
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
  res.json(filteredBeers)
}))

module.exports = router
