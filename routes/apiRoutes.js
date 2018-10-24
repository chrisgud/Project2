const db = require('../models');

module.exports = (app) => {
  // Need to think about new functions
  // Get all examples
  app.get('/api/budget', (req, res) => {
    db.Budget.findAll({}).then((dbExamples) => {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post('/api/budget', (req, res) => {
    db.Budget.create(req.body).then((dbExample) => {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete('/api/budget/:id', (req, res) => {
    db.Budget.destroy({ where: { id: req.params.id } }).then((dbExample) => {
      res.json(dbExample);
    });
  });
};
