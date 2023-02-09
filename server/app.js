const express = require('express')
const port = require('./config/config').port

const app = express()
// Start up server
app.listen(port, () => {
  console.log(`Beer services running on ${port}`)
})
