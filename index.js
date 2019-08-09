require('dotenv').config()

const express = require('express')
const {getBooksAndAlbums} = require('./app/booksAndAlbums')

const {PORT} = process.env

const app = express()

// handle unvalid path
app.use('*', getBooksAndAlbums)

// init server
app.listen(
  PORT, 
  err => 
    err ? 
    console.error(err) :
    console.log(`app is listening to port ${PORT}`)
  )