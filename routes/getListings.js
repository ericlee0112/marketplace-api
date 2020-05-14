const passport = require('passport');
const User = require('../sequelize');

module.exports = app => {
  app.get('/listings', (req, res, next) => {
    passport.authenticate('jwt', { session: false },(err, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(401).send(info.message);
      } else {
        
      }
    })
  })
}