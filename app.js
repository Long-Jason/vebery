/**
 * Module dependencies.
 */
var express = require('express')
  , fs = require('fs')
  , http = require('http')
  , mongoose = require('mongoose')
  
// Load configurations
// if test env, load example file
var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

// create mongodb connection
//mongoose.connect('mongodb://localhost:27017/medmgr');
mongoose.connect(process.env.MONGOHQ_URL);

var app = express();
// express settings
require('./config/express')(app, config)

// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// Bootstrap routes
require('./config/routes')(app)

var port = process.env.PORT || 3000
http.createServer(app).listen(port, function(){
  console.log('Express server listening on port ' + port);
});

exports = module.exports = app