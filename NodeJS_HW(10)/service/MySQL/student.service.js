const db = require('../../dataBase/MySQL').getInstance();

module.exports = {
    findAll: () => {
        const Student = db.getModel('Student');

        return Student.findAll();
    },

    createStudent: (studentObject) => {
        const Student = db.getModel('Student');

        return Student.create(studentObject);
    },

    findStudentById: (id) => {
        const Student = db.getModel('Student');

        return Student.findOne({ where: { id } });
    },

    updateStudent: (id, studentObject) => {
        const Student = db.getModel('Student');

        return Student.update(studentObject, { where: { id } });
    },

    deleteStudent: (id) => {
        const Student = db.getModel('Student');

        return Student.destroy({ where: { id } });
    }
};
