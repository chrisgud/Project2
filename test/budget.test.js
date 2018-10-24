const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

const { expect } = chai;

chai.use(chaiHttp);

let request;
describe('GET /api/examples', () => {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(() => {
    console.log(`env: ${process.env.NODE_ENV}`);
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should find all examples', (done) => {
    // Add some examples to the db to test with
    db.budget.bulkCreate([
      { text: 'First Budget', amount: 1000.00 },
      { text: 'Second Budget', amount: 252.34 },
    ]).then(() => {
      // Request the route that returns all examples
      request.get('/api/examples').end((err, res) => {
        const responseStatus = res.status;
        const responseBody = res.body;

        // Run assertions on the response

        expect(err).to.be.null;

        expect(responseStatus).to.equal(200);

        expect(responseBody)
          .to.be.an('array')
          .that.has.lengthOf(2);

        expect(responseBody[0])
          .to.be.an('object')
          .that.includes({ text: 'First Budget', amount: 1000.00 });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ text: 'Second Budget', amount: 252.34 });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
