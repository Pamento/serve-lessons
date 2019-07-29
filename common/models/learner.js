'use strict';

const config = require('../../server/config.json');
const path = require('path');
const senderAddress = 'no-replay@email.com';
const loopback = require('loopback');

module.exports = function(Learner) {

  Learner.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered', userInstance);

    const options = {
      type: 'email',
      to: userInstance.email, // or user.email
      from: senderAddress,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      text: '{href}',
      redirect: '/verified',
      user: userInstance,
    };

    // or user.verify
    userInstance.verify(options, function(err, response) {
      console.log('text', options.text);
      if (err) {
        Learner.deleteById(userInstance.id);
        return next(err);
      }
    });
  });

  Learner.on('resetPasswordRequest', function(info) {
    let url = 'http://' + config.host + ':' + config.port + '/reset-password';
    let link = url + '?access_token=' + info.accessToken.id;
    const options = {
      url: url,
      link: link,
      user: info.email,
    };

    let template = loopback.template(
        path.resolve(__dirname, '../../server/views/link-pass-reset.ejs')
      );
    let html = template(options);
    Learner.app.models.email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html,
    }, function(err) {
      if (err) return console.log('> error sending password reset email', err);
      console.log('> sending password reset email to: ', info.email);
    });
  });
};
