const Pool = require('pg').Pool;

const pool = new Pool({
  user: 'ericlee',
  host: 'localhost',
  database: 'marketplace',
  password: '',
  port: 5432,
});

const getListings = (request, response) => {
  pool.query('SELECT * FROM listings ORDER BY created_at ASC', (err, res) => {
    if(err) {
      throw err;
    }
    response.status(200).json(results.rows)
  });
};