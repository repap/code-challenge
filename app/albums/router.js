const {getAlbums} = require('./controller')
const { createResponse } = require('./../utils/requestResponseHelpers')
const express = require('express')

const router = express.Router()

router.get('/albums', getAlbums)

module.exports = router