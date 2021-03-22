const router = require('express').Router();

const lessonController = require('../controller/lesson.controllers');
const { lessonMiddleware } = require('../middleware');

router.get('/', lessonController.getALl);
router.post('/', lessonMiddleware.isLessonValid, lessonController.createLesson);

router.use('/:id', lessonMiddleware.checkIsLessonIdValid);
router.get('/:id', lessonController.findOneLesson);
router.delete('/:id', lessonController.deleteOneLesson);
router.put('/:id', lessonMiddleware.isLessonUpdateValid, lessonController.updateOneLesson);

module.exports = router;
