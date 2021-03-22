const Joi = require('joi');
const { EMAIL_REGEXP, PASSWORD_REGEXP } = require('../../constant/regexp.enum');

module.exports = Joi.object({
    password: Joi.string()
        .trim().min(6)
        .max(30)
        .regex(PASSWORD_REGEXP)
        .required(),
    email: Joi.string().trim().regex(EMAIL_REGEXP).required(),
});
