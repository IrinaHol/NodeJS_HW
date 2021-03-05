const User = require('../dataBase/models/User.model');
require('../dataBase/models/Car.model');

module.exports = {
    findAll: () => User.find(),

    createUser: (user) => User.create(user),

    findUserById: (userID) => User.findById(userID),

    deleteUserById: (userId) => User.findByIdAndDelete(userId),

    getUserByEmail: (email) => User.findOne(email)
};
