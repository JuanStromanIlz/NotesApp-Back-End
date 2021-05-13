const db = require('../models/mongoose');
const defaultNotes = require('../default.notes');
const passport = require('passport');
const User = db.users;
const Note = db.notes.noteModel;
const fs = require('fs');

/* CONTROLADORES PARA LAS RUTAS DE USUARIOS */
 
//REGISTRO
module.exports.register = (req, res) => {
    newUser = new User({email: req.body.email, username : req.body.username, profileImg: req.file.path})
    User.register(newUser, req.body.password, function(err, user) {
    if (err) {
        res.json({success:false, message:'Ocurrio un error al intentar registrar al usuario', err});
    }else{
        //Creacion de las notas por defecto
        defaultNotes.notes.map(note => {
            new Note({
                writer: user._id,
                title: note.title.replace('/USER_NAME/', user.username),
                sub: note.sub,
                category: note.category,
                content: note.content
            }).save();
        });
        res.json({success: true,  message:'Usuario creado con exito'});
    }
    });
}
//LOGIN
module.exports.login = (req, res) => {
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
module.exports.getUserInfo = (req, res) => {
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
module.exports.createNote = (req, res) => {
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
//GET ALL NOTES
module.exports.allUserNotes = (req, res) => {
    let userId = req.user._id;
    Note.find({writer: userId}, null, {sort: { updatedAt : -1 }}, (err, data) => {
        if (!err) {
            res.json({success: true, data: data});
        }else{
            res.json({success: false, message: 'Ocurrio un error al intentar buscar la informacion solicitada', err});
        }
    });
}
//GET ALL CATEGORIES
module.exports.allUserCategories = (req, res) => {
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
//DELETE NOTE
module.exports.deleteNote = (req, res) => {
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
module.exports.updateNote = (req, res) => {
    let userId = req.user._id;
    let updateNote = req.body;
    Note.updateOne({_id: updateNote._id, writer: userId}, {$set: updateNote}, err => {
        if (!err) {
            res.json({success: true, message: 'Nota editada con exito'});
        }else{
            res.json({success: false, message: 'Ocurrio un error al intentar guardar la edicion de esta archivo', err});
        }
    });
}
//DELETE USER
module.exports.deleteUser = (req, res) => {
    let userId = req.user._id;
    Note.deleteMany({writer: userId}, err => {
        if (!err) {
            User.deleteOne({_id: userId}, err => {
                if (!err) {
                    fs.unlink(req.user.profileImg, err => {
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
module.exports.logOut = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('sessionId');
        }else{
            res.json({success: false, message:'Ocurrio un error al intentar cerrar la sesion', err});
        }
    });
}












