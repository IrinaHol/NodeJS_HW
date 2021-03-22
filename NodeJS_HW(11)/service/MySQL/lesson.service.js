const db = require('../../dataBase/MySQL').getInstance();
const { LESSON } = require('../../constant/constants');

module.exports = {
    findAll: () => {
        const Lesson = db.getModel(LESSON);

        return Lesson.findAll();
    },

    createLesson: (lessonObject, transaction) => {
        const Lesson = db.getModel(LESSON);

        return Lesson.create(lessonObject, { transaction });
    },

    findLessonById: (id) => {
        const Lesson = db.getModel(LESSON);

        return Lesson.findOne({ where: { id } });
    },

    updateLesson: (id, studentObject, transaction) => {
        const Lesson = db.getModel(LESSON);

        return Lesson.update(studentObject, { where: { id }, returning: true, transaction });
    },

    deleteLesson: (id, transaction) => {
        const Lesson = db.getModel(LESSON);

        return Lesson.destroy({ where: { id }, transaction });
    }
};
