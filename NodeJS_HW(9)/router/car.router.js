const router = require('express').Router();

const carController = require('../controller/car.controller');
const { carMiddleware, fileMiddleware } = require('../middleware');

router.get('/', carController.getAllCars);
router.post('/', carMiddleware.isCarValid, fileMiddleware.checkFiles, carController.createCar);

router.use('/', carMiddleware.checkIsCarIdValid);
router.get('/:carId', carController.getOneCar);
router.put('/:carId', carMiddleware.isCarUpdateValid, carController.updateCar);
router.delete('/:carId', carController.deleteCarById);

module.exports = router;
