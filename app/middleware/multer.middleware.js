import multer from 'multer';
import { uploader } from '../config/cloudinary.config.js';

/* MULTER CONFIG TO PROCESS FILES */

const storage = multer.memoryStorage();
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg' ||
        file.mimetype === 'image/gif' ||
        file.mimetype === 'image/png'
    ) {
        cb(null, true);
    }else{
        cb(null, false);
    }
};
const multerUploads = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* MIDDLEWARE TO UPLOAD IMAGE TO CLOUDINARY */

const formatToUpload = (req, res, next) => {
    const file = `data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`;
    uploader.upload(file, {
        folder: '/noLoPierdasAPI/profile-pics/'
    }).then((result) => {
    const image = result.url;
    res.locals.image = image;
    next();
    }).catch((err) => {
        res.json({success: false, message: 'Ocurrio un error al intentar guardar la imagen', err});
    });
}

export { multerUploads, formatToUpload };