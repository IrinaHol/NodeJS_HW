const { Auth, User } = require('../dataBase/models');

module.exports = {
    findOneUser: (email) => User.findOne(email),

    createToken: (tokensObj) => Auth.create(tokensObj),

    updateById: (recordId, updateObject) => Auth.findByIdAndUpdate(recordId, updateObject),

    deleteToken: (userId) => Auth.deleteOne({ _user_id: userId })
};
