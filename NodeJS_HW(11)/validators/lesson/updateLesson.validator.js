const Joi = require('joi');

module.exports = Joi.object({
    label: Joi.string()
        .trim()
        .alphanum()
        .min(1)
        .max(50),
    student_count: Joi.number().integer().min(1).max(12),
    date: Joi.string().trim()
});
