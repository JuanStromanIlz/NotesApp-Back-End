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
    let userId = req.user[0].facebookId;
    const newBooking = new Note({
        writer: userId,
        title: dataBooking.title,
        sub: dataBooking.sub,
        category: dataBooking.category,
        content: dataBooking.content
    }).save((err => {
        if(err) return err;
        res.send("nota creada")
    }));
}
//trae todos los posts
module.exports.allUserNotes = (req, res) => {
    let userId = req.user[0].facebookId;
    Note.find({writer: userId}, (err, data) => {
        if(err) res.send(err);
        res.send(data)
    });
}
//trae todas las categorias del usuario
module.exports.allUserCategories = (req, res) => {
    let userId = req.user[0].facebookId;
    Note.find({writer: userId},{category: 1, _id: 0}, (err, data) => {
        if(err) res.send(err);
        let allCates = data.map(note => note.category);
        let cleanCategories = [...new Set(allCates)];
        res.send(cleanCategories);
    });
}
//filtra por categorias 
module.exports.filterCategories = (req, res) => {
    let selectedFields = req.params.categories.split(',');
    let userId = req.user[0].facebookId;
    let optionsObject = selectedFields.map(value => { return {category: value} });
    Note.find({ writer: userId, $or : optionsObject }, (err, data) => {
        if(err) res.send(err);
        else res.send(data);
    });
}
//borra el post seleccionado
module.exports.deleteNote = (req, res) => {
    let userId = req.user[0].facebookId;
    let noteId = req.params.note_id;
    Note.deleteOne({_id: noteId, writer: userId}, err => {
        if(err) res.send(err);
        res.send({mensagge: "nota eliminada"})
    });
}
//trae un post especifico
module.exports.findNote = (req, res) => {
    let userId = req.user[0].facebookId;
    let noteId = req.params.note_id;
    Note.findOne({_id: noteId, writer: userId}, (err, data) => {
        if(err) res.send(err);
        else res.send(data);
    });
}
//guarda la edicion de un post especifico
module.exports.updateNote = (req, res) => {
    let userId = req.user[0].facebookId;
    let updateNote = req.body;
    Note.updateOne({_id: updateNote._id, writer: userId}, {$set: updateNote}, err => {
        if(err) res.send(err);
        else res.end();
    });
}
//borra todos los posts
module.exports.deleteAllNotes = (req, res) => {
    let userId = req.user[0].facebookId;
    Note.deleteMany({writer: userId}, err => {
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












