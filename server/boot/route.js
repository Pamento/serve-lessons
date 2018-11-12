const path = require('path');
const loopback = require('loopback');

module.exports = function(app) {

  let mysqlDs = app.dataSources.frenchlesson;
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

  

  // after verification on email adress, this route generate verified.ejs page response in the client browser.
  app.get('/verified', function(req, res) {
    console.log('---------- route --- veified');
    res.render('verified');
  });

  //send an email with instructions to reset an existing user's password
  app.post('/api/apprentices/reset', function(req, res, next) {
    User.resetPassword({
      email: req.body.email
    }, function(err) {
      if (err) {
        return res.status(401).send(err);}
      res.render('response', {
        title: 'Password reset requested',
        content: 'Check your email for further instructions',
        redirectTo: '/reset-password',
        redirectToLinkText: 'Log in'
      });
    });
  });

  //send password reset form
  app.get('/reset-password', function(req, res, next) {
    if (!req.query.access_token) return res.sendStatus(401);

    res.render('form-pass-reset', {
      redirectUrl: '/api/apprentices/reset-password?access_token='+req.query.access_token,
      src: path.resolve(__dirname, '../../client/favicon.png')
    });
  });

  app.post('/email', function(req, res, next) {
    console.log('ok');
    console.log(req);
  });
}
