var httpProxy = require('http-proxy');
var proxy = httpProxy.createProxyServer({ignorePath:true, toProxy:true});
var properties = require('../properties.js');

module.exports = function (app) {

  var start = function () {

    /**
     * @api {get} /user/users Get users
     * @apiName GetUsers
     * @apiGroup Users
     *
     * @apiHeader {String} x-auth-token Authentication Token
     * @apiHeader {String} x-xsrf xsrf token
     * @apiParam {String} [q] Optional query string
     * @apiParam {String=firstName,lastName,state,city,pa} [sort=lastName,firstName] comma separated list of sort order with signs
     * @apiParam {Number {1-100}} [limit=25] Maximum number of elements to return
     * @apiUse cursorParams
     *
     * @apiSuccess {Object[]} users List of Users
     * @apiSuccess {String} users.firstName User's First Name
     * @apiSuccess {String} users.lastName User's First Name
     * @apiSuccess {String} users.state User's State
     * @apiSuccess {String} users.city User's City
     * @apiSuccess {String} users.pa User's pa
     *
     */
    app.get('/proxy/users', function (req, res) {
      var url;
      url = properties.apiUrl + '/user/users';
      proxy.web(req, res, { target: url});
    });

    /**
     * @api {get} /user/users/:id Get user by id
     * @apiName GetUser
     * @apiGroup Users
     *
     * @apiHeader {String} x-auth-token Authentication Token
     * @apiHeader {String} x-xsrf xsrf token
     *
     * @apiSuccess {String} firstName User's First Name
     * @apiSuccess {String} lastName User's First Name
     * @apiSuccess {String} state User's State
     * @apiSuccess {String} city User's City
     * @apiSuccess {String} pa User's pa
     *
     */
    app.get('/proxy/users/:id', function (req, res) {
      // TODO implement me
    });

  };

  return {
    start: start
  };

};
