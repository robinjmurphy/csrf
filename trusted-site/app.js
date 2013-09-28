
/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');
var crypto = require('crypto');
var interceptors = require('./interceptors');
var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.cookieParser());
app.use(express.session({ secret: "my-secret" }));
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' === app.get('env')) {
  app.use(express.errorHandler());
}

app.all('*', interceptors.cacheability);
app.post('*', interceptors.referrerCheck);
app.get('/', routes.index);
app.get('/authenticate', routes.auth.authenticate);
app.all('/user/*', interceptors.authorization);
app.get('/user/unauthenticate', routes.auth.unauthenticate);
app.post('/user/status', routes.status.update);
app.get('/user/status', routes.status.show);

http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
