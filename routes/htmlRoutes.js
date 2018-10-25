const db = require('../models');

module.exports = (app) => {
  // Load index page (not currently using the dbBudget or message objects in handlebars?)
  app.get('/', (req, res) => {
    // db.Budget.findAll({}).then((dbBudget) => {
    res.render('index', {
      // msg: 'App Name TBD!',
      // bills: dbBudget,
    });
  });
  // });

  // Load example page and pass in an example by id
  app.get('/budget/:id', (req, res) => {
    db.Budget.findOne({ where: { id: req.params.id } }).then((dbBudget) => {
      res.render('bill', {
        bill: dbBudget,
      });
    });
  });

  // Render 404 page for any unmatched routes
  app.get('*', (req, res) => {
    res.render('404');
  });
};
