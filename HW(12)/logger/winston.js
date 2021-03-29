const winston = require('winston');
const path = require('path');

module.exports = () => {
    const consoleOption = {
        level: 'info',
        format: winston.format.combine(
            winston.format.colorize({ colors: { info: 'yellow', error: 'red' }, all: true })
        )
    };
    const fileOption = {
        level: 'error',
        filename: path.join(process.cwd(), 'logger-file', 'log.txt'),
        format: winston.format.combine(
            winston.format.json({ space: 2 })
        )
    };

    const logger = winston.createLogger({
        format: winston.format.combine(
            winston.format.timestamp({
                format: 'YYYY-MM-DD HH:mm:ss'
            }),
            winston.format.simple(),
        ),
        transports: [
            new winston.transports.Console(consoleOption),
            new winston.transports.File(fileOption)
        ]
    });

    return {
        info: (message) => logger.info(message),
        error: (message) => logger.error(message),
    };
};
