const {getBooks} = require('./controller')
const express = require('express')

const router = express.Router()

router.get('/books', getBooks)

module.exports = router