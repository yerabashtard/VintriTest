module.exports = {
  port: 3030, // Port that the backend server will run on

  beerDataUrl: 'https://api.punkapi.com/', // Url that will be used to obtain beer data

  dbLocation: './TestDatabase', // Location of the database

  cacheTTL: 600, // Number of seconds before the cache is flushed
  checkPeriod: 60 // Number of seconds used for the automatic delete check interval
}
