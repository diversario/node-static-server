/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
//  app.use(express.logger('dev'))
  app.use(express.methodOverride());
  app.use(app.router);
  app.use(express.static('/home'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

app.listen(3000, '0.0.0.0');
console.log("Express server listening on port 3000 in %s mode", app.settings.env);
