const axios = require('axios')

const { API_KEY } = process.env

const sortByProperty = prop => (a, b) => a[prop] >= b[prop] ? true : false

const sortByTitle = sortByProperty('title')

const mapBookTitles = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors,
  information: {
    publisheDate: book.volumeInfo.publishedDate,
    pageCount: book.volumeInfo.pageCount,
    categories: book.volumeInfo.categories,
  }
})

const mapRequestError = err => ({
  error: {
    message: err.message,
    data: {
      name: err.name,
      code: err.code,
    }
  }
})

const fetchGoogleBooks = async ({ query, limit = 5, page = 0 }, key) =>
  await axios.get(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${page}&key=${key}`,
    { timeout: 60000 })
    .then(res => res.data.items)
    .then(data => data.map(mapBookTitles))
    .then(data => data.sort(sortByTitle))
    .catch(err => mapRequestError(err))

const getBooks = async ({query, limit=5, page=0}) => await fetchGoogleBooks({ query, limit, page }, API_KEY)

module.exports = {
  getBooks,
}