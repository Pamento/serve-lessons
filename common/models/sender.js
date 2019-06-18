'use strict';

module.exports = function(Sender) {
  process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';
  Sender.mail = function(msg, cb) {
    console.log('sender Ok:\n', Sender.app.models);
    console.log('sender msg:\n', msg);
    Sender.app.models.Email.send({
      to: 'pamento@op.pl',
      from: 'localhost',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html</em>',
    }, function(err, mail) {
      console.log('email sent!\n', mail);
      cb(err);
    });
  };

  Sender.email = function(cb) {
    var currentDate = new Date();
    console.log('Current hour is %d', currentDate);
    var response = currentDate;

    cb(null, response);
  };
  Sender.remoteMethod(
    'email', {
      http: {
        path: '/email',
        verb: 'get',
      },
      returns: {
        arg: 'Send date',
        type: 'date',
      },
    }
  );
};
