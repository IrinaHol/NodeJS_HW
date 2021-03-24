const jwt = require('jsonwebtoken');

const { AUTHORIZATION } = require('../constant/constants');
const { errorCodesEnum } = require('../constant');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../configs/config');

const { passwordHash } = require('../helpers');
const ErrorHandler = require('../message/ErrorHandler');
const { authService, userService } = require('../service');

const { TOKEN_IS_REQUIRED, WRONG_TOKEN, RECORD_NOT_FOUND } = require('../message/error.messages');

module.exports = {

    isUserPresent: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await userService.findOneUser(email);

            if (!user) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, RECORD_NOT_FOUND.customCode);
            }

            await passwordHash.compare(password, user.password);

            req.users = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, TOKEN_IS_REQUIRED.customCode);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.UNAUTHORIZED, WRONG_TOKEN.customCode);
                }
            });

            const tokens = await authService.findOneToken({ access_token });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.customCode);
            }
            const user = await userService.findUserByPk(tokens.users_id);
            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, TOKEN_IS_REQUIRED.customCode);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new ErrorHandler(errorCodesEnum.UNAUTHORIZED, WRONG_TOKEN.customCode);
                }
            });

            const tokens = await authService.findOneToken({ refresh_token });

            if (!tokens) {
                throw new ErrorHandler(errorCodesEnum.NOT_FOUND, RECORD_NOT_FOUND.customCode);
            }

            req.refresh_token = tokens;

            next();
        } catch (e) {
            next(e);
        }
    }
};
