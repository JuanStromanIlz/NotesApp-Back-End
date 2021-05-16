import express from 'express';
const router = express.Router();

/* ROUTES AND MIDDLEWARE */

//TOKEN VALIDATION
import { passport } from '../middleware/passport.auth.js';
//FORM FIELDS VALIDATION
import { validate, newNote } from '../middleware/express.validator.js';
//USER ROUTER CONTROLLER
import { UserController } from '../controllers/user.controller.js';
const user = new UserController();

//USER
router.get('/profile', passport.authenticate('jwt',{session: false}), user.getUserInfo);
router.delete('/profile', passport.authenticate('jwt',{session: false}), user.deleteUser);
//ALL FROM USER
router.get('/allNotes', passport.authenticate('jwt',{session: false}), user.allUserNotes);
router.get('/allCategories', passport.authenticate('jwt',{session: false}), user.allUserCategories);
//NOTE ROUTES
router.post('/note', passport.authenticate('jwt',{session: false}), validate(newNote), user.newNote);
router.get('/note/:note_id', passport.authenticate('jwt',{session: false}), user.getById);
router.patch('/note/:note_id', passport.authenticate('jwt',{session: false}), user.updateNote);
router.delete('/note/:note_id', passport.authenticate('jwt',{session: false}), user.deleteNote);

export { router };
