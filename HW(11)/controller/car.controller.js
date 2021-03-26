const { errorMessages } = require('../message');
const carService = require('../service/car.service');
const { transactionInstance } = require('../dataBase').getInstance();

module.exports = {
    getALl: async (req, res, next) => {
        try {
            const cars = await carService.findAll();
            console.log(cars);
            res.json(cars);
        } catch (e) {
            next(e);
        }
    },

    createNewCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            await carService.createCar(req.body, transaction);

            await transaction.commit();
            res.status(201).json(errorMessages.CREATED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    findOneCar: async (req, res, next) => {
        try {
            const { id } = req.params;
            const car = await carService.findCartById(id);

            res.json(car);
        } catch (e) {
            next(e);
        }
    },

    updateOneCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { body, params: { id } } = req;
            await carService.updateCar(id, body, transaction);

            await transaction.commit();
            res.json(body);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },

    deleteOneCar: async (req, res, next) => {
        const transaction = await transactionInstance();
        try {
            const { id } = req.params;
            await carService.deleteOneCar(id, transaction);

            await transaction.commit();
            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
