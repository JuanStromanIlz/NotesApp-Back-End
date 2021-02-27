const db = require("../models/mongoose");
const User = db.users;
const Event = db.events.eventModel;

module.exports.createUser = (userData) => {
    const isRegister = User.find({email: userData.email});

    if (isRegister) {
        console.log("Registrado")
    } else {
        const newUser = new User({
            fName: userData.fName,
            lName: userData.lName,
            userPhoto: userData.userPhoto,
            email: userData.email,
            bookings: [],
            facebookId: userData.facebookId 
        }).save();    
    }
    
}

module.exports.createBooking = (req, res) => {
    const userId = req.params.user_id;
    const booking = req.body;
    User.findOne({_id: userId})
    .then(data => {
        const newBooking = new Event({
            date: booking.date,
            schedule: booking.schedule,
            buyer: userId,
            sonNames: booking.sonNames,
            amount: booking.amout,
            obs: booking.obs
        });
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating event."
        })
    })
}