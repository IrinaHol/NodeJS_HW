const { errorCodesEnum } = require('../constant');
const ErrorHandler = require('../message/ErrorHandler');
const { ACCESS_DENIED } = require('../message/error.messages');

module.exports = {
    isAccessDenied: (whoHaveAccess = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!whoHaveAccess.length) {
                next();
            }

            if (!whoHaveAccess.includes(role)) {
                throw new ErrorHandler(errorCodesEnum.FORBIDDEN, ACCESS_DENIED.customCode);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
