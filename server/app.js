/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , ENV = process.env['ENV'] || 'development'
  , jade = require('jade')
  , gzip = require('connect-gzip')
  , less = require('less')
  , publicDir = __dirname + '/../client'
;


var app = module.exports = express.createServer();


// Configuration
app.set('views', __dirname + '/views')
   .set('view options', { 'layout': false })
   .set('view engine', 'jade')
;

app.use(express.bodyParser())
   .use(express.cookieParser())
   .use(gzip.gzip({ flags: '--best' }))
;

// LESS compiler
app.use(less.middleware(
 {   'src': publicDir
   , 'dest': publicDir
   , 'compress': ENV != 'development'
   , 'debug': ENV == 'development'
   , 'force': ENV == 'development'
 }
));

// First try to serve content from "publicDir"
app.use(express.static(publicDir));

app.dynamicHelpers({ messages: require('express-messages') });



// Routes

// Serve index.jade for requests to /
app.get('/', function (req, res) {
  res.render('index');
});


// For all other requests try serve a view with the "page" name
app.get('/:page', function (req, res) {
  res.render(req.params.page);
});


app.listen(3000, '0.0.0.0');
console.log("Express server listening on port 3000 in %s mode", app.settings.env);
