var authenticator = require('../services/authenticator');
var statusService = require('../services/statusService');
var async = require('async');

exports.index = function (req, res) {
  async.parallel([
    function (callback) { authenticator.authenticated(req.sessionID, callback); },
    function (callback) { statusService.get(req.sessionID, callback); }
  ], function (err, callbacks) {
    var authenticated = callbacks[0],
        status = callbacks[1];
    
    res.render('index', {
      title: 'Trusted Site',
      authenticated: authenticated,
      _csrf: req.session._csrf,
      status: status,
      authenticatedText: function () {
        return (authenticated) ? 'authenticated' : 'unauthenticated';
      }
    });
  });
};

exports.auth = require('./auth');
exports.status = require('./userStatus');