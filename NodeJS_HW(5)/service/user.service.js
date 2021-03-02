const { User } = require('../dataBase/models');

module.exports = {
    findAll: () => User.find(),

    createUser: (user) => User.create(user),

    findUserById: (userID) => User.findById(userID),

    deleteUserById: (userId) => User.findByIdAndDelete(userId)
};
