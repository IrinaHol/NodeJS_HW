const db = require('../dataBase').getInstance();
const { CAR } = require('../constant/dataBaseTables.enum');

module.exports = {
    findAll: () => {
        const Car = db.getModel(CAR);

        return Car.findAll();
    },

    createCar: (studentObject, transaction) => {
        const Car = db.getModel(CAR);

        return Car.create(studentObject, { transaction });
    },

    findCartById: (id) => {
        const Car = db.getModel(CAR);

        return Car.findOne({ where: { id } });
    },

    updateCar: (id, cartObject, transaction) => {
        const Car = db.getModel(CAR);

        return Car.update(cartObject, { where: { id }, returning: true, transaction });
    },

    deleteOneCar: (id, transaction) => {
        const Car = db.getModel(CAR);

        return Car.destroy({ where: { id }, transaction });
    }
};
