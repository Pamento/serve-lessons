'use strict';

var loopback = require('loopback');
var boot = require('loopback-boot');
var bodyParser = require('body-parser');
var path = require('path');
var dotenv = require('dotenv');
dotenv.config();

var app = module.exports = loopback();
// configure view handler
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// configure body parser
app.middleware('initial', bodyParser.urlencoded({extended: true}));
boot(app, __dirname);
// app.engine('html', require('ejs').renderFile);
// app.set('view engine', 'html');
// // app.set('view engine', 'ejs');
// // app.set('view engine', 'html');
// app.set('views', path.join(__dirname, '../views'));
app.set('json spaces', 2);

app.use(loopback.token());

app.start = function() {
  // start the web server
  return app.listen(function() {
    app.emit('started');
    var baseUrl = app.get('url').replace(/\/$/, '');
    console.log('Web server listening at: %s', baseUrl);
    if (app.get('loopback-component-explorer')) {
      var explorerPath = app.get('loopback-component-explorer').mountPath;
      console.log('Browse your REST API at %s%s', baseUrl, explorerPath);
    }
  });
};

// Bootstrap the application, configure models, datasources and middleware.
// Sub-apps like REST API are mounted via boot scripts.
boot(app, __dirname, function(err) {
  if (err) throw err;

  // start the server if `$ node server.js`
  if (require.main === module)
    app.start();
});
