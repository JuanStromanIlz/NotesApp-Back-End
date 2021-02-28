const db = require("../models/mongoose");
const User = db.users;
const Event = db.events.eventModel;

module.exports.createUser = (userData) => {
    User.find({email: userData.email})
    .then(data => {
       if (data.length === 0) {
            const newUser = new User({
                fName: userData.fName,
                lName: userData.lName,
                userPhoto: userData.userPhoto,
                email: userData.email,
                bookings: [],
                facebookId: userData.facebookId 
            }).save();     
       } else {
           console.log("Ya registrado")
       }
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating user."
        })
    });
    
}

module.exports.createBooking = (req, res) => {
    const userId = req.params.user_id;
    const booking = req.body;
    const newBooking = new Event({
        date: booking.date,
        schedule: booking.schedule,
        buyer: userId,
        sonNames: booking.sonNames,
        amount: booking.amout,
        obs: booking.obs
    }).save()
    .then(data => {
        
        res.send("Listo")
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating event."
        })
    });
}

module.exports.updateBooking = (req, res) => {
    const userId = req.params.user_id;
    const body = req.body;
    Event.updateOne({
            _id: body.id,
            buyer: userId
        }, {
            $set: req.body
        })
        .then(() => {
            res.send("Update doc");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating event."
            });
        });
}

module.exports.deleteBooking = (req, res) => {
    const userId = req.params.user_id;
    const bookingId = req.body.booking_id; 
    Event.deleteOne({_id: bookingId, buyer: userId})
    .then(data => {
        res.send("eliminado");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting event."
        })
    })
}

module.exports.deleteUserBookings = (req, res) => {
    const userId = req.params.user_id
    Event.deleteMany({buyer: userId})
    .then(() => {
        res.send("Delete all docs");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred during the delete"
        })
    })
}

module.exports.findAll = (req, res) => {
    const userId = req.params.user_id;
    Event.find({buyer: userId})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving event."
            });
        });
};