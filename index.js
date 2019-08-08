require('dotenv').config()

const express = require('express')
const booksRouter = require('./app/books/router')
const albumsRouter = require('./app/albums/router')
const { createResponse } = require('./app/utils/requestResponseHelpers')

const {PORT} = process.env

const app = express()

app.use(booksRouter)
app.use(albumsRouter)

app.use('*', (req, res) =>
  res.status(404).json(createResponse('path is not available', [], {...req.query})))

app.listen(
  PORT, 
  err => 
    err ? 
    console.error(err) :
    console.log(`app is listening to port ${PORT}`)
  )