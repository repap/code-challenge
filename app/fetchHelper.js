const axios = require('axios')

const mapBooks = book => ({
  title: book.volumeInfo.title,
  authors: book.volumeInfo.authors || [],
  type: 'book'
})

const mapAlbums = album => ({
  title: album.collectionName,
  artists: [album.artistName] || [],
  type: 'album'
})

const generateGoogleBooksUrl = (query, limit) =>
  `https://www.googleapis.com/books/v1/volumes?q=${query}&maxResults=${limit}`

const generateItunesAlbumUrl = (query, limit) => 
  `https://itunes.apple.com/search?attribute=albumTerm&term=${query}&entity=album&limit=${limit}`

const fetchApi = urlGenerator => ({ query, limit, options }) =>
  { return axios.get(urlGenerator(query, limit), options)}

const createFetchResult = (type, key, mapper = e => e) => res => ({
  response: {
    type,
    status: res.status,
    statusText: res.statusText,
    message: res.message,
  },
  data: res.data[key].map(mapper)
})

const createFetchError = (type) => err => ({
  response: {
    type,
    status: err.response ? err.response.status : 500,
    statusText: err.response ? err.response.statusText : 'INTERNAL SERVER ERROR',
    message: err.message,
  }, 
  data: []
})

module.exports = {
  mapAlbums,
  mapBooks,
  fetchAlbums: fetchApi(generateItunesAlbumUrl),
  fetchBooks: fetchApi(generateGoogleBooksUrl),
  createFetchError,
  createFetchResult,
}