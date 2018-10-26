const sequelize = require('sequelize');
const db = require('../models');

module.exports = (app) => {
  // Get all bills
  app.get('/api/budget', (req, res) => {
    db.Budget.findAll({}).then((dbBudget) => {
      res.json(dbBudget);
    });
  });

  // Create a new bill
  app.post('/api/budget', (req, res) => {
    db.Budget.create(req.body).then((dbBudget) => {
      res.json(dbBudget);
    });
  });

  // Delete a bill by id
  app.delete('/api/budget/:id', (req, res) => {
    db.Budget.destroy({ where: { id: req.params.id } }).then((dbBudget) => {
      res.json(dbBudget);
    });
  });

  // Update a bill by id
  app.put('/api/budget/', (req, res) => {
    const { id, description, value } = req.body;
    db.Budget.findById(id)
      .then(bill => bill.update({ description, value }))
      .then((updatedBill) => {
        res.json(updatedBill);
      });
  });

  // Sum of all expenses
  app.get('/api/total', (req, res) => {
    db.Budget.findAll({
      attributes: [[sequelize.fn('SUM', sequelize.col('value')), 'total']],
    }).then((dbBudget) => {
      console.log(dbBudget);
      res.json(dbBudget);
    });
  });
};
