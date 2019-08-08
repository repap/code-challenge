const {getBooks} = require('./controller')
const express = require('express')

const router = express.Router()

const createResponse = (message, data, options) => ({
  message,
  options,
  data,
})

router.use((req, res, next) => {
  if (!req.query.query) {
    return res.status(403).json(createResponse('error - query is missing', [], { ...req.query }))
  }
  next()
})

router.get('/', async (req, res) => {
  const data = await getBooks({ ...req.query })

  if(data.error) {
    return res.status(500).json(createResponse(data.error.message, {...data.error.data}, {...req.query}))
  }

  res.status(200).json(createResponse('success', data, req.query))
})

module.exports = router