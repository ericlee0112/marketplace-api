const passport = require('passport');
const User = require('../sequelize');

module.exports = app => {
  app.get('/findUser', (req, res, next) => {
    passport.authenticate('jwt', { session: false}, (err, user, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(401).send(info.message);
      } else if (user.username == req.query.username) {
        User.findOne({
          where: {
            username: req.query.username,
          },
        }).then((userInfo) => {
          if (userInfo != null) {
            console.log('user exists');
            res.status(200).send({
              auth: true,
              first_name: userInfo.first_name,
              last_name: userInfo.last_name,
              email: userInfo.email,
              username: userInfo.username,
              password: userInfo.password,
              message: 'user exists in database',
            });
          } else {
            console.error('user does not exist in database');
            res.status(401).send('user does not exist in database');
          }
        });
      } else {
        console.error('jwt id and username do not match');
        res.status(403).send('jwt token and username do not match');
      }
    })(req, res, next);
  });
};