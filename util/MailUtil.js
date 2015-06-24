module.exports = function (secretProperties) {
  var nodemailer = require('nodemailer');
  var secretProperties;

  try {
    secretProperties = require('../secretProperties.js');
  } catch (e) {
    secretProperties = {};
  }

  var transporter = nodemailer.createTransport({
    service: secretProperties.nodemailer_service,
    auth: {
      user: secretProperties.nodemailer_user,
      pass: secretProperties.nodemailer_pass
    }
  });

  var sendMail = function (from, to, subject, text) {
    transporter.sendMail({
      from: from,
      to: to,
      subject: subject,
      text: text
    });
  };

  return {
    sendMail:sendMail
  };

};
