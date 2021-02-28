const user = require("../controllers/user.controller");
module.exports = app => {
    app.post("/createBooking/:user_id", user.createBooking);
    app.patch("/updateBooking/:user_id", user.updateBooking);
    app.delete("/deleteBooking/:user_id", user.deleteBooking);
    app.post("/deleteAllBookings/:user_id", user.deleteUserBookings);
    app.get("/allBookings/:user_id", user.findAll);
}