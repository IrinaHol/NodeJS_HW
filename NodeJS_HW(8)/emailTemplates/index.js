const { emailActionsEnum } = require('../constant');

module.exports = {
    [emailActionsEnum.WELCOME]: {
        templateName: 'welcome',
        subject: 'Welcome!!!'
    },

    [emailActionsEnum.USER_DELETED]: {
        templateName: 'delete',
        subject: 'User was deleted'
    },

    [emailActionsEnum.PASSWORD_CHANGED]: {
        templateName: 'update',
        subject: 'Someone have changed your password'
    }
};
