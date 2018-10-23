module.exports = (sequelize, DataTypes) => {
  const budget = sequelize.define('budget', {

    //total monthly income
    monthly_icome: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    //i.e student loans
    loan: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
    //housing cost
  rent: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  //electric, gas, water
  utilities: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  //gas, insurance, car note
  transportation: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  mobile: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  //includes groceries 
  food: {
    type: DataTypes.INTEGER,
    allowNull: false,
    
  },

});

  return budget;
};
