module.exports = app => {
    const cumpleaño = require("../controllers/cumpleaños.controller");
    

    app.route("/")
    .get((req, res) => {
        res.render("login")
    })
    .post(cumpleaño.create)
    .delete(cumpleaño.deleteAll);

    app.route("/:id")
    .get(cumpleaño.findBySearch)
    .patch(cumpleaño.updateOne)
    .delete(cumpleaño.deleteOne);

};
