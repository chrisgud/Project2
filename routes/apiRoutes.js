const db = require('../models');

module.exports = (app) => {
  // Need to think about new functions
  // Get all examples
  app.get('/api/examples', (req, res) => {
    db.Budget.findAll({}).then((dbExamples) => {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post('/api/examples', (req, res) => {
    db.Budget.create(req.body).then((dbExample) => {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete('/api/examples/:id', (req, res) => {
    db.Budget.destroy({ where: { id: req.params.id } }).then((dbExample) => {
      res.json(dbExample);
    });
  });
};
