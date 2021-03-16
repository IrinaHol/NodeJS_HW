const db = require('../../dataBase/MySQL').getInstance();
const { STUDENTS } = require('../../constant/constants');

module.exports = {
    findAll: () => {
        const Student = db.getModel(STUDENTS);

        return Student.findAll();
    },

    createStudent: (studentObject) => {
        const Student = db.getModel(STUDENTS);

        return Student.create(studentObject);
    },

    findStudentById: (id) => {
        const Student = db.getModel(STUDENTS);

        return Student.findOne({ where: { id } });
    },

    updateStudent: (id, studentObject) => {
        const Student = db.getModel(STUDENTS);

        return Student.update(studentObject, { where: { id } });
    },

    deleteStudent: (id) => {
        const Student = db.getModel(STUDENTS);

        return Student.destroy({ where: { id } });
    }
};
