process.env.PORT = 7000;
process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');

const { expect } = chai;
const server = require('../../../index');
const db = require('../../../db');
const firebaseAdmin = require('../../../config/firebase');

chai.use(chaiHttp);

describe('User v1 API', () => {
  beforeEach((done) => {
    db.migrate.latest()
      .then(() => {
        db.seed.run()
          .then(() => {
            done();
          });
      });
  });

  afterEach(() => db.migrate.rollback());

  describe('GET /:userId/getUser', () => {
    it('should return a 401 error without a token', () => {
      chai.request(server)
        .get('/api/v1/1/getUser')
        .end((err, res) => {
          expect(res).to.have.status(401);
          expect(res).to.have.property('body');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('No token, authorization denied.');
        });
    });

    it('should return a 400 error with incorrect token', () => {
      sinon.stub(firebaseAdmin, 'auth').get(() => () => ({
        verifyIdToken: sinon.fake.returns({ uid: '123' }),
      }));

      chai.request(server)
        .get('/api/v1/1/getUser')
        .set('Authorization', '234')
        .end((err, res) => {
          expect(res).to.have.status(400);
          expect(res).to.have.property('body');
          expect(res.body).to.have.property('message');
          expect(res.body.message).to.equal('You are not authorized for this request.');
        });
    });

    it('should return a 200 status with a user', () => {
      sinon.stub(firebaseAdmin, 'auth').get(() => () => ({
        verifyIdToken: sinon.fake.returns({ uid: '1' }),
      }));

      chai.request(server)
        .get('/api/v1/1/getUser')
        .set('Authorization', '1')
        .end((err, res) => {
          expect(res).to.have.status(200);
        });
    });
  });
});
