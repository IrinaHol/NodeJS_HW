const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../../constant/regexp.enum');

module.exports = Joi.object({
    name: Joi.string()
        .trim()
        .alphanum()
        .min(2)
        .max(50)
        .required(),
    age: Joi.number().integer().min(3).max(120),
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
    password: Joi.string()
        .trim().min(6)
        .max(30)
        .regex(PASSWORD_REGEXP)
        .required()
});
