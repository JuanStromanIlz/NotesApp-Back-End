module.exports = app => {
    const cumpleaño = require("../controllers/cumpleaños.controller");
    

    app.route("/")
    .get(cumpleaño.findAll)
    .post(cumpleaño.create)
    .delete(cumpleaño.deleteAll);

    app.route("/:id")
    .get(cumpleaño.findBySearch)
    .patch(cumpleaño.updateOne)
    .delete(cumpleaño.deleteOne);

};