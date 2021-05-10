const db = require('../models/mongoose');
const defaultNotes = require('../default.notes');
const User = db.users;
const Note = db.notes.noteModel;
//Crea un nuevo usuario
module.exports.createUser = (req, res) => {
    User.find({email: req.email}, (err, data) => {
        if (err) return err
        data.length === 0 &&
        new User({
            fName: req.fName,
            lName: req.lName,
            userPhoto: req.userPhoto,
            email: req.email,
            facebookId: req.facebookId
        }).save(err => {
            if(!err) {
                //Creacion de las notas por defecto
                defaultNotes.notes.map(note => {
                    new Note({
                        writer: req.facebookId,
                        title: note.title.replace('/USER_NAME/', req.fName),
                        sub: note.sub,
                        category: note.category,
                        content: note.content
                    }).save();
                });
            }
        });
    });
}
//Devuelve el perfil del usuario
module.exports.getUserInfo = (req, res) => {
    let [ user ] = req.user;
    let userId = user.facebookId;
    User.findOne({facebookId: userId}, (err, data) => {
        if (!err) {
            Note.find({writer: userId}, (err, notes) => {
                if (!err) {   
                    let userNotes = notes.length;
                    let userObj = {
                        fName: data.fName,
                        lName: data.lName,
                        email: data.email,
                        photo: data.userPhoto.data.url,
                        notes: userNotes
                    }
                    res.send(userObj)
                }
            });
        }
    });
}
//Crea un nuevo post
module.exports.createNote = (req, res) => {
    let dataBooking = req.body;
    let [ user ] = req.user;
    let userId = user.facebookId;
    const newBooking = new Note({
        writer: userId,
        title: dataBooking.title,
        sub: dataBooking.sub,
        category: dataBooking.category,
        content: dataBooking.content
    }).save((err => {
        if (err) res.send(err);
    }));
}
//Trae todos los posts
module.exports.allUserNotes = (req, res) => {
    let [ user ] = req.user;
    let userId = user.facebookId;
    Note.find({writer: userId}, null, {sort: { updatedAt : -1 }}, (err, data) => {
        if (err) res.send(err);
        res.send(data)
    });
}
//Trae todas las categorias del usuario
module.exports.allUserCategories = (req, res) => {
    let [ user ] = req.user;
    let userId = user.facebookId;
    Note.find({writer: userId},{category: 1, _id: 0}, (err, data) => {
        if (!err) {
            let allCates = data.map(note => note.category);
            let cleanCategories = [...new Set(allCates)];
            res.send(cleanCategories);
        }
        else {
            res.send(err);
        }
    });
}
//Borra el post seleccionado
module.exports.deleteNote = (req, res) => {
    let [ user ] = req.user;
    let userId = user.facebookId;
    let noteId = req.params.note_id;
    Note.deleteOne({_id: noteId, writer: userId}, err => {
        if (!err) {
            res.send({mensagge: 'nota eliminada'});
        }
        else {
            res.send(err);
        }
    });
}
//Guarda la edicion de un post especifico
module.exports.updateNote = (req, res) => {
    let [ user ] = req.user;
    let userId = user.facebookId;
    let updateNote = req.body;
    Note.updateOne({_id: updateNote._id, writer: userId}, {$set: updateNote}, err => {
        if (!err) {
            res.send({mensagge: 'nota actualizada'});
        }
        else {
            res.send(err);
        }
    });
}
//Borra toda la info del usuario
module.exports.deleteUser = (req, res) => {
    let [ user ] = req.user;
    let userId = user.facebookId;
    Note.deleteMany({writer: userId}, err => {
        if (!err) {
            User.deleteOne({facebookId: userId}, err => {
                if (!err) {
                    res.send({mensagge: 'usuario eliminado'});
                }
                else {
                    res.send(err);
                }
            });
        }
        else {
            res.send(err);
        }
    });
}
//Cierra la session del usuario
module.exports.logOut = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        if (!err) {
            res.clearCookie('connect.sid');
        }
        else {
            res.send(err);
        }
    });
}












