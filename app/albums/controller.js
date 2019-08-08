const axios = require('axios')
const { sortByProperty } = require('../utils/arrayHelpers')
const { mapRequestError } = require('../utils/requestResponseHelpers')

const sortByTitle = sortByProperty('collectionName')

const mapAlbums = album => ({
  title: album.collectionName,
  artists: album.artistName,
  information: {
    tracks: album.trackCount,
    release: album.releaseDate,
    category: album.primaryGenreName
  }
})

const fetchItunesAlbums = async ({ query, limit = 5 }, key) =>
  await axios.get(
    `https://itunes.apple.com/search?attribute=albumTerm&term=${query}&entity=album&limit=${limit}`,
    { timeout: 60000 })
    .then(res => res.data.results)
    .then(data => data.map(mapAlbums))
    .then(data => data.sort(sortByTitle))
    .catch(err => mapRequestError(err))

const getAlbums = async (req, res) => {
  const data = await fetchItunesAlbums({ query, limit })

  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }
  
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