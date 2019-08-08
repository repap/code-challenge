require('dotenv').config()

const express = require('express')
const booksRouter = require('./app/books/router')

const app = express()

const {PORT} = process.env

app.use('/books', booksRouter)

app.use('*', (req, res) =>
  res.status(404).json({
    message: 'path is not available',
    options: {...req.query},
    data: []
  }))


app.listen(
  PORT, 
  err => 
    err ? 
    console.error(err) :
    console.log(`app is listening to port ${PORT}`)
  )