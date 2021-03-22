const { errorMessages } = require('../message');
const studentService = require('../service/MySQL/student.service');
const { transactionInstance } = require('../dataBase/MySQL').getInstance();

module.exports = {
    getALl: async (req, res, next) => {
        try {
            const students = await studentService.findAll();

            res.json(students);
        } catch (e) {
            next(e);
        }
    },

    createStud: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            await studentService.createStudent(req.body, transaction);

            await transaction.commit();
            res.status(201).json(errorMessages.CREATED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    findOneStudents: async (req, res, next) => {
        try {
            const { id } = req.params;
            const student = await studentService.findStudentById(id);

            res.json(student);
        } catch (e) {
            next(e);
        }
    },

    updateOneStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { body, params: { id } } = req;
            await studentService.updateStudent(id, body, transaction);

            await transaction.commit();
            res.json(body);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteOneStudent: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { id } = req.params;
            await studentService.deleteStudent(id, transaction);

            await transaction.commit();
            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
