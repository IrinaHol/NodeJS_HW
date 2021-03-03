const Joi = require('joi');

module.exports = Joi.string()
    .min(24)
    .max(24)
    .alphanum()
    .id();
