const axios = require('axios')

const sortByProperty = prop => (a, b) => a[prop] >= b[prop] ? true : false

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

const mapRequestError = err => ({
  error: {
    message: err.message,
    data: {
      name: err.name,
      code: err.code,
    }
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

const getAlbums = async ({ query, limit = 5 }) => await fetchItunesAlbums({ query, limit })

module.exports = {
  getAlbums,
}