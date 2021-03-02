const router = require('express').Router();

const userRouter = require('./user.router');
const carsRouter = require('./car.router');

router.use('/users', userRouter);

router.use('/cars', carsRouter);

module.exports = router;
