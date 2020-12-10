const Router = require('koa-router');
const githubOAuth = require('../../middleware/githubOAuth');
const naverOAuth = require('../../middleware/naverOAuth');
const router = new Router();
const userController = require('../controller/user.controller');

router.get('/', userController.test);
router.get('/info', userController.getUser);
router.post('/', userController.update);
router.post('/githublogin', githubOAuth, userController.login);
router.post('/naverlogin', naverOAuth, userController.login);

module.exports = router;
