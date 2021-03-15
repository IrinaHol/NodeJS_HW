const { User } = require('../dataBase/models');
const { objectBuilder } = require('../helpers/objectBuilder');

module.exports = {
    findAll: async (query = {}) => {
        const {
            limit, page, offSet, keys, filterObject, sort, filters
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

        const user = await User.find(filterObject).limit(+limit).skip(offSet).sort(sort);
        const countItems = await User.countDocuments(filterObject);
        const countPages = Math.ceil(countItems / (+limit));

        return {
            data: user,
            page,
            limit,
            countItems,
            countPages
        };
    },

    createUser: (user) => User.create(user),

    findUserById: (userID) => User.findById(userID),

    updateUser: (userId, body) => User.updateOne({ _id: userId }, { $set: body }),

    deleteUserById: (userId) => User.findOneAndDelete(userId)
};
