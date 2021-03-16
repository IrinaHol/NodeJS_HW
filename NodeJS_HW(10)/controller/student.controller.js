const { errorMessages } = require('../message');
const studentService = require('../service/MySQL/student.service');

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
        try {
            await studentService.createStudent(req.body);

            res.status(201).json(errorMessages.CREATED.customCode);
        } catch (e) {
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
        try {
            const { body, params: { id } } = req;
            await studentService.updateStudent(id, body);

            res.json(body);
        } catch (e) {
            next(e);
        }
    },

    deleteOneStudent: async (req, res, next) => {
        try {
            const { id } = req.params;
            await studentService.deleteStudent(id);

            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            next(e);
        }
    }
};
