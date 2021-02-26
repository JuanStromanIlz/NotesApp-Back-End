const db = require("../models/mongoose");
const Cumpleaño = db.cumpleaños.cumpleañoModel;
//CRUD de la collection cumpleaños

exports.create = (req, res) => {
    // Validate request
    if (!req.body.title) {
        res.status(400).send({
            message: "Completar todos los campos!"
        });
        return;
    }

    // Create a Cumpleaño
    const cumpleaño = new Cumpleaño({
        date: req.body.date,
        schedule: req.body.schedule,
        buyer: "objetExample",
        sonNames: req.body.sonNames,
        amount: req.body.amout,
        obs: req.body.obs
    });

    // Save Cumpleaño in the database
    cumpleaño
        .save(cumpleaño)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while creating cumpleaño."
            });
        });
};

exports.findAll = (req, res) => {

    Cumpleaño.find()
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving cumpleaño."
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
    Cumpleaño.find({ $text : { $search: searchedWord , ...searchOptions } })
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
    Cumpleaño.updateOne({
            _id: body.id
        }, {
            $set: req.body
        })
        .then(() => {
            res.send("Update doc");
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while updating cumpleaño."
            });
        });
}

exports.deleteOne = (req, res) => {
    let body = req.body;
    Cumpleaño.deleteOne({
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
    Cumpleaño.deleteMany({})
    .then(() => {
        res.send("Delete all docs");
    })
    .catch(err => {
        res.status(500).send({
            message: err.message || "Some error ocurred during the delete"
        })
    })
}