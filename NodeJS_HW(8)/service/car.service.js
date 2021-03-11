const { Car } = require('../dataBase/models');

module.exports = {
    findAllCars: () => Car.find(),

    createCar: (car) => Car.create(car),

    findCarById: (carID) => Car.findById(carID),

    updateCar: (carID, data) => Car.updateOne({ _id: carID }, { $set: data }),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
