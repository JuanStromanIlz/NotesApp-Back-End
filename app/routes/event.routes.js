module.exports = app => {
    const event = require("../controllers/event.controller");
    

    app.route("/event")
    .get(event.findAll)
    .post(event.create)
    .delete(event.deleteAll);

    app.route("event/:id")
    .get(event.findBySearch)
    .patch(event.updateOne)
    .delete(event.deleteOne);

};
