'use strict';

var server = require('./server');
var ds = server.dataSources.frLesson;
var lbTables = ['Learner', 'Post', 'Test', 'Comment', 'AccessToken', 'ACL', 'RoleMapping', 'Role', 'Sender'];
console.log('creating data source from mysql');
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log(
    'Loopback tables [' + lbTables + '] created in ', ds.adapter.name
  );
  ds.disconnect();
});
