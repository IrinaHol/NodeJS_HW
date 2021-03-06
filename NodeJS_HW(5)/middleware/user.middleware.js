const { errorMessages } = require('../message');
const { errorCodesEnum } = require('../constant');
const { findUserById } = require('../service/user.service');
const { userValidator } = require('../validators');
const User = require('../dataBase/models/User.model');

module.exports = {
    checkIsUserIdValid: async (req, res, next) => {
        try {
            const { error } = userValidator.idUserValidator.validate(req.params.id);

            if (error) {
                throw new Error(error.details[0].message);
            }
            const { userId } = req.params;
            const findUser = await findUserById(userId);

            if (!findUser) {
                throw new Error(errorMessages.NOT_PRESENT_USER.en);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new Error(errorCodesEnum.USER_IS_PRESENT.en);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
