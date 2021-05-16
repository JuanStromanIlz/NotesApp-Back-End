import express from 'express';
const router = express.Router();

/* UPLOAD IMAGES SETUP */

import { cloudinaryConfig } from '../config/cloudinary.config.js';
import { multerUploads, formatToUpload } from '../middleware/multer.middleware.js';
router.use('/register', cloudinaryConfig);

/* ROUTES AND MIDDLEWARE */
import { validate, register, login } from '../middleware/express.validator.js';
import { AuthController } from '../controllers/auth.controller.js';
const auth = new AuthController();

router.post('/register', multerUploads.single('profileImg'), validate(register), formatToUpload, auth.register);
router.post('/login', validate(login), auth.login);

export { router };