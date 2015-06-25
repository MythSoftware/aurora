module.exports = function (app) {

  var express = require('express');
  var MailUtil = require('../util/MailUtil')();

  var start = function () {

    /**
     * @api {post} /api/contactmessages Send us a message
     * @apiName Post Message
     * @apiGroup ContactMessages
     *
     * @apiParam {String} email
     * @apiParam {String} message
     */
    app.post('/api/contactmessages', function (req, res) {
      var data = req.body;
      var from = data.email;
      var to = 'mythmailrelay@gmail.com';
      var subject = 'Feedback from Aurora';
      var text = data.email + ' says: ' + data.message;
      MailUtil.sendMail(from, to, subject, text);
      res.send(200);
    });
  };

  return {
    start: start
  };

};
