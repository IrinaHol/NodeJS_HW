const fsExtra = require('fs-extra');
const errorMessage = require('../message/error.messages');
const errorCodes = require('../constant/errorCodes.enum');

const path = require('path');

const dirPath = path.join(process.cwd(), 'dataBase', 'users.json');

module.exports =  {
	checkIsUserIdValid:  (req, res, next) => {
		try {
			const userId = +req.params.userId;

			if (userId < 0 || !Number.isInteger(userId) || Number.isNaN(userId)) {
				throw new Error(errorMessage.NOT_VALID_ID['en']);
			}

			next();
		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	},

	isUserValid: async (req, res, next) => {
		try {
			const {nickname, password, email} = req.body;

			const test = await fsExtra.readJSON(dirPath);
			const findDataUser = test.find(value => value.email === email);

			if (findDataUser) {
			 throw new Error(errorMessage.USER_IS_PRESENT['en']);
			}

			if (password.length < 5 || Number.isInteger(password) || Number.isNaN(password)
				|| !nickname || !email || !email.includes('@') || !password) {
		 throw new Error(errorMessage.NOT_VALID_USER['en']);
			}

			next();
		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	},

	checkIsUserPresent: async (req, res, next) => {
		try {
			const {email} = req.body;

			const test = await fsExtra.readJSON(dirPath);
			const findOneUser = test.find(value =>  value.email === email);

			if (!findOneUser) {
				throw new Error(errorMessage.NOT_PRESENT_USER['en']);
			}

			next();
		} catch (e) {
			res.status(errorCodes.BAD_REQUEST).json(e.message);
		}
	}
}
