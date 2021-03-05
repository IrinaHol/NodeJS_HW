const jwt = require('jsonwebtoken');
const { errorMessages } = require('../message');
const { passwordHash } = require('../helpers');

const O_Auth = require('../dataBase/models/O_Auth.model');
const authService = require('../service/auth.service');
const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config/config');
const { AUTHORIZATION } = require('../constant/constants');

module.exports = {

    isUserPresent: async (req, res, next) => {
        try {
            const { email, password } = req.body;

            const user = await authService.findOneUser({ email });

            if (!user) {
                throw new Error(errorMessages.NOT_PRESENT_USER.en);
            }

            await passwordHash.compare(password, user.password);

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(AUTHORIZATION);

            if (!access_token) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED.en);
            }

            jwt.verify(access_token, JWT_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessages.THIS_TOKEN_IS_NOT_VALID.en);
                }
            });

            const tokens = await O_Auth.findOne({ access_token }).populate('_user_id');

            if (!tokens) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED.en);
            }

            req.user = tokens._user_id;

            next();
        } catch (e) {
            res.json(e.message);
        }
    },

    checkRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(AUTHORIZATION);

            if (!refresh_token) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED.en);
            }

            jwt.verify(refresh_token, JWT_REFRESH_SECRET, (err) => {
                if (err) {
                    throw new Error(errorMessages.THIS_TOKEN_IS_NOT_VALID.en);
                }
            });

            const tokens = await O_Auth.findOne({ refresh_token });

            if (!tokens) {
                throw new Error(errorMessages.TOKEN_IS_REQUIRED.en);
            }

            req.refresh_token = tokens.refresh_token;

            next();
        } catch (e) {
            res.json(e.message);
        }
    }
};
