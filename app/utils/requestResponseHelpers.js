const mapRequestError = err => ({
  error: {
    message: err.message,
    data: {
      name: err.name,
      code: err.code,
    }
  }
})

const createResponse = (message, data, options) => ({
  message,
  options,
  data,
})

module.exports = {
  mapRequestError,
  createResponse
}