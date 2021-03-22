const { errorMessages } = require('../message');
const lessonService = require('../service/MySQL/lesson.service');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

module.exports = {
    getALl: async (req, res, next) => {
        try {
            const students = await lessonService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    createLesson: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            await lessonService.createLesson(req.body, transaction);

            await transaction.commit();
            res.status(201).json(errorMessages.CREATED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    findOneLesson: async (req, res, next) => {
        try {
            const { id } = req.params;
            const student = await lessonService.findLessonById(id);

            res.json(student);
        } catch (e) {
            next(e);
        }
    },

    updateOneLesson: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { body, params: { id } } = req;
            await lessonService.updateLesson(id, body, transaction);

            await transaction.commit();
            res.json(body);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteOneLesson: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { id } = req.params;
            await lessonService.deleteLesson(id, transaction);

            await transaction.commit();
            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
