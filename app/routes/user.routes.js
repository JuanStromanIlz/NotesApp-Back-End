const user = require('../controllers/user.controller');
const isLoggedIn = require('../auth/session.auth');
const express = require('express');
const router = express.Router();

/* CORS SETUP */

const cors = require('cors');
const corsOptions = {
    origin: process.env.FRONTEND_HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};
router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

/* MULTER SETUP */

const multer = require('multer');
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/profileImgs');
    },
    filename: (req, file, cb) => {
        cb(null, req.body.username + file.mimetype.replace('image/', '.'));
    }
});
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
const uploadProfile = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter: fileFilter
});

/* ROUTES AND MIDDLEWARE */

router.post('/register', uploadProfile.single('userImg'), user.register);
router.post('/login', user.login);
router.get('/profile', isLoggedIn, user.getUserInfo);
router.get('/all-notes', isLoggedIn, user.allUserNotes);
router.get('/all-categories', isLoggedIn, user.allUserCategories);
router.post('/create-note', isLoggedIn, user.createNote);
router.put('/update-note', isLoggedIn, user.updateNote);
router.delete('/delete-note/:note_id', isLoggedIn, user.deleteNote);
router.delete('/delete-user', isLoggedIn, user.deleteUser);
router.get('/log-out', isLoggedIn, user.logOut);

module.exports = router;
