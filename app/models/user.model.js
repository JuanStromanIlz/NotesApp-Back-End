const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
    {
        fName: String,
        lName: String,
        userPhoto: Object,
        email: String,
        facebookId: String
    }
);


module.exports = mongoose.model("users", userSchema);
    
