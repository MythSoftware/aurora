var express = require('express');
var url = require('url');
var secretProperties;

try {
  secretProperties = require('./secretProperties.js');
} catch (e) {
  secretProperties = {};
}
var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
  service: 'Gmail',
  auth: {
    user: 'mythmailrelay@gmail.com',
    pass: 'mailrelay'
}

});

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

var sendMail = function(req, res){
  var data = req.body;
    transporter.sendMail({
      from: data.email,
      to: 'mythmailrelay@gmail.com',
      subject: 'Feedback from Aurora',
      text: data.email + ' says: ' + data.message
    });
    res.json(data);
};

app.get('/about', function (req, res) {
  renderIndex(req, res);
});

app.get('/users', function (req, res) {
  renderIndex(req, res);
});

app.get('/contact', function (req, res) {
	  renderIndex(req, res);
	});
app.post('/api/contactmessages', function (req, res){
    sendMail(req, res);

});

app.get('/:state?', function (req, res) {
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


app.listen(8888, function (){
  console.log("Express server listening on port %d in %s mode", app.address().port, app.settings.env);
});
