const Pool = require('pg').Pool;
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');
const dbQuery = require('./db/dbQuery');

const { connect, sql } = require('@databases/pg');
const db = connect;

const {
  errorMessage, successMessage, status,
} = require('./helpers/status');


const LocalStrategy = require('passport-local').Strategy;

const pool = new Pool({
  user: 'ericlee',
  host: 'localhost',
  database: 'marketplacecv1',
  password: '',
  port: 5432,
});

const getListings = async (req, res) => {
  pool.query('SELECT * FROM listings ORDER BY created_at ASC', (err, results) => {
    if(err) {
      throw err;
    }
    res.status(200).json(results.rows);
  });
};

const registerUser = async (request, response) => {
  const { 
    first_name, last_name, email, password, username
  } = request.body;
  const hashed_pwd = await bcrypt.hash(password, 10);
  const registerUserQuery = 'INSERT INTO users (id, first_name, last_name, email, password, username, account_balance) VALUES ($1, $2, $3, $4, $5, $6, $7) returning *';
  
  const values = [
    uuidv4(), 
    first_name, 
    last_name, 
    email, 
    hashed_pwd, 
    username, 
    0,
  ];

  try {
    const { rows } = await dbQuery(registerUserQuery, values);
    const dbResponse = rows[0];
    successMessage.data = dbResponse;
    return response.status(200).send({
      status: 'success',
      data: successMessage,
    });
  } catch (error) {
    return response.status(500).send({
      status: 'error',
      data: error,
    });
  }
};

async function initialize(passport) {
  const authenticateUser = async (email, password, done) => {
    let user;
    await pool.query('SELECT * FROM users WHERE email=$1', [email], (err, results) => {
      if(err) {
        throw err;
      }
      user = results.rows[0];
      if(user == null) {
        return done(null, false, { message: 'No user with that email' });
      }
      try {
        if (bcrypt.compare(password, user.password)) {
          return done(null, user);
        } else {
          return done(null, false, { message: 'Password incorrect' });
        }
      } catch (e) {
        return done(e);
      }
    });
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user.id));
  passport.deserializeUser((id, done) => {
    pool.query('SELECT * FROM users WHERE id=$1', [id], (err, results) => {
      if(err) {
        throw err;
      }
      const user = results.rows[0];
      if(user == null) {
        return done(null, false, { message: 'No user with that email' });
      }
      return done(null, user);
      // res.status(200).json(results.rows[0]);
    });
  });
}


module.exports = {
  getListings: getListings,
  registerUser: registerUser,
  initialize: initialize
}