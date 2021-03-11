const authService = require('../service/auth.service');
const { tokenizer } = require('../helpers');

module.exports = {

    login: async (req, res, next) => {
        try {
            const { user } = req;

            const tokens = tokenizer();

            await authService.createToken({ ...tokens, user });

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        try {
            const { _user_id, _id } = req.refresh_token;

            const newTokens = tokenizer();

            await authService.updateById(_id, { ...newTokens, _user_id });

            res.json(newTokens);
        } catch (e) {
            next(e);
        }
    }
};
