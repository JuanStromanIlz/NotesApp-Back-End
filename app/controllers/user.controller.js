const db = require("../models/mongoose");
const User = db.users;
const Note = db.notes.noteModel;
require('dotenv').config()

//crea un nuevo usuario
module.exports.createUser = (req) => {
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
            if(err) return err;
        });
    });
}
//crea un nuevo post
module.exports.createNote = (req, res) => {
    let dataBooking = req.body;
    let clientId = process.env.USER_ID;
    const newBooking = new Note({
        writer: userId,
        title: dataBooking.title,
        sub: dataBooking.sub,
        category: dataBooking.category,
        content: dataBooking.content
    }).save((err => {
        if(err) return err;
    }));
}
//trae todos los posts
module.exports.allUserNotes = (req, res) => {
    let userId = process.env.USER_ID;
    Note.find({buyer: userId}, (err, data) => {
        if(err) res.send(err);
        res.send(data)
    });
}
//borra el post seleccionado
module.exports.deleteNote = (req, res) => {
    let clientId = process.env.USER_ID;
    let noteId = req.params.note_id;
    Note.deleteOne({_id: noteId, buyer: clientId}, err => {
        if(err) res.send(err);
    });
}
//trae un post especifico
module.exports.findNote = (req, res) => {
    let clientId = process.env.USER_ID;
    let noteId = req.params.note_id;
    Note.findOne({_id: noteId, buyer: clientId}, (err, data) => {
        if(err) res.send(err);
        else res.send(data);
    });
}
//guarda la edicion de un post especifico
module.exports.updateNote = (req, res) => {
    let clientId = process.env.USER_ID;
    let updateNote = req.body;
    Note.updateOne({_id: updateNote.id, buyer: clientId}, {$set: updateNote}, err => {
        if(err) res.send(err);
    });
}
//borra todos los posts
module.exports.deleteAllNotes = (req, res) => {
    let clientId = process.env.USER_ID;
    Note.deleteMany({buyer: clientId}, err => {
        if(err) res.send(err);
    });
}
//busca personalizada de posts
module.exports.findBySearch = (req, res) => {
    let searchedWord = req.params.note;
    let query = { $or: [
        { "title" : { $regex: new RegExp(searchedWord, "i")}},
        { "sub" : { $regex: new RegExp(searchedWord, "i")}},
        { "content" : { $regex: new RegExp(searchedWord, "i")}},
        { "category" : { $regex: new RegExp(searchedWord, "i")}}
    ]};
    Note.find(query, (err, data) => {
        if(err) res.send(err)
        res.send(data);
    });
}
//cierra la session del usuario
module.exports.logOut = (req, res) => {
    req.logout();
    req.session.destroy((err) => {
        res.clearCookie('connect.sid');
        res.redirect(`${process.env.FRONTEND_HOST}`);
    });
}












