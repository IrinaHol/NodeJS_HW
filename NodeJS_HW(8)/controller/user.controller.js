const { emailActionsEnum } = require('../constant');
const { passwordHash } = require('../helpers');
const { errorMessages } = require('../message');
const { emailService, fileService, userService } = require('../service');

module.exports = {
    getAllUsers: async (req, res, next) => {
        try {
            const users = await userService.findAll();

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    getSingleUser: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const userById = await userService.findUserById(userId);

            res.json(userById);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { params: { userId }, body: { email, password } } = req;

            const user = await userService.updateUser(userId, password);

            await emailService.sendMail(email, emailActionsEnum.PASSWORD_CHANGED);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { body: { password, email, name }, avatar } = req;
            const hasPassword = await passwordHash.hash(password);

            const user = await userService.createUser({ ...req.body, password: hasPassword });

            if (avatar) {
                const uploadPath = await fileService.dirBuilder(avatar, avatar.name, 'photos', 'user', user._id);

                await userService.updateUser(user._id, { avatar: uploadPath });
            }

            await emailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name });

            res.status(201).json(errorMessages.CREATED.customCode);
        } catch (e) {
            next(e);
        }
    },

    deleteUserById: async (req, res, next) => {
        try {
            const { params: { userId }, body: { email } } = req;

            await userService.deleteUserById(userId);

            await emailService.sendMail(email, emailActionsEnum.USER_DELETED);

            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            next(e);
        }
    }
};
