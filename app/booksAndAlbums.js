const { mapAlbums, fetchItunesAlbums,  } = require('./albumsHelper')
const { mapBooks, fetchGoogleBooks } = require('./booksHelper')

const { API_KEY } = process.env
const TIMEOUT = process.env.TIMEOUT || 60000
const LIMIT = process.env.LIMIT || 5

const getBooksAndAlbums = async (req, res) => {
  // model request path based on original Url including additional parameters
  const path = req.originalUrl.split('?').shift()

  // check if path or methods are allowed and response if not
  if (req.method !== 'GET' || path !== '/') {
    return res.status(404)
      .json(createResponse('path is not available', [], { ...req.query }))
  }

  // check if query is set and response if it's missing
  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }

  // fetch all requests and model response and handle error 
  Promise.all([
    // fetch albums, model response
    fetchItunesAlbums({ limit: LIMIT, ...req.query }, { timeout: TIMEOUT })
      .then(res => ({ response: {name: 'google'}, data: res.data.results.map(mapAlbums)})),
    // fetch books, model response
    fetchGoogleBooks({ limit: LIMIT, ...req.query }, API_KEY, { timeout: TIMEOUT })
      .then(res => ({ response: { name: 'itunes' }, data: res.data.items.map(mapBooks) })),
  ])
    // reduce fetches to one response object
    .then(res => res.reduce(reduceBooksAndAlbums, {responses: [], data: []}))
    // sort response data
    .then(res => ({...res, data: {...res.data.sort(sortByTitle)}}))
    .then(data => 
      res.status(200)
        .json(createResponse('success', data, { ...req.query })))
    .catch( err => responseError(err, req, res) )
}

module.exports = {
  getBooksAndAlbums,
}

const responseError = (err, req, res) =>
  res.status(500)
    .json(createResponse(err.message, { name: err.name, code: err.code }, { ...req.query }))

const createResponse = (message, data, options) => ({
  message,
  options,
  data,
})

const reduceBooksAndAlbums = (accum, curr) => {
  accum.responses.push(curr.response)
  accum.data = [...accum.data, ...curr.data]

  return accum
}

const sortByProperty = prop => (a, b) => a[prop] >= b[prop] ? true : false

const sortByTitle = sortByProperty('title')