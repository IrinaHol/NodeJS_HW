const bcrypt = require('bcrypt');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: (password, hashPassword) => {
        const isPasswordEqual = bcrypt.compare(password, hashPassword);

        if (!isPasswordEqual) {
            throw new Error('Wrong email or password');
        }
    }
};
