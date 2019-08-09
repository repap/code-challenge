const { 
  mapAlbums, 
  mapBooks, 
  fetchAlbums, 
  fetchBooks,
  createFetchResult,
  createFetchError,
} = require('./fetchHelper')

const {
  sendError,
  sendResponse,
} = require('./responseHelper')

const {
  reduceBooksAndAlbums,
  sortBooksAndAlbums,
  sortByTitle,
  booksAndAlbusReducer,
} = require('./booksAndAlbumsHelper')

const apiOptions = {
  limit: process.env.LIMIT || 5,
  options: {
    timeout: process.env.TIMEOUT || 60000
  }
}

const getRequestPath = url => 
  url.split('?').shift()

const getBooksAndAlbums = (req, res) => {
  
  // check if path or methods are available and response if not
  if (req.method !== 'GET' || getRequestPath(req.originalUrl) !== '/') {
    return sendResponse(404, 'NOT FOUND', res)()
  }

  // check if query is set and response if it's missing
  if (!req.query.query) {
    return sendResponse(400, 'BAD REQUEST', res, 'query is missing')()
  }

  // fetch options contains the environment options which can be overwritten by request (e.g. limit)
  const fetchOptions = {
    ...apiOptions,
    ...req.query,
  }

  // fetch all requests (books & albums), model the response and handle errors 
  Promise.all([
    fetchAlbums({ ...fetchOptions })
      .then(createFetchResult('album', 'results', mapAlbums))
      .catch(createFetchError('album')),
    fetchBooks({ ...fetchOptions })
      .then(createFetchResult('book', 'items', mapBooks))
      .catch(createFetchError('book')),
  ])
    .then(reduceBooksAndAlbums(booksAndAlbusReducer))
    .then(sortBooksAndAlbums(sortByTitle))
    .then(sendResponse(200, 'OK', res))
    .catch(sendError(500, 'INTERNAL SERVER ERROR', res))
}

module.exports = {
  getBooksAndAlbums,
}