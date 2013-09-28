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

exports.referrerCheck = function (req, res, next) {
  if (req.get('Referrer').match(/^http:\/\/localhost:3000/)) {
    return next();
  } else {
    res.status(403);
    res.end('Forbidden');
  }
};