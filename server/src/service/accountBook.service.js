const AccountBookModel = require('../model/accountBook.model');
const newError = require('../util/error');

const AccountBookService = {
  getAllAccountBooks: async (userId) => {
    const result = await AccountBookModel.find({
      authorizedUsers: userId,
    });

    return result;
  },
  getAccountBook: async (userId, accountBookId) => {
    const result = await AccountBookModel.findById(accountBookId);

    if (result?.authorizedUsers.includes(userId)) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '유효하지 않은 가계부입니다.',
    });
  },
  createAccountBook: async (userId, title) => {
    const newAccountBook = new AccountBookModel({
      title,
      authorizedUsers: [userId],
    });
    await newAccountBook.save();

    return newAccountBook;
  },
  deleteAccountBook: async (userId, accountBookId) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId },
      { $pull: { authorizedUsers: userId } }
    );

    if (result.nModified === 1) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'AccountBook 탈퇴 실패',
    });
  },
  updateAccountBookTitle: async (userId, accountBookId, newTitle) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId, authorizedUsers: userId },
      { $set: { title: newTitle } }
    );

    if (result.nModified === 1) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'Title 수정 실패',
    });
  },
  addAccountBookUsers: async (userId, accountBookId, newUsers) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId, authorizedUsers: userId },
      { $addToSet: { authorizedUsers: newUsers } }
    );

    if (result.nModified === 1) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'Users 추가 실패',
    });
  },
  addAccountBookTag: async (userId, accountBookId, newTag) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId, authorizedUsers: userId },
      { $addToSet: { tags: newTag } }
    );

    if (result.nModified === 1) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'TAG 추가 실패',
    });
  },
  updateAccountBookTag: async (userId, accountBookId, originalTag, newTag) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId, authorizedUsers: userId, tags: originalTag },
      { $set: { 'tags.$': newTag } }
    );

    if (result.nModified === 1) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'TAG 수정 실패',
    });
  },
  deleteAccountBookTag: async (userId, accountBookId, tag) => {
    const result = await AccountBookModel.updateOne(
      { _id: accountBookId, authorizedUsers: userId },
      { $pull: { tags: tag } }
    );

    if (result.nModified === 1) {
      return result;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'TAG 삭제 실패',
    });
  },
};

module.exports = AccountBookService;
