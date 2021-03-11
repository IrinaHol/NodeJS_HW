const { errorCodesEnum } = require('../constant');
const ErrorHandler = require('../message/ErrorHandler');
const {
    DOCS_MIMETYPES, FILE_MAX_SIZE, PHOTOS_MIMETYPES, PHOTO_MAX_SIZE, VIDEO_MAX_SIZE, VIDEOS_MIMETYPES
} = require('../constant/constants');
const { NOT_VALID_FILES } = require('../message/error.messages');

module.exports = {
    checkFiles: (req, res, next) => {
        try {
            const { files } = req;

            const docs = [];
            const photos = [];
            const videos = [];

            const allFiles = Object.values(files);

            for (let i = 0; i < allFiles.length; i++) {
                const { size, mimetype } = allFiles[i];

                if (PHOTOS_MIMETYPES.includes(mimetype)) {
                    if (size > PHOTO_MAX_SIZE) {
                        throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_FILES.customCode);
                    }

                    photos.push(allFiles[i]);
                } else if (DOCS_MIMETYPES.includes(mimetype)) {
                    if (size > FILE_MAX_SIZE) {
                        throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_FILES.customCode);
                    }

                    docs.push(allFiles[i]);
                } else if (VIDEOS_MIMETYPES.includes(mimetype)) {
                    if (size > VIDEO_MAX_SIZE) {
                        throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_FILES.customCode);
                    }

                    videos.push(allFiles[i]);
                } else {
                    throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_FILES.customCode);
                }
            }

            req.docs = docs;
            req.photos = photos;
            req.videos = videos;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkCountAvatar: (req, res, next) => {
        try {
            const { photos } = req;
            if (photos.length > 1) {
                throw new ErrorHandler(errorCodesEnum.BAD_REQUEST, NOT_VALID_FILES.customCode);
            }
            [req.avatar] = photos;

            next();
        } catch (e) {
            next(e);
        }
    }
};
