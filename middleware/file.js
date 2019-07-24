const multer = require('multer');
const uuid = require('uuid');

const storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, 'images');
    },
    filename(req, file, cb){
        cb(null, uuid() + '-' + file.originalname);
    }
});

const allowedtypes = ['image/png', 'image/jpeg', 'image/jpg'];
const fileFilter = (req, file, cb) => {
    if (allowedtypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
};

module.exports = multer({
    storage,
    fileFilter
});