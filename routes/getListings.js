const passport = require('passport');
const Listing = require('../sequelize');

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
        Listing.findAll().then((listings) => {
          if (listings != null) {
            console.log('retrieving listings');
            res.status(200).send({
              auth: true,
              listings: listings,
            });
          } else {
            console.error('no listings to be found');
            res.status(401).send('no listings to be found');
          }
        });
      }
    })(req, res, next);
  });
};