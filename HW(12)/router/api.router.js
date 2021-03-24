const router = require('express').Router();

const authRouter = require('./auth.router');
const carsRouter = require('./car.router');
const userRouter = require('./user.router');

router.use('/auth', authRouter);
router.use('/cars', carsRouter);
router.use('/users', userRouter);

module.exports = router;
