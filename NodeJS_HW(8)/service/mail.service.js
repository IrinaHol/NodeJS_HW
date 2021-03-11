const mailer = require('nodemailer');
const EmailTemplates = require('email-templates');
const path = require('path');

const ErrorHandler = require('../message/ErrorHandler');
const { errorCodesEnum } = require('../constant');
const { SERVICE_EMAIL, SERVICE_EMAIL_PASSWORD } = require('../config/config');
const templateInfo = require('../emailTemplates');
const { WRONG_MAIL_ACTION } = require('../message/error.messages');

const templateParser = new EmailTemplates({
    views: {
        root: path.join(process.cwd(), 'emailTemplates')
    }
});

const transporter = mailer.createTransport({
    service: 'gmail',
    auth: {
        user: SERVICE_EMAIL,
        pass: SERVICE_EMAIL_PASSWORD
    }
});

const sendMail = async (userMail, action, context) => {
    try {
        const templatesFromAction = templateInfo[action];

        if (!templatesFromAction) {
            throw new ErrorHandler(errorCodesEnum.SERVER_ERROR, WRONG_MAIL_ACTION.customCode);
        }

        const html = await templateParser.render(templatesFromAction.templateName, context);

        return transporter.sendMail({
            from: 'NO REPLY',
            to: userMail,
            subject: templatesFromAction.subject,
            html
        });
    } catch (e) {
        console.log(e);
    }
};

module.exports = {
    sendMail
};
