import express from 'express';
import { isLoggedIn } from '../middleware/session.auth.js';
const router = express.Router();

/* CORS SETUP */

import cors from 'cors';

const corsOptions = {
    origin: [process.env.FRONTEND_HOST, 'http://localhost:3000/'],
    methods: ['GET', 'POST', 'PATCH', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};
router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

/* UPLOAD IMAGES SETUP */

import { cloudinaryConfig } from '../config/cloudinary.config.js';
import { multerUploads, formatToUpload } from '../middleware/multer.middleware.js';
router.use('*', cloudinaryConfig);

/* ROUTES AND MIDDLEWARE */
import { validate, register, login, newNote } from '../middleware/express.validator.js';
import { UserController } from '../controllers/user.controller.js';
const user = new UserController();

//USER
router.post('/register', multerUploads.single('profileImg'), validate(register), formatToUpload, user.register, user.login);
router.post('/login', validate(login), user.login);
router.get('/profile', isLoggedIn, user.getUserInfo);
router.delete('/profile', isLoggedIn, user.deleteUser);
router.get('/logout', isLoggedIn, user.logOut);
//ALL FROM USER
router.get('/allNotes', isLoggedIn, user.allUserNotes);
router.get('/allCategories', isLoggedIn, user.allUserCategories);
//NOTE ROUTES
router.post('/note', isLoggedIn, validate(newNote), user.newNote);
router.get('/note/:note_id', isLoggedIn, user.getById);
router.patch('/note/:note_id', isLoggedIn, user.updateNote);
router.delete('/note/:note_id', isLoggedIn, user.deleteNote);

export { router };
