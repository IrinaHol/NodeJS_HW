const router = require('express').Router();

const userController = require('../controller/user.controller');
const { fileMiddleware, userMiddleware } = require('../middleware');

router.get('/', userController.getAllUsers);
router.post('/',
    userMiddleware.isUserValid,
    userMiddleware.isUserPresent,
    fileMiddleware.checkFiles,
    fileMiddleware.checkCountAvatar,
    userController.createUser);

router.use('/', userMiddleware.checkIsUserIdValid);
router.get('/:userId', userController.getSingleUser);
router.delete('/:userId', userController.deleteUserById);
router.put('/:userId', userMiddleware.isUserUpdateValid, userController.updateUser);

module.exports = router;
