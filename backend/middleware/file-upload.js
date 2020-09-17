const multer = require('multer');
const uuid = require('uuid');

const MIME_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg'
};

const fileUpload = multer({
    limits: 500000,
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'uploads/images');
        },
        filename: (req, res, cb) => {
            const ext = MIME_TYPE_MAP[file.mimetype];
            cb(null, uuid() + '.' + ext);
        }
    }),
    //fileFilter:
});

module.exports = fileUpload;