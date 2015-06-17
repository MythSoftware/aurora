var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ignorePath:true, toProxy:true});
var properties = require('../properties.js');

module.exports = function (app) {

  var start = function () {

    app.get('/proxy/users', function (req, res) {
      var url;
      url = properties.apiUrl + '/user/users';
      proxy.web(req, res, { target: url});
    });

  };

  return {
    start: start
  };

};
