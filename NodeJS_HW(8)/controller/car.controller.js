const fs = require('fs-extra').promises;

const { errorMessages } = require('../message');
const { carService, fileService } = require('../service');

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
            const { body, photos, docs } = req;

            const car = await carService.createCar(body);

            if (photos) {
                for (const photo of photos) {
                    const { finalPath, uploadPath, fileDir } = fileService.dirBuilder(photo.name, 'photos', 'cars', car._id);
                    // eslint-disable-next-line no-await-in-loop
                    await fs.mkdir(fileDir, { recursive: true });
                    // eslint-disable-next-line no-await-in-loop
                    await photo.mv(finalPath);
                    // eslint-disable-next-line no-await-in-loop
                    await carService.updateCar(car._id, { photos: uploadPath });
                }
            }
            if (docs) {
                for (const doc of docs) {
                    const { finalPath, uploadPath, fileDir } = fileService.dirBuilder(doc.name, 'documents', 'cars', car._id);
                    // eslint-disable-next-line no-await-in-loop
                    await fs.mkdir(fileDir, { recursive: true });
                    // eslint-disable-next-line no-await-in-loop
                    await doc.mv(finalPath);
                    // eslint-disable-next-line no-await-in-loop
                    await carService.updateCar(car._id, { docs: uploadPath });
                }
            }

            res.status(201).json(errorMessages.CREATED.customCode);
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

            res.json(errorMessages.DELETED.customCode);
        } catch (e) {
            next(e);
        }
    }
};
