const db = require('../models');

module.exports = (app) => {
  // Need to think about new functions
  // Get all examples
  app.get('/api/budget', (req, res) => {
    db.Budget.findAll({}).then((dbBudget) => {
      res.json(dbBudget);
    });
  });

  // Create a new example
  app.post('/api/budget', (req, res) => {
    db.Budget.create(req.body).then((dbBudget) => {
      res.json(dbBudget);
    });
  });

  // Delete an example by id
  app.delete('/api/budget/:id', (req, res) => {
    db.Budget.destroy({ where: { id: req.params.id } }).then((dbBudget) => {
      res.json(dbBudget);
    });
  });
};
