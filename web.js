var express = require('express');
var url = require('url');
var favicon = require('serve-favicon');

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
  app.use(favicon(__dirname + '/public/images/favicon.ico'));
});

// Routes

var renderIndex = function (req, res) {
  var pageData = {};
  res.render('index', pageData);
};

//var renderLanding = function (req, res) {
//  res.render('partials/landing/landing.jade');
//};

app.get('/about', function (req, res) {
  renderIndex(req, res);
});

app.get('/users', function (req, res) {
  renderIndex(req, res);
});

app.get('/contact', function (req, res) {
  renderIndex(req, res);
});

app.get('/', function (req, res) {
  //renderLanding(req, res);
  //res.redirectTo('/landing');
  renderIndex(req, res);
});


app.get('/recalls/:state?', function (req, res) {
  renderIndex(req, res);
});

app.get('/landing', function (req, res) {
  renderIndex(req, res);
});

app.get('/partials/home', function (req, res) {
  res.render('partials/home/home.jade');
});

app.get('/partials/about', function (req, res) {
  res.render('partials/about/about.jade');
});

app.get('/partials/users', function (req, res) {
  res.render('partials/users/users.jade');
});

app.get('/partials/contact', function (req, res) {
  res.render('partials/contact/contact.jade');
});

app.get('/partials/landing/landing', function (req, res) {
  res.render('partials/landing/landing.jade');
});

var contactMessagesApi = require('./api/ContactMessagesApi.js')(app);

var zipCodeApi = require('./api/ZipStatesApi.js')(app);

contactMessagesApi.start();

zipCodeApi.start();

app.require
app.listen(8888, function (){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
