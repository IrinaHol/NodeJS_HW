const { Auth, User } = require('../dataBase/models');

module.exports = {
    findOneUser: (email) => User.findOne(email),

    createToken: (tokens, userID) => Auth.create({ ...tokens, userID }),

    findOneDelete: (refreshToken) => Auth.findOneAndDelete(refreshToken),

    deleteToken: (userId) => Auth.deleteOne({ _user_id: userId })
};
