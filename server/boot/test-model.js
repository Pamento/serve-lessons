'use strict';
// module.exports = function(app) {
//   app.dataSources.frenchlessons.automigrate('apprentice', function(err) {
//     if (err) throw err;

//     app.models.apprentice.create([{
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
//     }], function(err, apprentices) {
//       if (err) throw err;

//       console.log('Models created by Pamento : \n', apprentices);
//     });
//   });
// };

// module.exports = function(app) {
//   const User = app.models.apprentice;

//   User.destroyAll({ email: { regexp: /\.com/} }, function(err, info) {
//     if(err) throw err;
//     console.log('destroy db.apprentice ', info);
//   })
// }
