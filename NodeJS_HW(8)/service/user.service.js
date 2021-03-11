const { User } = require('../dataBase/models');

module.exports = {
    findAll: () => User.find(),

    createUser: (user) => User.create(user),

    findUserById: (userID) => User.findById(userID),

    updateUser: (userId, body) => User.updateOne({ _id: userId }, { $set: body }),

    deleteUserById: (userId) => User.findOneAndDelete(userId)
};
