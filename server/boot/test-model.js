'use strict';
/**
 * In this file wy have 3 functions:
 * 1(Learner.find) is the creation of admin in the database
 * 2(Learner.find) is the creation of users in the database
 * 3(User.destroy) is for delete from database the user during the test of registration
 */
module.exports = function (app) {
  var Learner = app.models.Learner;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;


  //   Learner.find({ name: 'Valérie' }, function (err, results) {
  //     if (err) { throw err }

  //     if (results.length < 1) {
  //       app.dataSources.frLesson.autoupdate('Learner', function (err) {
  //         if (err) throw err;

  //         app.models.Learner.create([
  //           {
  //             name:"Valérie",
  //             email: 'v.alpanes@gmail.com',
  //             username: 'Alpanes',
  //             password: 'alpa',
  //             created: new Date(),
  //             last_modification: new Date(),
  //             emailVerified: 1,
  //             isAdmin: true
  //           },
  //           {
  //             name:"Pawel",
  //             email: 'pohos.samut@gmail.com',
  //             username: 'Grzesik',
  //             password: 'grze',
  //             created: new Date(),
  //             last_modification: new Date(),
  //             emailVerified: 1,
  //             isAdmin: true
  //           }
  //           ], function (err, learners) {
  //             if (err) throw err;
  //             console.log('Models created by Pamento : \n', learners);
  //           });
  //       });
  //     }
  //   });
  // };

  // in case il you whant to populate the database use this snippet below
  Learner.find({ name: 'Piter' }, function (err, results) {
    if (err) { throw err }

    if (results.length < 1) {
      app.dataSources.frLesson.autoupdate('Learner', function (err) {
        if (err) throw err;

        app.models.Learner.create([
          {
            name: "Pawel",
            email: 'pohos.samut@gmail.com',
            username: 'Grzesik',
            password: 'grze',
            created: new Date(),
            last_modification: new Date(),
            emailVerified: 1,
            isAdmin: true
          },
          {
            name: "Piter",
            email: 'piter@piter.fr',
            username: 'Piter',
            password: '123',
            created: new Date(),
            last_modification: new Date(),
            emailVerified: 1
          }, {
            name: "Jhon",
            email: 'john@john.fr',
            username: 'Jhon',
            password: '123',
            created: new Date(),
            last_modification: new Date(),
            emailVerified: 1
          }, {
            name: "Jack",
            email: 'jack@jack.fr',
            username: 'Jack',
            password: '123',
            created: new Date(),
            last_modification: new Date(),
            emailVerified: 1
          }, {
            name: "Doe",
            email: 'doe@doe.com',
            username: 'Doe',
            password: '123',
            created: new Date(),
            last_modification: new Date(),
            emailVerified: 1
          }], function (err, learners) {
            if (err) throw err;
            console.log('Models created by Pamento : \n', learners);
          });
      });
    }
  });
};

// module.exports = function(app) {
//   const User = app.models.Learner;

//   User.destroyAll({email: {regexp: /\.com/}}, function(err, info) {
//     if (err) throw err;
//     console.log('destroy db.Learner ', info);
//   });
// };
