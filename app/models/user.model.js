const mongoose = require("mongoose");

const cumpleaños = require("./cumpleaño.model");
const cumpleañosSchema = cumpleaños.cumpleañosSchema;


const userSchema = new mongoose.Schema(
    {
        fName: String,
        lName: String,
        email: String,
        bookings: [cumpleañosSchema]

    }
);


module.exports = mongoose.model("users", userSchema);
    
