const { errorCodesEnum } = require('../constant');
const ErrorHandler = require('../message/ErrorHandler');
const { NOT_VALID_STUDENT } = require('../message/error.messages');
const { studentValidator } = require('../validators');

module.exports = {
    checkIsStudentIdValid: (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = studentValidator.idStudentValidator.validate(id);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_STUDENT.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isStudentValid: (req, res, next) => {
        try {
            const { error } = studentValidator.createStudentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_STUDENT.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isStudentUpdateValid: (req, res, next) => {
        try {
            const { error } = studentValidator.updateStudentValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_STUDENT.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
