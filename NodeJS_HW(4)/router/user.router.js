// eslint-disable-next-line import/no-unresolved
const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsUserIdValid, userController.getSingleUser);

router.post('/', userMiddleware.isUserValid, userController.createUser);

router.delete('/:userId', userMiddleware.checkIsUserIdValid, userController.deleteUserById);

module.exports = router;
