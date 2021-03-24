const { errorCodesEnum } = require('../constant');
const ErrorHandler = require('../message/ErrorHandler');
const { NOT_VALID_USER, RECORD_NOT_FOUND } = require('../message/error.messages');
const { findUserById } = require('../service/user.service');
const { userValidator } = require('../validators');

module.exports = {
    checkIsUserIdValid: (req, res, next) => {
        try {
            const { userId } = req.params;
            const { error } = userValidator.idUserValidator.validate(userId);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_USER.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserValid: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_USER.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: async (req, res, next) => {
        try {
            const userByEmail = await findUserById({ id: req.params.id });
            if (userByEmail) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, RECORD_NOT_FOUND.customCode);
            }
            console.log(userByEmail);
            req.users = userByEmail;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUpdateValid: (req, res, next) => {
        try {
            const { error } = userValidator.updateUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_USER.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
