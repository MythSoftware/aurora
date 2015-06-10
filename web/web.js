var express = require('express');
var url = require('url');

var app;

app = module.exports = express.createServer();

app.configure(function(){
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.static('public'));
  app.use(express.cookieParser());
  app.use(express.bodyParser());
  app.use(app.router);
  app.set('view options', {
    layout: false
  });
});

// Routes

var renderIndex = function (req, res) {
  var pageData = {};
  res.render('index', pageData);
};

app.get('/', function (req, res) {
  renderIndex(req, res);
});

app.listen(8888, function (){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});