const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const newError = require('../util/error');
const JWTTokenUtil = require('../util/jwtToken.util');

const UserModel = require('../model/user.model');
const AccountBookModel = require('../model/accountBook.model');

const UserService = {
  test: async (data) => {
    const testResult = await UserModel.find();

    if (testResult) {
      return `test result ${testResult}`;
    }

    throw new Error('BAD REQUEST');
  },
  login: async ({ name, email, provider, providerId, imageURL }) => {
    let userId;
    const user = await UserModel.findOne({ name, provider, providerId });

    if (user && (user.imageURL !== imageURL || user.name !== name)) {
      user.imageURL = imageURL;
      user.name = name;
      await user.save();
    }

    if (!user) {
      const newUser = new UserModel({
        name,
        email,
        provider,
        providerId,
        imageURL,
      });
      await newUser.save();
      userId = newUser._id;
    }

    return JWTTokenUtil.createToken(userId || user._id);
  },

  getUser: async (token) => {
    const tokenInfo = JWTTokenUtil.verifyToken(token);
    const userInfo = await UserModel.findOne({ _id: tokenInfo.data });

    if (userInfo) {
      return userInfo;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 token을 다시 확인해주세요.',
    });
  },

  getAccountBookUsers: async (accountBookId) => {
    const { authorizedUsers } = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    let usersList = [];

    for (let userId of authorizedUsers) {
      usersList.push(await UserModel.findOne({ _id: ObjectId(userId) }));
    }

    if (usersList) {
      return usersList;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 token을 다시 확인해주세요.',
    });
  },

  updateUser: async (userInfo) => {
    const updateUser = await UserModel.updateOne(
      { _id: userInfo._id },
      { $set: userInfo }
    );

    if (updateUser) {
      return updateUser;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 token을 다시 확인해주세요.',
    });
  },

  getInviteUsers: async (accountBookId) => {
    const allUsers = await UserModel.find();
    const { authorizedUsers } = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    const InviteUsersList = allUsers.filter(
      (user) => !authorizedUsers.includes(user._id)
    );

    if (InviteUsersList) {
      return InviteUsersList;
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: '요청하신 token을 다시 확인해주세요.',
    });
  },

  updateMembers: async (accountBookId, newMembers, deleteMembers) => {
    const { authorizedUsers } = await AccountBookModel.findOne({
      _id: accountBookId,
    });

    let newUsers = authorizedUsers;

    deleteMembers.forEach((id) => {
      newUsers.remove(id);
    });

    if (newMembers.length !== 0) {
      newUsers = [...newUsers, ...newMembers];
    }

    const result = await AccountBookModel.updateOne(
      { _id: accountBookId },
      { $set: { authorizedUsers: newUsers } }
    );

    if (result.ok === 1) {
      return 'success';
    }

    throw newError({
      status: 'BAD REQUEST',
      msg: 'Member 수정에 실패했습니다.',
    });
  },
};

module.exports = UserService;
