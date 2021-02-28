const Car = require('../dataBase/models/Car.model');

module.exports = {
    findAllCars: () => Car.find(),

    createCar: (car) => Car.create(car),

    findCarById: (carID) => Car.findById(carID),

    updateCar: (carID, data) => Car.findOneAndUpdate(carID, data),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
