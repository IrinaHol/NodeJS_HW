const router = require('express').Router();

const carController = require('../controller/car.controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.checkIsCarIdValid, carController.getOneCar);

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.put('/:carId', carMiddleware.checkIsCarIdValid, carMiddleware.isCarUpdateValid, carController.updateCar);

router.delete('/:carId', carMiddleware.checkIsCarIdValid, carController.deleteCarById);

module.exports = router;
