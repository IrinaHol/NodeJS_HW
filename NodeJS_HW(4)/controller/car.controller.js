const errorCodes = require('../constant/errorCodes.enum');
const msg = require('../message/error.messages');

const carService = require('../service/car.service');

module.exports = {
    getAllCars: async (req, res) => {
        try {
            const cars = await carService.findAllCars();

            res.json(cars);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    getOneCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const carById = await carService.findCarById(carId);

            res.json(carById);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    createCar: async (req, res) => {
        try {
            await carService.createCar(req.body);

            res.status(errorCodes.CREATED).json(msg.CREATED.en);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },
    updateCar: async (req, res) => {
        try {
            const { carId } = req.params;
            const { body } = req;

            const car = await carService.updateCar(carId, body);

            res.json(car);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    },

    deleteCarById: async (req, res) => {
        try {
            const { carId } = req.params;
            await carService.deleteCarById(carId);

            res.json(msg.DELETED.en);
        } catch (e) {
            res.status(errorCodes.BAD_REQUEST).json(e.message);
        }
    }
};
