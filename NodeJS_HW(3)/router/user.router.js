const router = require('express').Router();

const userController = require('../controller/user.controller');
const userMiddleware = require('../middleware/user.middleware');

router.get('/', userController.getAllUsers);

router.get('/:userId', userMiddleware.checkIsUserIdValid, userController.getSingleUser);

router.post('/', userMiddleware.isUserValid, userController.registerUser);

router.post('/findUser', userMiddleware.checkIsUserPresent, userController.getByName);

router.delete('/:userId', userController.deleteUserById);

module.exports = router;
