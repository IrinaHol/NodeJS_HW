const db = require('../../dataBase/MySQL').getInstance();
const { STUDENTS } = require('../../constant/constants');

module.exports = {
    findAll: () => {
        const Student = db.getModel(STUDENTS);

        return Student.findAll();
    },

    createStudent: (studentObject, transaction) => {
        const Student = db.getModel(STUDENTS);

        return Student.create(studentObject, { transaction });
    },

    findStudentById: (id) => {
        const Student = db.getModel(STUDENTS);

        return Student.findOne({ where: { id } });
    },

    updateStudent: (id, studentObject, transaction) => {
        const Student = db.getModel(STUDENTS);

        return Student.update(studentObject, { where: { id }, returning: true, transaction });
    },

    deleteStudent: (id, transaction) => {
        const Student = db.getModel(STUDENTS);

        return Student.destroy({ where: { id }, transaction });
    }
};
