const mongoose = require("mongoose");

const events = require("./event.model");
const eventsSchema = events.eventsSchema;


const userSchema = new mongoose.Schema(
    {
        fName: String,
        lName: String,
        userPhoto: Object,
        email: String,
        bookings: [eventsSchema],
        facebookId: String

    }
);


module.exports = mongoose.model("users", userSchema);
    
