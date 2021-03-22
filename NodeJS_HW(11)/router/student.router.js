const router = require('express').Router();

const studentController = require('../controller/student.controller');
const { studentMiddleware } = require('../middleware');

router.get('/', studentController.getALl);
router.post('/', studentMiddleware.isStudentValid, studentController.createStud);

router.use('/:id', studentMiddleware.checkIsStudentIdValid);
router.get('/:id', studentController.findOneStudents);
router.delete('/:id', studentController.deleteOneStudent);
router.put('/:id', studentMiddleware.isStudentUpdateValid, studentController.updateOneStudent);

module.exports = router;
