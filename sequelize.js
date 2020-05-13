const Sequelize = require('sequelize');
const UserModel = require('./models/user');

const sequelize = new Sequelize('marketplacev2', 'ericlee', '', {
  host: 'localhost',
  dialect: 'postgres',
});

const User = UserModel(sequelize, Sequelize);

sequelize.sync().then(() => {
  // eslint-disable-next-line no-console
  console.log('Users db and user table have been created');
});

module.exports = User;
