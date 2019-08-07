require('dotenv').config()

const express = require('express')
const axios = require('axios')

const app = express()

const {PORT, API_KEY} = process.env


// TODO: refactor -> seperate file -> new router
const getGoogleBooks = ({query, limit = 5, page = 0, key}) => 
  axios.get(`https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${page}&key=${key}`)
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

  res.status(200).json({
    message: '...',
    options: {
      ...req.query
    },
    books: books.map(mapBooks).sort(sortBooks)
  })
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