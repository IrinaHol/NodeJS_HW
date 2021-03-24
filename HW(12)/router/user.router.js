const router = require('express').Router();

const userController = require('../controller/user.controller');
const {
    fileMiddleware, userMiddleware, authMiddleware, checkAdminMiddleware
} = require('../middleware');

router.get('/', userController.getALl);
router.post('/',
    userMiddleware.isUserValid,
    authMiddleware.checkAccessToken,
    // userMiddleware.isUserPresent,
    checkAdminMiddleware.isAccessDenied(['user']),
    fileMiddleware.checkFiles,
    fileMiddleware.checkCountAvatar,
    userController.createNewUser);

router.use('/:id', userMiddleware.checkIsUserIdValid);
router.get('/:id', userController.findOneUser);
router.delete('/:id', userController.deleteOneUser);
router.put('/:id', userMiddleware.isUserUpdateValid, userController.updateOneUser);

module.exports = router;
