const axios = require('axios')
const { sortByProperty } = require('../utils/arrayHelpers')
const { mapRequestError, createResponse } = require('../utils/requestResponseHelpers')

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
    .then(res => res.data.results)
    .then(data => data.map(mapAlbums))
    .then(data => data.sort(sortByTitle))
    .catch(err => mapRequestError(err))

const getAlbums = async (req, res) => {
  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }

  const data = await fetchItunesAlbums({ ...req.query }, { timeout: 60000 })
  
  if (data.error) {
    return res.status(500)
      .json(createResponse(data.error.message, { ...data.error.data }, { ...req.query }))
  }

  res.status(200)
    .json(createResponse('success', data, req.query))
}

module.exports = {
  getAlbums,
}