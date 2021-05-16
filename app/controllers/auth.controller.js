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
        // Generate JWT token
        const token = jwt.sign({
          id: newUser._id
        }, process.env.JWT_SECRET);
        //Send user info and token
        res.status(200).json({
          user: { 
            username: user.username,
            email: user.email,
            profileImg: user.profileImg
          },
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
    //Check If User Exists
    let foundUser = await User.findOne({username});
    if (!foundUser) {
      return res.status(403).json({
        error: 'no username under this name'
      });
    }
    passport.authenticate('local', (err, user, info) => {
      if (!err) {
        // Generate JWT token
        const token = jwt.sign({
          id: user._id
        }, process.env.JWT_SECRET);
        console.log(token);
        //Send token
        return res.status(200).json({
          success: true,
          token
        });
      }
      if (err) {
        next(err);
      }
      if (!user) {
        return res.json({success:false, message:'Alguno de los datos proporcionados es incorrecto', info});
      } 
    })(req, res, next);
  }
}

export { AuthController };