const { Auth, User } = require('../dataBase/models');

module.exports = {
    findOneUser: (email) => User.findOne(email),

    createToken: (tokensObj) => Auth.create(tokensObj),

    findOneDelete: (refreshToken) => Auth.findOneAndDelete(refreshToken),

    deleteToken: (userId) => Auth.deleteOne({ _user_id: userId })
};
