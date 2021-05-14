import { db } from '../models/mongoose.js';
import { defaultNotes } from '../default.notes.js';
import { uploader } from '../config/cloudinary.config.js';
import passport from 'passport';
const User = db.users;
const Note = db.notes;

/* CONTROLADORES PARA LAS RUTAS DE USUARIOS */
class UserController {
    //REGISTRO
    register(req, res, next) {
        User.register(new User({username : req.body.username, email: req.body.email, profileImg: res.locals.image}), req.body.password, function(err, user) {
            if (!err) {
                //Creacion de las notas por defecto
                defaultNotes.map(note => {
                    new Note({
                        writer: user._id,
                        title: note.title.replace('/USER_NAME/', user.username),
                        sub: note.sub,
                        category: note.category,
                        content: note.content
                    }).save();
                });
                //Se pasa al controlador login para iniciar la sesion en un mismo paso
                next();
            }else{
                res.json({success:false, message:'Ocurrio un error al intentar registrar al usuario', err});   
            }
        });
    }
    //LOGIN
    login(req, res) {
        passport.authenticate('local', (err, user, info) => {
            if (err) {
                res.json({success:false, message:'Ocurrio un error al intentar loguear al usuario', err});
            }
            if (!user) {
                res.json({success:false, message:'Alguno de los datos proporcionados es incorrecto', info});
            }
            req.logIn(user, function(err) {
            if (!err) {
                res.json({success:true, message: 'El usuario se loggeo satisfactoriamente'});
            }else{
                res.json({success:false, message:'Ocurrio un error al intentar loguear al usuario', err});
            }
                
            });
        })(req, res);
    }
    //USER INFO
    getUserInfo(req, res) {
        let userId = req.user._id;
        User.findOne({_id: userId}, (err, data) => {
            if (!err) {
                Note.find({writer: userId}, (err, notes) => {
                    if (!err) {   
                        let userNotes = notes.length;
                        let userObj = {
                            username: data.username,
                            email: data.email,
                            profileImg: data.profileImg,
                            notes: userNotes
                        }
                        res.json({success: true, data: userObj});
                    }else{
                        res.json({success: false, message: 'Ocurrio un error al intentar buscar la informacion solicitada', err});
                    }
                });
            }else{
                res.json({success: false, message: 'Ocurrio un error al intentar buscar la informacion solicitada', err});
            }
        });
    }
    //NEW NOTE
    newNote(req, res) {
        let userId = req.user._id;
        let note = req.body;
        new Note({
            writer: userId,
            title: note.title,
            sub: note.sub,
            category: note.category,
            content: note.content
        }).save((err => {
            if (!err) {
                res.json({success: true, message: 'Nota creada con exito'});
            }else{
                res.json({success: false, message: 'Ocurrio un error al intentar crear la nota', err});
            }
        }));
    }
    //GET ALL NOTES FROM USER
    allUserNotes(req, res) {
        let userId = req.user._id;
        Note.find({writer: userId}, null, {sort: { updatedAt : -1 }}, (err, data) => {
            if (!err) {
                res.json({success: true, data: data});
            }else{
                res.json({success: false, message: 'Ocurrio un error al intentar buscar la informacion solicitada', err});
            }
        });
    }
    //GET SINGLE NOTE
    getById(req, res) {
        let userId = req.user._id;
        let noteId = req.params.note_id;
        Note.findOne({_id: noteId, writer: userId}, (err, data) => {
            if (!err) {
                res.json({success: true, data: data});
            }else{
                res.json({success: false, message: 'Ocurrio un error al intentar buscar la informacion solicitada', err});
            }
        });
    }
    //DELETE NOTE
    deleteNote(req, res) {
        let userId = req.user._id;
        let noteId = req.params.note_id;
        Note.deleteOne({_id: noteId, writer: userId}, err => {
            if (!err) {
                res.json({success: true, mesagge: 'Nota eliminada con exito'});
            }else{
                res.json({success: false, message: 'Ocurrio un error al intentar eliminar el documento seleccionado', err});
            }
        });
    }
    //SAVE NOTE EDIT    
    updateNote(req, res) {
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
        Note.updateOne({_id: noteId, writer: userId}, updateNote, { new: true }, err => {
            if (!err) {
                res.json({success: true, message: 'Nota editada con exito'});
            }else{
                res.json({success: false, message: 'Ocurrio un error al intentar guardar la edicion de esta archivo', err});
            }
        });
    }
    //GET ALL CATEGORIES FROM USER
    allUserCategories(req, res) {
        let userId = req.user._id;
        Note.find({writer: userId},{category: 1, _id: 0}, (err, data) => {
            if (!err) {
                let allCates = data.map(note => note.category);
                let cleanCategories = [...new Set(allCates)];
                res.json({success: true, data: cleanCategories});
            }
            else {
                res.json({success: false, message: 'Ocurrio un error al intentar buscar la informacion solicitada', err});
            }
        });
    }
    //DELETE USER
    deleteUser(req, res) {
        let userId = req.user._id;
        let profileImgHosted = req.user.profileImg;
        Note.deleteMany({writer: userId}, err => {
            if (!err) {
                User.deleteOne({_id: userId}, err => {
                    if (!err) {
                        uploader.destroy(profileImgHosted, (err, result) => {
                            if (!err) {
                                res.json({success: true, message: 'Usuario eliminado con exito'});
                            }else{
                                res.json({success: false, message: 'Ocurrio un error al intentar eliminar el usuario'});
                            }
                        });
                    }else{
                        res.json({success: false, message:'Ocurrio un error al intentar eliminar el usuario', err});
                    }
                });
            }else{
                res.json({success: false, message:'Ocurrio un error al intentar eliminar el usuario', err});
            }
        });
    }
    //LOGOUT
    logOut(req, res) {
        req.logout();
        req.session.destroy((err) => {
            if (!err) {
                res.clearCookie('sessionId');
            }else{
                res.json({success: false, message:'Ocurrio un error al intentar cerrar la sesion', err});
            }
        });
    }
}

export { UserController };










