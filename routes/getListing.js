const passport = require('passport');
const Listing = require('../sequelize');

module.exports = app => {
  app.get('/listing', (req, res, next) => {
    passport.authenticate('jwt', { session: false },(err, info) => {
      if (err) {
        console.error(`error ${err}`);
      }
      if (info !== undefined) {
        console.error(info.message);
        res.status(401).send(info.message);
      } else {
        Listing.findOne({
          where: {
            id: req.body.id,
          },
        }).then((listing) => {
          if (listing != null) {
            console.log('retrieving listing');
            res.status(200).send({
              auth: true,
              listing: listing,
            });
          } else {
            console.error('listing not found');
            res.status(401).send('listing not found');
          }
        });
      }
    })(req, res, next);
  });
};