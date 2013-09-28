var authenticator = require('../services/authenticator');

exports.authorization = function (req, res, next) {
  authenticator.authenticated(req.sessionID, function (err, authenticated) {
    if (authenticated) {
      return next();
    } else {
      res.status(401);
      res.end('Not authorized');
    }
  });
};

exports.cacheability = function (req, res, next) {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Expires', '-1');
  next();
};