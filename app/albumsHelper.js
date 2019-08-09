const axios = require('axios')

const mapAlbums = album => ({
  title: album.collectionName,
  artists: [album.artistName] || [],
  type: 'album'
})

const generateItunesAlbumUrl = (query, limit) =>
  `https://itunes.apple.com/search?attribute=albumTerm&term=${query}&entity=album&limit=${limit}`

const fetchItunesAlbums = async ({ query, limit }, config = {}) =>
  await axios.get(generateItunesAlbumUrl(query, limit), config)

module.exports = {
  mapAlbums,
  fetchItunesAlbums,
}