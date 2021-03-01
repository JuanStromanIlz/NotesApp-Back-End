const mongoose = require("mongoose");
const events = require("./event.model");

const userSchema = new mongoose.Schema(
    {
        fName: String,
        lName: String,
        userPhoto: Object,
        email: String,
        facebookId: String,
        role: String

    }
);


module.exports = mongoose.model("users", userSchema);
    
