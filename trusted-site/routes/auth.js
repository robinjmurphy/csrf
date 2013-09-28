var authenticator = require('../services/authenticator');

exports.authenticate = function (req, res) {
  authenticator.authenticate(req.sessionID, function (err, sessionID) {
    res.redirect(302, '/');
  });
};

exports.unauthenticate = function (req, res) {
  authenticator.unauthenticate(req.sessionID, function (err, sessionID) {
    res.redirect(302, '/');
  });
};