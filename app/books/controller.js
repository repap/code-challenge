const axios = require('axios')
const { sortByProperty } = require('../utils/arrayHelpers')
const { createResponse } = require('../utils/requestResponseHelpers')

const { API_KEY } = process.env

const sortByTitle = sortByProperty('title')

const generateGoogleBooksUrl = (query, limit, page, key) =>
  `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${page}&key=${key}`

const mapBooks = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors || [],
  information: {
    publisheDate: book.volumeInfo.publishedDate || undefined,
    pageCount: book.volumeInfo.pageCount || undefined,
    categories: book.volumeInfo.categories || [],
  }
})

const fetchGoogleBooks = async ({ query, limit = 5, page = 0 }, key, config = {}) =>
  await axios.get( generateGoogleBooksUrl(query, limit, page, key), config )

const getBooks = async (req, res) => {
  // check if query is set and response if it's missing
  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }

  // fetch data, model response, send response and handle errors
  fetchGoogleBooks({ ...req.query }, API_KEY, { timeout: 60000 })
    .then(res => res.data.items)
    .then(data => 
      data.map(mapBooks).sort(sortByTitle))
    .then(data => 
      res.status(200)
        .json(createResponse('success', data, req.query)))
    .catch(err => 
      res.status(500)
        .json(createResponse(err.message, { name: err.name, code: err.code }, { ...req.query })))  
}

module.exports = {
  getBooks,
}