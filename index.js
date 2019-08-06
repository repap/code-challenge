require('dotenv').config()

const express = require('express')
const app = express()

const {PORT} = process.env


// TODO: refactor -> seperate file -> new router
const filterAmount = num => (e, i) => num > i ? e : false

app.get('/books', (req, res) => {
  const amount = req.query.amount || 5
  const q = req.query.q
  
  // TODO: add fetch -> get books
  const data = [1,2,3,4,5,6,7,8]

  // TODO: add tests for amount -> is number

  // TODO: add test query -> is set
  // TODO: add test query -> is evil

  res.status(200).json({
    message: '...',
    query: {
      q: q,
      amount: amount
    },
    data: data.filter(filterAmount(amount))
  })
})

app.use('*', (req, res) =>
  res.status(400).json({
    message: 'query is not available',
    data: []
  }))


app.listen(
  PORT, 
  err => 
    err ? 
    console.error(err) :
    console.log(`app is listening to port ${PORT}`)
  )