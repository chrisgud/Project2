module.exports = (sequelize, DataTypes) => {
  const budget = sequelize.define('budget', {

    //total monthly income
    monthly_income: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //i.e student loans
    loan: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    //housing cost
  rent: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  //electric, gas, water
  utilities: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  //gas, insurance, car note
  transportation: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  mobile: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  //includes groceries 
  food: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    
  },

});
// Syncs with DB
// budget.sync();
// Makes the budeget model available for other files (will also create a table)

  return budget;
};
