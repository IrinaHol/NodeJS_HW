const userService = require('../service/user.service');
const errorCodes = require('../constant/errorCodes.enum');
const msg = require('../message/error.messages')

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
			const {userId} = req.params;

			const userById = await userService.findUserById(userId);
			res.json(userById);

		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	},

	registerUser: async (req, res) => {
		try {
			const user = req.body;
			await userService.register(user);

			res.status(errorCodes.CREATED).json(msg.CREATED['en']);
		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	},

	getByName: async (req, res) => {
		try {
			const {email} = req.body;

			const user = await userService.findUserByEmail(email);
			res.json(user);

		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	},

	deleteUserById: async (req, res) => {
		try {

			const {userId} = req.params;
			userService.deleteUserById(userId);
			res.json(msg.DELETED['en']);

		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	}
}
