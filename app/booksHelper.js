const axios = require('axios')

const mapBooks = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors || [],
  type: 'book'
})

const generateGoogleBooksUrl = (query, limit, key) =>
  `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&key=${key}`

const fetchGoogleBooks = async ({ query, limit }, key, config = {}) =>
  await axios.get(generateGoogleBooksUrl(query, limit, key), config)

module.exports = {
  mapBooks,
  fetchGoogleBooks
}