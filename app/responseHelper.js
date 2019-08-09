const sendResponse = (status, statusText, res, message = undefined) => (data = {}) => 
  res.status(status)
    .json({
      status,
      statusText,
      message,
      ...data
    })

const sendError = (status, statusText, res ) => err => 
  res.status(status)
    .json({
      status,
      statusText,
      message: err.message
    })

module.exports = {
  sendError,
  sendResponse,
}