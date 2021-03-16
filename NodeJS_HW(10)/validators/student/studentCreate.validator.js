const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .trim()
        .alphanum()
        .min(2)
        .max(50)
        .required()
        .allow('X Æ A-Xii'),
    age: Joi.number().integer().min(1).max(120),
    gender: Joi.string().trim().alphanum()
});
