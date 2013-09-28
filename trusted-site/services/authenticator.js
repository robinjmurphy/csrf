var authenticatedSessions = [];

exports.authenticate = function (id, cb) {
  if (authenticatedSessions.indexOf(id) === -1) {
    authenticatedSessions.push(id);
  }

  return cb(null, id);
};

exports.unauthenticate = function (id, cb) {
  var index = authenticatedSessions.indexOf(id);

  if (index > -1) {
    authenticatedSessions.splice(index, 1);
  }

  return cb(null, id);
};

exports.authenticated = function (id, cb) {
  return cb(null, authenticatedSessions.indexOf(id) > -1);
};