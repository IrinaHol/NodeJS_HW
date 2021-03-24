const { authService } = require('../service');

module.exports = async () => {
    await authService.deleteToken({
        created_at: ({ createdAt: { $lte: new Date().toISOString() } })
    });
};
