const db = require('../models');

module.exports = (app) => {
  // Load index page
  app.get('/', (req, res) => {
    db.Budget.findAll({}).then((dbExamples) => {
      res.render('index', {
        msg: 'App Name TBD!',
        examples: dbExamples,
      });
    });
  });

  // Load example page and pass in an example by id
  app.get('/example/:id', (req, res) => {
    db.Budget.findOne({ where: { id: req.params.id } }).then((dbExample) => {
      res.render('example', {
        example: dbExample,
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.render('404');
  });
};
