const user = require("../controllers/user.controller");
const isLoggedIn = require("../auth/session.auth");
const cors = require("cors");
const express = require("express");
const router = express.Router();
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};
router.use(cors(corsOptions));
router.options("*", cors(corsOptions));

router.get("/allNotes", isLoggedIn, user.allUserNotes);
router.get("/allCategories", user.allUserCategories);
router.get("/filterCategories", user.filterCategories);
router.post("/createNote", user.createNote);
router.get("/note/:note_id", user.findNote);
router.get("/noteSearch/:note", user.findBySearch);
router.patch("/updateNote", user.updateNote);
router.delete("/deleteNote/:note_id", user.deleteNote);
router.delete("/deleteAllNotes", user.deleteAllNotes);
router.get("/logOut", user.logOut);

module.exports = router;
