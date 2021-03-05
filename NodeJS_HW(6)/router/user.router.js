const router = require('express').Router();

const userController = require('../controller/user.controller');
const { authMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsUserIdValid, userController.getSingleUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsUserIdValid, authMiddleware.checkAccessToken, userController.deleteUserById);

module.exports = router;
