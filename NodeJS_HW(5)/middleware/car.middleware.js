const { errorCodesEnum } = require('../constant');
const { carValidator } = require('../validators');

module.exports = {
    checkIsCarIdValid: (req, res, next) => {
        try {
            const { error } = carValidator.idCarValidator.validate(req.params.id);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }
            next();
        } catch (e) {
            res.status(errorCodesEnum.BAD_REQUEST).json(e.message);
        }
    },
};
