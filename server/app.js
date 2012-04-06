/**
 * Module dependencies.
 */

var express = require('express')
  , fs = require('fs')
  , jade = require('jade')
;


var app = module.exports = express.createServer();

// Configuration

app.set('views', __dirname + '/views')
   .set('view options', { 'layout': false })
   .set('view engine', 'jade');


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

 app.use(express.static(__dirname + '/../client'));
 app.use(app.router);

 app.dynamicHelpers({ messages: require('express-messages') });

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.listen(3000, '0.0.0.0');
console.log("Express server listening on port 3000 in %s mode", app.settings.env);
