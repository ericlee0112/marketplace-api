
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');


/*
function initialize(passport, getUserByEmail, getUserById) {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email)
    if (user == null) {
      return done(null, false, { message: 'No user with that email' })
    }

    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user)
      } else {
        return done(null, false, { message: 'Password incorrect' })
      }
    } catch (e) {
      return done(e)
    }
  }

  passport.use(new LocalStrategy({ usernameField: 'email' }, authenticateUser))
  passport.serializeUser((user, done) => done(null, user.id))
  passport.deserializeUser((id, done) => {
    return done(null, getUserById(id))
  })
}

module.exports = initialize
*/

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