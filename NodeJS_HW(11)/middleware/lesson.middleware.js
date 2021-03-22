const { errorCodesEnum } = require('../constant');
const ErrorHandler = require('../message/ErrorHandler');
const { NOT_VALID_LESSON } = require('../message/error.messages');
const { lessonValidator } = require('../validators');

module.exports = {
    checkIsLessonIdValid: (req, res, next) => {
        try {
            const { id } = req.params;
            const { error } = lessonValidator.idLessonValidator.validate(id);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_LESSON.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isLessonValid: (req, res, next) => {
        try {
            const { error } = lessonValidator.createLessonValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_LESSON.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isLessonUpdateValid: (req, res, next) => {
        try {
            const { error } = lessonValidator.updateLessonValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_LESSON.customCode, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
