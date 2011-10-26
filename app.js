/**
 * Module dependencies.
 */

var express = require('express'),
    fs = require('fs');

var app = module.exports = express.createServer();

// Configuration

app.configure(function(){
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(function(req, res, next){
    var id = /^\/(\d+)\//.exec(req.url) || null;
    if(id){
      if(id[1] == null) id[1] = 0;
      req.url = req.url.slice(id[1].length+1);
      //if (req.url.slice(req.url.length-1) !== '/') req.url += '/';
    }
    next();
  })
  app.use(app.router);
  app.use(express.static('/home/diversario/Documents/Projects/IA-PK/'));
});

app.configure('development', function(){
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true })); 
});

app.configure('production', function(){
  app.use(express.errorHandler()); 
});

// Routes
/*
app.get('/:id', function(req, res){
  req.url = req.url.slice(req.params.id.length + 1);
  res.end(index);
});
*/
app.listen(3000);
console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
