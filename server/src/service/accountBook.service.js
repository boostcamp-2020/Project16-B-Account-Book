const AccountBookModel = require('../model/accountBook.model');
const createError = require('../util/error');

const AccountBookService = {
  getAllAccountBooks: async (userId) => {
    const result = await AccountBookModel.find({
      authorizedUsers: userId,
      deleted: false,
    });
    return result;
  },
  getAccountBook: async (userId, accountBookId) => {
    const result = await AccountBookModel.findById(accountBookId);

    if (!result.deleted && result.authorizedUsers.includes(userId)) {
      return result;
    }

    const error = createError({
      status: 'BAD REQUEST',
      msg: '유효하지 않은 가계부입니다.',
    });

    throw error;
  },
  createAccountBook: async (userId, title) => {
    const sameTitle = await AccountBookModel.findOne({
      title,
      authorizedUsers: userId,
    });
    if (sameTitle) {
      const error = createError({
        status: 'BAD REQUEST',
        msg: '이미 존재하는 가계부명입니다.',
      });

      throw error;
    }

    const newAccountBook = new AccountBookModel({
      title,
      authorizedUsers: [userId],
    });
    await newAccountBook.save();

    return newAccountBook;
  },
  deleteAccountBook: async (userId, accountBookId) => {
    const accountBook = await AccountBookService.getAccountBook(
      userId,
      accountBookId
    );
    await accountBook.updateOne({ deleted: true });

    return accountBook; // TODO: 삭제하기 위해 찾은 doc을 client에 보내줄지 고민
  },
  updateAccountBook: async (userId, accountBookId, newTitle, newUsers) => {
    const accountBook = await AccountBookService.getAccountBook(
      userId,
      accountBookId
    );

    const title = newTitle || accountBook.title;
    const authorizedUsers = accountBook.authorizedUsers.concat(newUsers);
    await accountBook.updateOne({ title, authorizedUsers });

    const updatedAccountBook = await AccountBookService.getAccountBook(
      userId,
      accountBookId
    );

    return updatedAccountBook; // TODO: update 후에 다시 getAccountBook 해서 client에 return ?
  },
};

module.exports = AccountBookService;
