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
            next(e);
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
            next(e);
        }
    },

    isCarUpdateValid: (req, res, next) => {
        try {
            const { error } = carValidator.carUpdateValidator.validate(req.body);

            if (error) {
                throw new Error(error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
