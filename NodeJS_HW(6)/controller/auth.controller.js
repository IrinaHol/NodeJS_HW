const { tokenizer } = require('../helpers');
const authService = require('../service/auth.service');
const { errorCodesEnum } = require('../constant');

module.exports = {

    login: async (req, res) => {
        try {
            const { userID } = req.params;

            const tokens = tokenizer();

            await authService.createToken(tokens, userID);

            res.json(tokens);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    refreshToken: async (req, res) => {
        try {
            const { refreshToken } = req;

            await authService.findOneDelete(refreshToken);

            const newTokens = tokenizer();

            await authService.createToken(newTokens, refreshToken);

            res.json(newTokens);
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    }
};
