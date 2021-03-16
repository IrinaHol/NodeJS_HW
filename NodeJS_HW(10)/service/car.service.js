const { Car } = require('../dataBase/models');
const { objectBuilder } = require('../helpers/objectBuilder');

module.exports = {
    findAllCars: async (query = {}) => {
        const {
            limit, page, offSet, keys, filterObject, sort, filters
        } = await objectBuilder(query);

        keys.forEach((key) => {
            switch (key) {
                case 'priceGte':
                    filterObject.price = { ...filterObject.price, $gte: +filters.priceGte };
                    break;
                case 'priceLte':
                    filterObject.price = { ...filterObject.price, $lte: +filters.priceLte };
                    break;
                case 'category':
                    const categories = filters.category.split(';');
                    filterObject.category = { $in: categories };
                    break;
                case 'model':
                    filterObject.model = { $regex: filters.model, $options: 'i' };
                    break;
                case 'yearGte':
                    filterObject.year = { ...filterObject.year, $gte: +filters.yearGte };
                    break;
                case 'yearLte':
                    filterObject.year = { ...filterObject.year, $lte: +filters.yearLte };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const car = await Car.find(filterObject).limit(+limit).skip(offSet).sort(sort);
        const countItems = await Car.countDocuments(filterObject);
        const countPages = Math.ceil(countItems / (+limit));

        return {
            data: car,
            page,
            limit,
            countItems,
            countPages
        };
    },

    createCar: (car) => Car.create(car),

    findCarById: (carID) => Car.findById(carID),

    updateCar: (carID, data) => Car.updateOne({ _id: carID }, { $set: data }),

    deleteCarById: (carId) => Car.findByIdAndDelete(carId)
};
