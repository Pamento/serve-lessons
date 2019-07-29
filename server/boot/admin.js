module.exports = function(app) {
  var Learner = app.models.Learner;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;

  Role.find({ name: 'admin' }, function(err, results) {
    if (err) { throw err }

    if (results.length < 1) {
        // now we know the DB doesn't have it already, so do the Role creation...
      Learner.create([
        {
          name:"Valérie",
          email: 'v.alpanes@gmail.com',
          username: 'Valérie',
          password: 'alpa',
          created: new Date(),
          last_modification: new Date(),
          emailVerified: 1,
          isAdmin: true
        }
      ], function(err, users) {
        if (err) throw err;

        //create the admin role
        Role.create({
          name: 'admin'
        }, function(err, role) {
          if (err) throw err;

          console.log('Created role:', role);

          //make Valérie an admin
          role.principals.create({
            principalType: RoleMapping.USER,
            principalId: users[0].id
          }, function(err, principal) {
            if (err) throw err;

            console.log('Created principal:', principal);
          });
        });
      });
    }
  });
};