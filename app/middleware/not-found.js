const HttpError = require('./error')

class NotFoundError extends HttpError {
  constructor (msg = 'Not found') {
    super(msg, 404)
  }
}

module.exports = (obj) => {
  if (!obj) {
    throw new NotFoundError()
  }
  return obj
}

module.exports.NotFoundError = NotFoundError
