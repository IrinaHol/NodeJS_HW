const Joi = require('joi');
const { CURRENT_YEAR } = require('../../constant/constants');

module.exports = Joi.object({
    model: Joi.string()
        .trim()
        .min(1)
        .max(50)
        .required(),
    price: Joi.number().integer().min(1),
    year: Joi.number()
        .integer()
        .min(1980)
        .max(CURRENT_YEAR)
});
