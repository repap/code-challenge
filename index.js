require('dotenv').config()

const express = require('express')
const axios = require('axios')

const app = express()

const {PORT, API_KEY} = process.env

// TODO: refactor -> seperate file -> new router && controller
// TODO: handle axios timeout
const getGoogleBooks = ({query, limit = 5, page = 0, key}) => 
  axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${page}&key=${key}`,
    {
      timeout: 60000
    })
  .then(res => res.data.items)
  .catch(console.error)

const mapBooks = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors,
  information: {
    publisheDate: book.volumeInfo.publishedDate,
    pageCount: book.volumeInfo.pageCount,
    categories: book.volumeInfo.categories,
  }
})

const sortBooks = (a,b) => a.title >= b.title ? true : false

app.get('/books', async (req, res) => {
  // TODO: add test query -> is available
  const books = await getGoogleBooks({...req.query, key: API_KEY})

  // TODO: handle status codes
  res.status(200).json({
    message: 'success',
    options: {
      ...req.query
    },
    data: books.map(mapBooks).sort(sortBooks)
  })

  // example bad request for missing book title query
  // res.status(400).json({
  //   message: 'bad request',
  //   options: {
  //     ...req.query
  //   },
  //   data: {message: 'book title query option is missing'}
  // })
})

app.use('*', (req, res) =>
  res.status(404).json({
    message: 'path is not available',
    data: []
  }))


app.listen(
  PORT, 
  err => 
    err ? 
    console.error(err) :
    console.log(`app is listening to port ${PORT}`)
  )