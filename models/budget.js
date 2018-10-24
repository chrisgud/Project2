module.exports = (sequelize, DataTypes) => {
  const budget = sequelize.define('budget', {
    text: DataTypes.STRING,
    amount: DataTypes.DECIMAL(13, 2),
  });
  return budget;
};
