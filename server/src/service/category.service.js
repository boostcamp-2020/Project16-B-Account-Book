const CategoryModel = require('../model/category.model');
const createError = require('../util/error');

const CategoryService = {
  getCategory: async () => {
    const result = await CategoryModel.find({});

    if (result && result.length) {
      return result;
    }

    const error = createError({
      status: 'SERVICE UNAVAILABLE',
      msg: '카테고리가 존재하지 않습니다.',
    });

    throw error;
  },
};

module.exports = CategoryService;
