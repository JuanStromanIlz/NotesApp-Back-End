const db = require("../models/mongoose");
const Event = db.events.eventModel;
//CRUD de la collection events

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Completar todos los campos!"
        });
        return;
    }

    // Create a Event
    const event = new Event({
        date: req.body.date,
        schedule: req.body.schedule,
        buyer: "objetExample",
        sonNames: req.body.sonNames,
        amount: req.body.amout,
        obs: req.body.obs
    });

    // Save Event in the database
    event
        .save(event)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating event."
            });
        });
};

exports.findAll = (req, res) => {

    Event.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving event."
            });
        });
};

exports.findBySearch = (req, res) => {
    let searchedWord = req.body.searchedWord;
    let searchOptions = {
        $language: "none",
        $diacriticSensitive : false,
        $caseSensitive:false
    }
    Event.find({ $text : { $search: searchedWord , ...searchOptions } })
    .then(data => {
        if (data.length === 0) {
            res.send("Ningun resultado coincide");
        } else {
            res.send(data);
        }
        
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Error en la busqueda"
        });
    });
}

exports.updateOne = (req, res) => {
    let body = req.body;
    Event.updateOne({
            _id: body.id
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

exports.deleteOne = (req, res) => {
    let body = req.body;
    Event.deleteOne({
        _id: body.id
    })
    .then(() => {
        res.send("Deleted doc");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred during the delete"
        })
    })
}

exports.deleteAll = (req, res) => {
    Event.deleteMany({})
    .then(() => {
        res.send("Delete all docs");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred during the delete"
        })
    })
}