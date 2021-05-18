import { db } from '../models/mongoose.js';
import { defaultNotes } from '../config/default.notes.js';
import { passport } from '../middleware/passport.auth.js';
import jwt from 'jsonwebtoken';
const User = db.users;
const Note = db.notes;

class AuthController {
  //REGISTRO 
  async register(req, res, next) {  
    const { username, email, password } = req.body;
    const profileImg = res.locals.image;
    //Check If User Exists
    let foundUser = await User.findOne({
      username
    });
    if (foundUser) {
      return res.status(403).json({
        error: 'username is already in use'
      });
    }
    //Save newUser
    const newUser = new User({
      username,
      email,
      profileImg: profileImg
    });
    User.register(newUser, password, (err, user) => {
      if (!err) {
        //Create default Notes
        defaultNotes.map(note => {
          new Note({
            writer: user._id,
            title: note.title.replace('/USER_NAME/', user.username),
            sub: note.sub,
            category: note.category,
            content: note.content
          }).save();
        });
        //Generate user info
        const userInfo = { 
          username: user.username,
          email: user.email,
          profileImg: user.profileImg
        };
        // Generate JWT token
        const token = jwt.sign({
          id: user._id
        }, process.env.JWT_SECRET);
        //Send user info and token
        res.status(200).json({
          user: userInfo,
          token
        });
      }else{
        next(err);
      }
    });
  }
  //LOGIN
  async login(req, res, next) {
    const { username, password } = req.body;
    try {
      //Check If User Exists
      let foundUser = await User.findOne({username});
      if (!foundUser) {
        return res.status(404).json({
          error: 'Ningun usuario bajo este nombre'
        });
      }
      const { user } = await User.authenticate()(username, password);
      if (!user) {
        return res.status(401).json({
          error: 'Alguno de los datos proporcionados es incorrecto'
        });
      }
      //Generate user info
      const sendUser = { 
        username: user.username,
        email: user.email,
        profileImg: user.profileImg
      };
      // Generate JWT token
      const token =  jwt.sign({
        id: user._id
      }, process.env.JWT_SECRET);
      //Send user info and token
      return res.status(200).json({
        user: sendUser,
        token
      });
    } catch(err) {
      return next(err);
    }
  }
}

export { AuthController };