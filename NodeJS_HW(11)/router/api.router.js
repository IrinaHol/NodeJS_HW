const router = require('express').Router();

const authRouter = require('./auth.router');
const carsRouter = require('./car.router');
const userRouter = require('./user.router');
const studentsRouter = require('./student.router');
const lessonsRouter = require('./lesson.router');

router.use('/auth', authRouter);
router.use('/cars', carsRouter);
router.use('/users', userRouter);
router.use('/students', studentsRouter);
router.use('/lessons', lessonsRouter);

module.exports = router;
