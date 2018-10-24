module.exports = (sequelize, DataTypes) => {
  const Budget = sequelize.define('Budget', {
    userId: DataTypes.STRING,
    description: DataTypes.TEXT,
    value: DataTypes.DECIMAL(13, 2),
    occurance: DataTypes.DATE,
    recurrance: DataTypes.DATE,
    deleted: DataTypes.BOOLEAN,
  });
  return Budget;
};
