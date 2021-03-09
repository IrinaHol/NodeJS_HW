const { errorCodesEnum } = require('../constant');
const { errorMessages } = require('../message');
const { carService } = require('../service');

module.exports = {
    getAllCars: async (req, res, next) => {
        try {
            const cars = await carService.findAllCars();

            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    getOneCar: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const carById = await carService.findCarById(carId);

            res.json(carById);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            await carService.createCar(req.body);

            res.status(errorCodesEnum.CREATED).json(errorMessages.CREATED.en);
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { carId } = req.params;
            const { body } = req;

            const car = await carService.updateCar(carId, body);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    deleteCarById: async (req, res, next) => {
        try {
            const { carId } = req.params;
            await carService.deleteCarById(carId);

            res.json(errorMessages.DELETED.en);
        } catch (e) {
            next(e);
        }
    }
};
