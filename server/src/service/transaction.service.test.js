require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` });
require('../startup/db')();

const TransactionService = require('./transaction.service');
const userSchemaModel = require('../model/user.model');
const transactionSchemaModel = require('../model/transaction.model');
const mongoose = require('mongoose');
const { ObjectId } = require('mongodb');

describe('TransactionService', () => {
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
    date: new Date(),
    __v: 0,
  };

  beforeEach(async () => {
    await mongoose.connection.dropDatabase();
    await userSchemaModel.create(user);
    await transactionSchemaModel.create(transaction);
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  describe('getUserTransactions', () => {
    const name = 'gibong';
    const userProvider = 'naver';
    const providerId = '12345';

    describe('with valid user', () => {
      it('returns transactions of given user data', async () => {
        const transactions = await TransactionService.getUserTransactions(
          name,
          userProvider,
          providerId
        );

        expect(transactions.length).toBe(1);
        expect(transactions[0].toJSON()).toEqual(transaction);
      });
    });

    describe('with invalid user', () => {
      const name = 'INVALID_USER';
      it('returns error', async () => {
        await expect(
          TransactionService.getUserTransactions(name, userProvider, providerId)
        ).rejects.toThrowError('BAD REQUEST');
      });
    });
  });
});
