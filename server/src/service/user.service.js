const UserModel = require('../model/user.model');

const UserService = {
  test: async (data) => {
    const testResult = await UserModel.find();
    
    if (testResult) {
      return `test result ${testResult}`;
    }

    throw new Error('BAD REQUEST');
  },
};

module.exports = UserService;
