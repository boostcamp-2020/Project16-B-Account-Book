const supertest = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

const userSchemaModel = require('../model/user.model');
const transactionSchemaModel = require('../model/transaction.model');

describe('/transaction', () => {
  const date = new Date();
  const user = {
    _id: ObjectId('4edd40c86762e0fb12000003'),
    name: 'gibong',
    email: 'gibong@mail.com',
    provider: 'naver',
    providerId: '12345',
    startDayOfWeek: 'Sun',
    imageURL: 'http:url',
    paymentMethod: ['asd', 'bb'],
    tag: ['aqq', 'bbb'],
  };

  const transaction = {
    _id: ObjectId('5fc43d6909c5913a2e9fe736'),
    accountBookId: ObjectId('4edd40c86762e0fb12000003'),
    userId: ObjectId('4edd40c86762e0fb12000003'),
    category: 'food',
    paymentMethod: 'card',
    description: 'convenience store',
    cost: 12345,
    tag: [],
    imageURL: 'http://',
    date,
    __v: 0,
  };

  let server;
  let request;

  beforeAll(() => {
    server = app.listen();
    request = supertest(server);
  });

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
    await userSchemaModel.create(user);
    await transactionSchemaModel.create(transaction);
  });

  afterAll(async () => {
    await mongoose.connection.close();
    server.close();
  });

  describe('GET /', () => {
    describe('with matching user info', () => {
      it('returns transactions of user', async () => {
        const { body } = await request.get('/transaction');

        expect(body[0]._id.toString()).toBe(transaction._id.toString());
      });
    });

    describe('with invalid user info', () => {
      //TODO: 미들웨어 작성 후 에러 발생시 에러 처리 작성.
      // it('returns error', async () => {
      //   const { body } = await request.get('/transaction');
      //   expect(body).toBe('error');
      // });
    });
  });
});
