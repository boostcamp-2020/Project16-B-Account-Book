const Router = require('koa-router');
const githubOAuth = require('../../middleware/githubOAuth');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/', userController.test);
router.post('/', userController.update);
router.post('/login', githubOAuth, userController.login);

module.exports = router;
