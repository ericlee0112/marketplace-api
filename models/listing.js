module.exports = (sequelize, type)  => sequelize.define('listing', {
    id: {
      type: type.UUID,
      primaryKey: true,
    },
    title: {
      type: type.STRING,
      allowNull: false,
    },
    description: {
      type: type.TEXT,
      allowNull: false,
    },
    password: {
      type: type.TEXT,
      allowNull: false,
    },
    createdAt: type.DATE,
    updatedAt: type.DATE,
  });
  