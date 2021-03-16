const Joi = require('joi');

module.exports = Joi.object({
    name: Joi.string()
        .trim()
        .alphanum()
        .min(2)
        .max(50),
    age: Joi.number().integer().min(1).max(120),
});
