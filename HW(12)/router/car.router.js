const router = require('express').Router();

const carController = require('../controller/car.controller');
const { carMiddleware } = require('../middleware');

router.get('/', carController.getALl);
router.post('/', carController.createNewCar, carMiddleware.isCarValid);

router.use('/:id', carMiddleware.checkIsCarIdValid);
router.get('/:id', carController.findOneCar);
router.put('/:id', carMiddleware.isCarUpdateValid, carController.updateOneCar);
router.delete('/:id', carController.deleteOneCar);

module.exports = router;
