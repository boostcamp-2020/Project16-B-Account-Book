const Router = require('koa-router');
const router = new Router();

const categoryController = require('../controller/category.controller');

router.get('/', categoryController.getCategory);

module.exports = router;
