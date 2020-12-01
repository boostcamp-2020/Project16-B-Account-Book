const transactionService = require('../service/transaction.service');
const { ObjectId } = require('mongodb');

jest.mock('../service/transaction.service');

describe('transactionController', () => {
  const transactions = [
    {
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
    },
  ];

  describe('fetchTransaction', () => {
    describe('with valid and matching userInfo', () => {
      const name = 'gibong';
      const provider = 'naver';
      const providerId = '1234';

      beforeEach(() => {
        transactionService.getUserTransactions.mockResolvedValue(transactions);
      });

      it('returns transactions', async () => {
        const userTransactions = await transactionService.getUserTransactions(
          name,
          provider,
          providerId
        );
        expect(transactions).toEqual(userTransactions);
      });
    });
  });

  describe('with invalid or unmatching userInfo', () => {
    beforeEach(() => {
      transactionService.getUserTransactions.mockRejectedValue(
        new Error('Bad Request')
      );
    });

    it('returns error', async () => {
      expect(transactionService.getUserTransactions()).rejects.toThrowError(
        'Bad Request'
      );
    });
  });
});
