const errorMessage = require('../message/error.messages');
const errorCodes = require('../constant/errorCodes.enum');

module.exports = {
    checkIsCarIdValid: (req, res, next) => {
        try {
            const { carId } = req.params;

            if (carId.length !== 24) {
                throw new Error(errorMessage.NOT_VALID_ID.en);
            }

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    isCarValid: (req, res, next) => {
        try {
            const { model, year, price } = req.body;

            if (!model) throw new Error(errorMessage.NOT_VALID_MODEL.en);

            if (price < 0 || !Number.isInteger(price)) throw new Error(errorMessage.NOT_VALID_PRICE.en);

            if (year > 2021 || year < 1900) throw new Error(errorMessage.NOT_VALID_YEAR.en);

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    checkCarValidity: (req, res, next) => {
        try {
            const { year, price } = req.body;

            if (price < 0 || !Number.isInteger(price)) throw new Error(errorMessage.NOT_VALID_PRICE.en);

            if (year > 2021 || year < 1900) throw new Error(errorMessage.NOT_VALID_YEAR.en);

            next();
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
