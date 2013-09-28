var userStatuses = {};

exports.set = function (sessionID, status, cb) {
  userStatuses[sessionID] = status;
  cb(null, status);
};

exports.get = function (sessionID, cb) {
  cb(null, userStatuses[sessionID]);
};