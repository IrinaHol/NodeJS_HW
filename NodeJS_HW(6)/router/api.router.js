const router = require('express').Router();

const userRouter = require('./user.router');
const carsRouter = require('./car.router');
const authRouter = require('./auth.router');

router.use('/users', userRouter);

router.use('/cars', carsRouter);

router.use('/auth', authRouter);

module.exports = router;
