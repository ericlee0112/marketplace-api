const Pool = require('pg').Pool;

const pool = new Pool({
    user: 'ericlee',
    host: 'localhost',
    database: 'marketplacev1',
    password: '',
    port: 5432,
});

module.exports = pool;