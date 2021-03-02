const errorCodes = require('../constant/errorCodes.enum');
const msg = require('../message/error.messages');

const userService = require('../service/user.service');

module.exports = {
    getAllUsers: async (req, res) => {
        try {
            const users = await userService.findAll();

            res.json(users);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getSingleUser: async (req, res) => {
        try {
            const { userId } = req.params;
            const userById = await userService.findUserById(userId);

            res.json(userById);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);

            res.status(errorCodes.CREATED).json(msg.CREATED.en);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteUserById: async (req, res) => {
        try {
            const { userId } = req.params;

            await userService.deleteUserById(userId);

            res.json(msg.DELETED.en);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
