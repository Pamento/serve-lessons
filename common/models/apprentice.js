'use strict';

const config = require('../../server/config.json');
const path = require('path');
const senderAddress = "no-replay@email.com";
const loopback = require('loopback');

module.exports = function(Apprentice) {
console.log('in Apprentice sending mailing');

  // Apprentice.sendEmail = function(cb) {
  //   Apprentice.app.models.Email.send({
  //     to: 'foo@bar.com',
  //     from: senderAddress,
  //     subject: 'Emial from me',
  //     text: '{href}',

  //     html: 'my <em>kapusta</em>'
  //   }, function(err, mail) {
  //     console.log('email sent!');
  //     cb(err);
  //   });
  // }

  Apprentice.afterRemote('create', function(context, userInstance, next) {
    console.log('> user.afterRemote triggered');

    const options = {
      type: 'email',
      to: userInstance.email, // or user.email
      from: senderAddress,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../server/views/verify.ejs'),
      text: '{href}',
      redirect: 'verified',
      user: userInstance
    };

    // or user.verify
    userInstance.verify(options, function(err, response) {

			if (err) {
				Apprentice.deleteById(userInstance.id);
				return next(err);
			}

      console.log('> verification email sent:\n', response);

      // context.res.render('response', {
      //   title: 'Signed up successfully',
      //   content: 'Please check your email and click on the verification link ' -
      //       'before logging in.',
      //   redirectTo: '/',
      //   redirectToLinkText: 'Log in'
      // });
    });
  });

  Apprentice.on('resetPasswordRequest', function(info) {
    console.log('\n---------- apprentices.js --- resetpasword');

    let url = 'http://' + config.host + ':' + config.port + '/reset-password';
    let link = url + '?access_token=' + info.accessToken.id;
    const options = {
      url: url,
      link: link,
      user: info.email
    }

    let template = loopback.template(path.resolve(__dirname, '../../server/views/link-pass-reset.ejs'));
    let html = template(options);
    Apprentice.app.models.email.send({
      to: info.email,
      from: senderAddress,
      subject: 'Password reset',
      html: html
    }, function(err) {
      if (err) return console.log('> error sending password reset email', err);
      console.log('> sending password reset email to: ', info.email);
    });
  });
  Apprentice.sendEmail = function(cb) {
    Apprentice.app.models.Email.send({
      to: 'pamento@op.pl',
      from: 'you@gmail.com',
      subject: 'my subject',
      text: 'my text',
      html: 'my <em>html</em>'
    }, function(err, mail) {
      console.log('email sent!');
      cb(err);
    });
  }
};
