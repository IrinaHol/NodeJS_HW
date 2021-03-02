const errorMessage = require('../message/error.messages');
const errorCodes = require('../constant/errorCodes.enum');
const { findUserById } = require('../service/user.service');

module.exports = {
    checkIsUserIdValid: async (req, res, next) => {
        try {
            const { userId } = req.params;
            const findUser = await findUserById(userId);

            if (userId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID.en);
            }

            if (!findUser) {
                throw new Error(errorMessage.NOT_PRESENT_USER.en);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const {
                email, name, password, age
            } = req.body;

            if (!email.includes('@')) throw new Error(errorMessage.NOT_VALID_EMAIL.en);

            if (name.length > 10 || name.length < 2) throw new Error(errorMessage.NOT_VALID_NAME.en);

            if (password.length > 10 || password.length < 5) throw new Error(errorMessage.NOT_VALID_PASSWORD.en);

            if (age > 100 || age < 12 || !Number.isInteger(age)) throw new Error(errorMessage.NOT_VALID_AGE.en);

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isUserPresent: (req, res, next) => {
        try {
            const { email } = req.body;

            if (!email) throw new Error(errorMessage.NOT_PRESENT_USER.en);

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }

};
