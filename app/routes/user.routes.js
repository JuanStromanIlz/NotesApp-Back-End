const user = require("../controllers/user.controller");
const isLoggedIn = require("../auth/session.auth");
const db = require("../models/mongoose");
const User = db.users;

module.exports = app => {
    app.get("/allNotes", user.allUserNotes);
    app.post("/createNote", user.createNote);
    app.get("/note/:note_id", user.findNote);
    app.get("/noteSearch/:note", user.findBySearch);
    app.patch("/updateNote", user.updateNote);
    app.delete("/deleteNote/:note_id", user.deleteNote);
    app.delete("/deleteAllNotes", user.deleteAllNotes);
    app.get("/logOut", user.logOut);
}