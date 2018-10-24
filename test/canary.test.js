const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

describe('canary test', () => {
  // A "canary" test is one we set up to always pass
  // This can help us ensure our testing suite is set up correctly before writing real tests
  it('should pass this canary test', () => {
    expect(true).to.be.true;
  });
});

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe('GET /api/examples', () => {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(() => {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });

  it('should find all examples', (done) => {
    // Add some examples to the db to test with
    db.Example.bulkCreate([
      { text: 'First Example', description: 'First Description' },
      { text: 'Second Example', description: 'Second Description' },
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
          .that.includes({ text: 'First Example', description: 'First Description' });

        expect(responseBody[1])
          .to.be.an('object')
          .that.includes({ text: 'Second Example', description: 'Second Description' });

        // The `done` function is used to end any asynchronous tests
        done();
      });
    });
  });
});
