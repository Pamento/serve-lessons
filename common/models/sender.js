'use strict';

const path = require('path');
const loopback = require('loopback');

module.exports = function(Sender) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

  Sender.mail = function(msg, cb) {
    const options = {
      name: msg.name,
      mail: msg.email,
      text: msg.message,
    };

    let template = loopback.template(
        path.resolve(__dirname, '../../server/views/contact-msg.ejs')
      );
    let html = template(options);
    Sender.app.models.Email.send({
      to: 'pohos.samut@gmail.com',
      from: msg.email,
      subject: 'Message From French Lessons web site',
      html: html,
    }, function(err, mail) {
      console.log('email sent!\n', mail);
      cb(err);
    });
  };

  // Sender.email = function(cb) {
  //   var currentDate = new Date();
  //   console.log('Current hour is %d', currentDate);
  //   var response = currentDate;

  //   cb(null, response);
  // };
  // Sender.remoteMethod(
  //   'email', {
  //     http: {
  //       path: '/email',
  //       verb: 'get',
  //     },
  //     returns: {
  //       arg: 'Send date',
  //       type: 'date',
  //     },
  //   }
  // );
};
