const user = require('../controllers/user.controller');
const isLoggedIn = require('../auth/session.auth');
const cors = require('cors');
const express = require('express');
const router = express.Router();
const corsOptions = {
    origin: process.env.FRONTEND_HOST,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};
router.use(cors(corsOptions));
router.options('*', cors(corsOptions));

router.post('/register', user.register);
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
