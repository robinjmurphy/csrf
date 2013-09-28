var statusService = require('../services/statusService');

exports.update = function (req, res) {
  if (req.body && req.body.status !== undefined) {
    statusService.set(req.sessionID, req.body.status, function (err, status) {
      res.redirect(303, '/');
    });
  } else {
    res.status(400);
    res.end('Bad request');
  }
};

exports.show = function (req, res) {
  statusService.get(req.sessionID, function (err, status) {
    if (status !== undefined) {
      res.end(status);
    } else {
      res.status(404);
      res.end('No status found.');
    }    
  });
};