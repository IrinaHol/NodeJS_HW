const router = require('express').Router();

const { authController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.post('/', authMiddleware.isUserPresent, authController.login);

router.post('/refresh', authMiddleware.checkRefreshToken, authController.refreshToken);

router.post('/students');

module.exports = router;
