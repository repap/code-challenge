const axios = require('axios')
const { sortByProperty } = require('../utils/arrayHelpers')
const { createResponse } = require('../utils/requestResponseHelpers')

const sortByTitle = sortByProperty('collectionName')

const generateItunesAlbumUrl = (query, limit) =>
  `https://itunes.apple.com/search?attribute=albumTerm&term=${query}&entity=album&limit=${limit}`

const mapAlbums = album => ({
  title: album.collectionName,
  artists: [album.artistName] || [],
  information: {
    tracks: album.trackCount || undefined,
    release: album.releaseDate || undefined,
    category: album.primaryGenreName || undefined,
  }
})

const fetchItunesAlbums = async ({ query, limit = 5 }, config = {}) =>
  await axios.get( generateItunesAlbumUrl(query, limit), config )

const getAlbums = async (req, res) => {
  // check if query is set and response if it's missing
  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }

  // fetch data, model response, send response and handle errors
  fetchItunesAlbums({ ...req.query }, { timeout: 60000 })
    .then(res => res.data.results)
    .then(data =>
      data.map(mapAlbums).sort(sortByTitle))
    .then(data =>
      res.status(200)
        .json(createResponse('success', data, req.query)))
    .catch(err =>
      res.status(500)
        .json(createResponse(err.message, { name: err.name, code: err.code }, { ...req.query })))  
}

module.exports = {
  getAlbums,
}