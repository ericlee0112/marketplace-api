module.exports = (sequelize, type)  => sequelize.define('user', {
  id: {
    type: type.UUID,
    primaryKey: true,
  },
  first_name: type.STRING,
  last_name: type.STRING,
  email: {
    type: type.STRING,
  },
  username: {
    type: type.TEXT,
    allowNull: false,
  },
  password: {
    type: type.TEXT,
    allowNull: false,
  },
  account_balance: type.INTEGER,
  createdAt: type.DATE,
  updatedAt: type.DATE,
});
