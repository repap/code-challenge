const createResponse = (message, data, options) => ({
  message,
  options,
  data,
})

module.exports = {
  mapRequestError,
  createResponse
}