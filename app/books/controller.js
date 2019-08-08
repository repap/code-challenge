const axios = require('axios')
const { sortByProperty } = require('../utils/arrayHelpers')
const { mapRequestError, createResponse } = require('../utils/requestResponseHelpers')

const { API_KEY } = process.env

const sortByTitle = sortByProperty('title')

const generateGoogleBooksUrl = (query, limit, page, key) =>
  `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}&startIndex=${page}&key=${key}`

const mapBookTitles = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors || [],
  information: {
    publisheDate: book.volumeInfo.publishedDate || undefined,
    pageCount: book.volumeInfo.pageCount || undefined,
    categories: book.volumeInfo.categories || undefined,
  }
})

const fetchGoogleBooks = async ({ query, limit = 5, page = 0 }, key, config = {}) =>
  await axios.get( generateGoogleBooksUrl(query, limit, page, key), config )
    .then(res => res.data.items)
    .then(data => data.map(mapBookTitles))
    .then(data => data.sort(sortByTitle))
    .catch(err => mapRequestError(err))

const getBooks = async (req, res) => {
  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }

  const data = await fetchGoogleBooks({ ...req.query }, API_KEY, { timeout: 60000 })

  if (data.error) {
    return res.status(500)
      .json(createResponse(data.error.message, { ...data.error.data }, { ...req.query }))
  }

  res.status(200)
    .json(createResponse('success', data, req.query))
}

module.exports = {
  getBooks,
}