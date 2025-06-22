const xss = require('xss');

function sanitizeRequest(req, res, next) {
  // Sanitize req.body
  if (req.body) {
    for (const key in req.body) {
      if (typeof req.body[key] === 'string') {
        req.body[key] = xss(req.body[key]);
      }
    }
  }

  // Sanitize req.params
  if (req.params) {
    for (const key in req.params) {
      if (typeof req.params[key] === 'string') {
        req.params[key] = xss(req.params[key]);
      }
    }
  }

  // Sanitize req.query — without replacing the whole object
  const sanitizedQuery = {};
  if (req.query) {
    for (const key in req.query) {
      if (typeof req.query[key] === 'string') {
        sanitizedQuery[key] = xss(req.query[key]);
      }
    }
    req.query = sanitizedQuery;
  }

  next();
}

module.exports = sanitizeRequest;