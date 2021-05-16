import { db } from '../models/mongoose.js';
import { uploader } from '../config/cloudinary.config.js';
const User = db.users;
const Note = db.notes;

/* CONTROLADORES PARA LAS RUTAS DE USUARIOS */
class UserController {
  //USER INFO
  async getUserInfo(req, res, next) {
    let userId = req.user._id;
    try {
      const user = await User.findOne({_id: userId});
      const notes = await Note.find({writer: userId});
      return res.status(200).json({
        success: true,
        user: {
          username: user.username,
          email: user.email,
          profileImg: user.profileImg,
          notes: notes.length
        }
      });
    } catch(err) {
      next(err);
    }
  }
  //DELETE USER
  async deleteUser(req, res, next) {
    let userId = req.user._id;
    let profileImgHosted = req.user.profileImg;
    try {
      const user = await Note.deleteMany({writer: userId});
      const notes = await User.deleteOne({_id: userId});
      const imageDelete = await uploader.destroy(profileImgHosted);
      if (user && notes && imageDelete) {
        return res.status(200).json({
          success: true, 
          message: 'Usuario eliminado con exito'
        });
      }
    } catch(err) {
      next(err);
    }
  }
  //GET ALL NOTES FROM USER
  async allUserNotes(req, res, next) {
    let userId = req.user._id;
    try {
      const userNotes = await Note.find({writer: userId}, null, {sort: { updatedAt : -1 }});
      return res.status(200).json({
        success: true,
        data: userNotes
      }); 
    } catch(err) {
      next(err);
    }
  }
  //GET ALL CATEGORIES FROM USER
  async allUserCategories(req, res, next) {
    let userId = req.user._id;
    try {
      const notes = await Note.find({writer: userId},{category: 1, _id: 0});
      if (notes) {
        let allCates = notes.map(note => note.category);
        let cleanCategories = [...new Set(allCates)];

        return res.status(200).json({
          success: true, 
          data: cleanCategories
        });
      }
    } catch(err) {
      next(err);
    }
  }
  //GET SINGLE NOTE
  async getById(req, res, next) {
    let userId = req.user._id;
    let noteId = req.params.note_id;
    try {
      const note = await Note.findOne({_id: noteId, writer: userId});
      if (note === null) {
        return res.status(404).json({
          success: false,
          message: 'No encontramos una nota bajo este id'
        }); 
      }
      return res.status(200).json({
        success: true,
        data: note
      }); 
    } catch(err) {
      next(err);
    }
  }
  //NEW NOTE
  async newNote(req, res, next) {
    let userId = req.user._id;
    let note = req.body;
    try {
      const newNote = await new Note({
        writer: userId,
        title: note.title,
        sub: note.sub,
        category: note.category,
        content: note.content
      })
      .save();
      if (newNote) {
        return res.status(201).json({
          success: true,
          message: 'Nota creada con exito'
        });
      }
    } catch(err) {
      next(err);
    }
  }
  //DELETE NOTE
  async deleteNote(req, res, next) {
    let userId = req.user._id;
    let noteId = req.params.note_id;
    try {
      const deleteNote = await Note.deleteOne({_id: noteId, writer: userId});
      if (deleteNote) {
        return res.status(200).json({
          success: true,
          message: 'Nota eliminada con exito'
        });
      }
    } catch(err) {
      next(err);
    }
  }
  //SAVE NOTE EDIT    
  async updateNote(req, res, next) {
    let userId = req.user._id;
    let noteId = req.params.note_id;
    let updateNote = {
      title: req.body.title,
      sub: req.body.sub,
      content: req.body.content,
      cateogry: req.body.cateogry,
    };
    for (let prop in updateNote) {
      if (updateNote[prop] === null || updateNote[prop] === undefined) {
        delete updateNote[prop];
      }
    }
    try {
      const note = await Note.updateOne({_id: noteId, writer: userId}, updateNote, { new: true });
      if (note) {
        return res.status(201).json({
          success: true,
          message: 'Nota editada con exito'
        });
      }
    } catch(err) {
      next(err);
    }
  }
}

export { UserController };