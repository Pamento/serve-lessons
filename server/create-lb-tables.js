'use strict';

var server = require('./server');
var ds = server.dataSources.frLesson;
var lbTables = ['learner', 'Post', 'Test', 'Comment'];
console.log('creating data source from mysql');
ds.automigrate(lbTables, function(er) {
  if (er) throw er;
  console.log(
    'Loopback tables [' + lbTables + '] created in ', ds.adapter.name
  );
  ds.disconnect();
});
