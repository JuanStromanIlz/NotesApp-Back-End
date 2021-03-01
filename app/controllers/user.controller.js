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
                facebookId: userData.facebookId,
                role: "client"
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

module.exports.createBooking = (clientId, dataBooking) => {
    const newBooking = new Event({
        date: dataBooking.date,
        schedule: dataBooking.schedule,
        buyer: clientId,
        sonNames: dataBooking.sonNames,
        amount: dataBooking.amout,
        obs: dataBooking.obs
    }).save()
    .then(() => {
        
        res.send("Listo")
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating event."
        })
    });
}

module.exports.updateBooking = (clientId, updateBooking) => {
    Event.updateOne({
            _id: updateBooking.id,
            buyer: clientId
        }, {
            $set: updateBooking
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

module.exports.deleteBooking = (clientId, bookingId) => {
    Event.deleteOne({_id: bookingId, buyer: clientId})
    .then(data => {
        res.send("eliminado");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while deleting event."
        })
    })
}

module.exports.deleteUserBookings = (clientId) => {
    Event.deleteMany({buyer: clientId})
    .then(() => {
        res.send("Delete all docs");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred during the delete"
        })
    })
}

module.exports.findAll = (clientId) => {
    Event.find({buyer: clientId})
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving event."
            });
        });
};

module.exports.findOne = (clientId, bookingId) => {
    Event.findOne({_id: bookingId, buyer: clientId})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving event."
        });
    });
}