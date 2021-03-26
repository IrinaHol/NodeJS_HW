const authService = require('../service/auth.service');
const { tokenizer } = require('../helpers');
const { transactionInstance } = require('../dataBase').getInstance();

module.exports = {

    login: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { users } = req;

            const tokens = tokenizer();

            await authService.createToken({ ...tokens, users_id: users.id }, transaction);

            await transaction.commit();
            res.json(tokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    refreshToken: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { users_id, id } = req.refresh_token;

            const newTokens = tokenizer();

            await authService.updateToken(id, { ...newTokens, users_id }, transaction);

            await transaction.commit();
            res.json(newTokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
