'use strict';
// module.exports = function(app) {
//   app.dataSources.frenchlessons.automigrate('learner', function(err) {
//     if (err) throw err;

//     app.models.learner.create([{
//       name: 'Piter',
//       email: 'piter@piter.fr',
//       password: '123'
//     }, {
//       name: 'John',
//       email: 'john@john.fr',
//       password: '123'
//     }, {
//       name: 'Jack',
//       email: 'jack@jack.fr',
//       password: '123'
//     }], function(err, learners) {
//       if (err) throw err;

//       console.log('Models created by Pamento : \n', learners);
//     });
//   });
// };

module.exports = function(app) {
  const User = app.models.learner;

  User.destroyAll({email: {regexp: /\.pl/}}, function(err, info) {
    if (err) throw err;
    console.log('destroy db.learner ', info);
  });
};
