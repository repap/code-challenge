require('dotenv').config()

const express = require('express')
const app = express()

const {PORT} = process.env

app.listen(
  PORT, 
  err => 
    err ? 
    console.error(err) :
    console.log(`app is listening to port ${PORT}`)
  )