'use strict';

const path = require('path');
const loopback = require('loopback');
const nodeMailer = require('nodemailer');

module.exports = function(app) {
  let mysqlDs = app.dataSources.frLesson;
  let exercise = app.models.exercise;
  let Apprentice = app.models.apprentice;

  // first autoupdate the `Apprentice` model to avoid foreign key constraint failure
  mysqlDs.autoupdate('apprentice', function(err) {
    if (err) throw err;
    console.log('\nAutoupdated table `Apprentice`.');

    mysqlDs.autoupdate('exercise', function(err) {
      if (err) throw err;
      console.log('Autoupdated table `exercise`.');
      // at this point the database table `exercise` should have one foreign key `ApprenticeId` integrated
    });
  });
  // at localhost:3000 is give the client the status of server
  var router = app.loopback.Router();
  router.get('/', app.loopback.status());
  app.use(router);

  // check the sender
  app.get('/first', function(req, res) {
    console.log('route of root');
    res.render('first.html');
  });

  // after verification on email adress, this route generate verified.ejs page response in the client browser.
  app.get('/verified', function(req, res) {
    console.log('---------- route --- veified');
    res.render('verified');
  });

  // send an email with instructions to reset an existing user's password
  app.post('/api/apprentices/reset', function(req, res, next) {
    const User = app.models.apprentice;
    User.resetPassword({
      email: req.body.email,
    }, function(err) {
      if (err) {
        return res.status(401).send(err);
      }
      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/reset-password',
        redirectToLinkText: 'Log in',
      });
    });
  });

  // send password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.query.access_token) return res.sendStatus(401);

    res.render('form-pass-reset', {
      redirectUrl: '/api/apprentices/reset-password?access_token=' +
      req.query.access_token,
      src: path.resolve(__dirname, '../../client/favicon.png'),
    });
  });

  app.post('/email', function(req, res, next) {
    console.log('ok');
    console.log(req);

    let emOpt = {
      from: 'Bot no-replay@nodemail.com',
      to: 'pohos.samut@gmail.com',
      subject: 'Test of sending email',
      text: 'Plain text',
      html: '<p>Hello World!</p>',
    };
    let transp = nodeMailer.createTransport({
      host: 'localhost',
      port: 465,
    });
    transp.sendMail(emOpt, (error, info) => {
      if (error) {
        console.log('Error form NodeMailer ', error);
      } else {
        console.log('Message %s sent: %s', info.messageId, info.response);
      }
    });
  });

  app.post('/send-email', function(req, res) {
    let transporter = nodeMailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'xxx@xx.com',
        pass: 'xxxx',
      },
    });
    transporter.verify(function(error, success) {
      if (error) {
        console.log('Server Error for email Nodemailer :\n', error);
      } else {
        console.log('Server is ready to take our messages');
      }
    });
    let mailOptions = {
      from: '"Krunal Lathiya" <xx@gmail.com>', // sender address
      to: req.body.to, // list of receivers
      subject: req.body.subject, // Subject line
      text: req.body.body, // plain text body
      html: '<b>NodeJS Email Tutorial</b>', // html body
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        return console.log(error);
      }
      console.log('Message %s sent: %s', info.messageId, info.response);
      res.render('index');
    });
  });
  app.get('/Senders/mail', function(req, res) {
    console.log('mail\n', req);
  });
};
