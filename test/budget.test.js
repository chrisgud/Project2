const { expect } = require('chai');
const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server');
const db = require('../models');

// Setting up the chai http plugin
chai.use(chaiHttp);

let request;

describe('API', () => {
  // Before each test begins, create a new request server for testing
  // & delete all examples from the db
  beforeEach(() => {
    request = chai.request(server);
    return db.sequelize.sync({ force: true });
  });
  describe('GET /api/budget', () => {
    it('should find all examples', async () => {
      // Add some examples to the db to test with
      await db.Budget.bulkCreate([
        { value: 10.05, description: 'First Description' },
        { value: 1.02, description: 'Second Description' },
      ]);
      // Request the route that returns all examples
      const res = await request.get('/api/budget');
      // const res2 = await request.get('/api/budget');
      // console.log(res2);
      const responseStatus = res.status;
      const responseBody = res.body;

      // Run assertions on the response

      // expect(err).to.be.null;

      expect(responseStatus).to.equal(200);

      expect(responseBody)
        .to.be.an('array')
        .that.has.lengthOf(2);

      expect(responseBody[0])
        .to.be.an('object')
        .that.includes({ value: '10.05', description: 'First Description' });

      expect(responseBody[1])
        .to.be.an('object')
        .that.includes({ value: '1.02', description: 'Second Description' });
    });
  });
  describe('POST /api/budget', () => {
    // Before each test, create a new request server
    it('should receive itself as a response, and be entered into the DB', async () => {
      const postObj = {
        description: 'New Description',
        value: 10.05,
      };
      const res = await request.post('/api/budget').send(postObj);
      const responseStatus = res.status;
      const responseBody = res.body;

      expect(responseStatus).to.equal(200);

      expect(responseBody)
        .to.be.an('object')
        .that.includes({ value: 10.05, description: 'New Description' });
      const newRes = await db.Budget.findAll({});

      expect(newRes)
        .to.be.an('array')
        .that.has.lengthOf(1);

      expect(newRes[0].dataValues)
        .to.be.an('object')
        .that.includes({ value: '10.05', description: 'New Description' });
    });
  });
  describe('PUT /api/budget', () => {
    it('should update an existing record with new parameters', async () => {
      await db.Budget.bulkCreate([
        { value: 10.05, description: 'First Description' },
        { value: 1.02, description: 'Second Description' },
      ]);

      const putObj = {
        id: '1',
        description: 'Updated Description',
        value: '4.04',
      };
      const res = await request.put('/api/budget').send(putObj);

      expect(res).to.have.status(200);
      const responseBody = res.body;

      expect(responseBody)
        .to.be.an('object')
        .that.includes({ value: '4.04', description: 'Updated Description' });

      const getRes = await db.Budget.findAll({});

      expect(getRes)
        .to.be.an('array')
        .that.has.lengthOf(2);

      expect(getRes[0].dataValues)
        .to.be.an('object')
        .that.includes({ value: '4.04', description: 'Updated Description' });

      expect(getRes[1].dataValues)
        .to.be.an('object')
        .that.includes({ value: '1.02', description: 'Second Description' });
    });
  });
});
