const { emailActionsEnum } = require('../constant');
const { passwordHash } = require('../helpers');
const { errorMessages } = require('../message');
const {
    authService, emailService, fileService, userService
} = require('../service');
const { transactionInstance } = require('../dataBase').getInstance();

module.exports = {
    getALl: async (req, res, next) => {
        try {
            const users = await userService.findAll(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },

    createNewUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { body: { password, email, name }, avatar } = req;
            const hasPassword = await passwordHash.hash(password);

            const user = await userService.createUser({ ...req.body, password: hasPassword }, transaction);

            if (avatar) {
                const uploadPath = await fileService.dirBuilder(avatar, avatar.name, 'photos', 'user', user.id);

                await userService.updateOneUser(user.id, { avatar: uploadPath }, transaction);
            }

            await emailService.sendMail(email, emailActionsEnum.WELCOME, { userName: name }, transaction);

            await transaction.commit();
            res.status(201).json(errorMessages.CREATED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    findOneUser: async (req, res, next) => {
        try {
            const { id } = req.params;
            const user = await userService.findUserById(id);

            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    updateOneUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { body, params: { id } } = req;
            await userService.updateOneUser(id, body, transaction);

            await transaction.commit();
            res.json(body);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteOneUser: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { params: { id } } = req;

            await userService.deleteOneUser(id, transaction);

            await authService.deleteToken(id);

            await transaction.commit();
            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
