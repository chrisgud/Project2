module.exports = (sequelize, DataTypes) => {
  const budget = sequelize.define('budget', {
    // total monthly income
    monthly_income: {
      type: DataTypes.DECIMAL(13, 2),
      allowNull: false,
    },
    // i.e student loans
    loan: {
      type: DataTypes.DECIMAL(13, 2),
      defaultValue: 0,
    },
    // housing cost
    rent: {
      type: DataTypes.DECIMAL(13, 2),
      defaultValue: 0,
    },
    // electric, gas, water
    utilities: {
      type: DataTypes.DECIMAL(13, 2),
      defaultValue: 0,
    },
    // gas, insurance, car note
    transportation: {
      type: DataTypes.DECIMAL(13, 2),
      defaultValue: 0,
    },
    mobile: {
      type: DataTypes.DECIMAL(13, 2),
      defaultValue: 0,
    },
    // includes groceries
    food: {
      type: DataTypes.DECIMAL(13, 2),
      defaultValue: 0,
    },
  });
  // Syncs with DB
  // budget.sync();
  // Makes the budeget model available for other files (will also create a table)

  return budget;
};
