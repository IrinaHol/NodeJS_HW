const db = require('../dataBase').getInstance();
const { O_AUTH } = require('../constant/dataBaseTables.enum');

module.exports = {
    createToken: (tokensObj, transaction) => {
        const Token = db.getModel(O_AUTH);

        return Token.create(tokensObj, { transaction });
    },

    findOneToken: (tokensObj) => {
        const Token = db.getModel(O_AUTH);

        return Token.findOne({ where: tokensObj });
    },

    deleteToken: (id, transaction) => {
        const O_Auth = db.getModel(O_AUTH);

        return O_Auth.destroy({ where: id, transaction });
    },

    updateToken: (id, updateObject, transaction) => {
        const Token = db.getModel(O_AUTH);

        return Token.update(updateObject, { where: { id }, transaction });
    }
};
