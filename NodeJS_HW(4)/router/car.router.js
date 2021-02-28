const router = require('express').Router();

const carController = require('../controller/car.controller');
const carMiddleware = require('../middleware/car.middleware');

router.get('/', carController.getAllCars);

router.get('/:carId', carMiddleware.checkIsCarIdValid, carController.getOneCar);

router.post('/', carMiddleware.isCarValid, carController.createCar);

router.put('/:carId', carMiddleware.checkIsCarIdValid, carMiddleware.checkCarValidity, carController.updateCar);

router.delete('/:carId', carMiddleware.checkIsCarIdValid, carController.deleteCarById);

module.exports = router;
