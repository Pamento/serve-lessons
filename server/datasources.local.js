'use strict';

module.exports = {
  db: {
    name: 'db',
    connector: 'memory',
  },
  frLesson: {
    host: 'localhost',
    port: 3306,
    database: 'frenchlessons',
    password: process.env.MYSQL_PWD,
    name: 'frLesson',
    debug: true,
    user: process.env.MYSQL_USER,
    connector: 'mysql',
  },
  Email: {
    name: 'Email',
    connector: 'mail',
    transports: [
      {
        type: 'SMTP',
        host: 'smtp.gmail.com',
        secure: true,
        port: 465,
        tls: {
          rejectUnouthorized: true,
        },
        auth: {
          user: process.env.FRLS_EMAIL,
          pass: process.env.FRLS_PWD,
        },
      },
    ],
  },
};
