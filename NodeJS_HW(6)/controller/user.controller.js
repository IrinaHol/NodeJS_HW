const { errorCodesEnum } = require('../constant');
const { errorMessages } = require('../message');
const { userService } = require('../service');
const { passwordHash } = require('../helpers');
const { authService } = require('../service');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAll();

            res.json(users);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const userById = await userService.findUserById(userId);

            res.json(userById);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            const { password } = req.body;
            const hasPassword = await passwordHash.hash(password);

            await userService.createUser({ ...req.body, password: hasPassword });

            res.status(errorCodesEnum.CREATED).json(errorMessages.CREATED.en);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    getByName: async (req, res) => {
        try {
            const { email } = req.body;
            const user = await userService.findUserByEmail(email);

            res.json(user);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            await authService.deleteToken(userId);

            res.json(errorMessages.DELETED.en);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
