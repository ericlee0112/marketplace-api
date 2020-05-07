const pool = require('./pool');

pool.on('connect', () => {
  console.log('connected to postgres');
});

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});

require('make-runnable');
