var crypto = require('crypto');

function generateToken(sessionID) {
  return crypto.createHash('md5')
                   .update(sessionID)
                   .digest('base64');
}

exports.getToken = function (sessionID) {
  return generateToken(sessionID);
};

exports.validToken = function (token, sessionID) {
  var hashedSessionId = generateToken(sessionID);
  return (token === hashedSessionId);
};