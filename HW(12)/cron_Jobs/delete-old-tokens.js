const { Sq } = require('sequelize');

const { authService } = require('../service');

module.exports = async () => {
    await authService.deleteToken({
        updatedAt: { [Sq.lte]: new Date(new Date() - 48 * 60 * 60 * 1000) }
    });
};
