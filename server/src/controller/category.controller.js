const categoryService = require('../service/category.service');

const categoryController = {
  getCategory: async (ctx) => {
    try {
      const categories = await categoryService.getCategory();

      ctx.body = categories;
    } catch (err) {
      ctx.throw(err.code, err);
    }
  },
};

module.exports = categoryController;
