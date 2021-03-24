const db = require('../dataBase').getInstance();
const { USER } = require('../constant/dataBaseTables.enum');
const { objectBuilder } = require('../helpers/objectBuilder');

module.exports = {
    findAll: async (query = {}) => {
        const User = db.getModel(USER);
        const {
            limit, page, keys, filterObject, filters
        } = await objectBuilder(query);

        keys.forEach((key) => {
            switch (key) {
                case 'ageGte':
                    filterObject.age = { ...filterObject.age, $gte: +filters.ageGte };
                    break;
                case 'ageLte':
                    filterObject.age = { ...filterObject.age, $lte: +filters.ageLte };
                    break;
                case 'name':
                    filterObject.name = { $regex: filters.name, $options: 'i' };
                    break;
                default:
                    filterObject[key] = filters[key];
            }
        });

        const user = await User.findAll({
            where: filterObject,
            attributes: { exclude: 'password' }
        });

        return {
            data: user,
            page,
            limit
        };
    },

    createUser: (studentObject, transaction) => {
        const User = db.getModel(USER);

        return User.create(studentObject, { transaction });
    },

    findUserById: (id) => {
        const User = db.getModel(USER);

        return User.findOne({ where: { id } });
    },

    findOneUser: (email) => {
        const User = db.getModel(USER);

        return User.findOne({ where: { email } });
    },

    findUserByPk: (userId) => {
        const User = db.getModel(USER);

        User.findByPk(userId);
    },

    updateOneUser: (id, cartObject, transaction) => {
        const User = db.getModel(USER);

        return User.update(cartObject, {
            where: { id }, attributes: { exclude: 'password' }, returning: true, transaction
        });
    },

    deleteOneUser: (id, transaction) => {
        const User = db.getModel(USER);

        return User.destroy({ where: { id }, transaction });
    }
};
