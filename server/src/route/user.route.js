const Router = require('koa-router');
const router = new Router();

const userController = require('../controller/user.controller');
const githubOAuth = require('../../middleware/githubOAuth');
const naverOAuth = require('../../middleware/naverOAuth');
const kakaoOAuth = require('../../middleware/kakaoOAuth');
const cookieParser = require('../../middleware/cookieParser');
const tokenValidator = require('../../middleware/tokenValidator');

router.get('/', userController.test);
router.get('/info', tokenValidator, cookieParser, userController.getUser);
router.get(
  '/accountBook',
  tokenValidator,
  cookieParser,
  userController.getAccountBookUsers
);
router.get(
  '/inviteUser',
  tokenValidator,
  cookieParser,
  userController.getInviteUsers
);
router.post(
  '/members',
  tokenValidator,
  cookieParser,
  userController.updateMembers
);
router.post('/', userController.updateUser);
router.post('/githublogin', githubOAuth, userController.login);
router.post('/naverlogin', naverOAuth, userController.login);
router.post('/kakaologin', kakaoOAuth, userController.login);

module.exports = router;
