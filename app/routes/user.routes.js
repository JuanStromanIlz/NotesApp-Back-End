const user = require("../controllers/user.controller");
const isLoggedIn = require("../auth/session.auth");
const ac = require("../roles");

module.exports = app => {
    app.post("/createBooking", isLoggedIn, (req, res, next) => {
        const userRole = req.user[0].role;
        const clientId = req.user[0]._id;
        const dataBooking = req.body;
        const permission = ac.can(userRole).createOwn("event");
        if (permission.granted) { 
            user.createBooking(clientId,dataBooking);
        } else {
            res.redirect("/login")
        }
       
    });
    app.patch("/updateBooking", isLoggedIn, (req, res, next) => {
        const userRole = req.user[0].role;
        const clientId = req.user[0]._id;
        const updateBooking = req.body;
        const permission = ac.can(userRole).updateOwn("event");
        if (permission.granted) {
            user.updateBooking(clientId,updateBooking);
        } else {
            res.redirect("/login")
        }
       
    });
    app.delete("/deleteBooking", isLoggedIn, (req, res, next) => {
        const userRole = req.user[0].role;
        const clientId = req.user[0]._id;
        const deleteBooking = req.body._id;
        const permission = ac.can(userRole).deleteOwn("event");
        if (permission.granted) {
            user.deleteBooking(clientId, deleteBooking);
        } else {
            res.redirect("/login")
        }
       
    });
    app.post("/deleteAllBookings", isLoggedIn, (req, res, next) => {
        const userRole = req.user[0].role;
        const clientId = req.user[0]._id;
        const permission = ac.can(userRole).deleteOwn("event");
        if (permission.granted) {
            user.deleteUserBookings(clientId);
        } else {
            res.redirect("/login")
        }
        
    });
    app.get("/allBookings", isLoggedIn, (req, res, next) => {
        const userRole = req.user[0].role;
        const clientId = req.user[0]._id;
        const permission = ac.can(userRole).readOwn("event");
        if (permission.granted) {
            user.findAll(clientId);
        } else {
            res.redirect("/login")
        }
    
    });
    app.get("/Booking/:booking_id", isLoggedIn, (req, res, next) => {
        const userRole = req.user[0].role;
        const clientId = req.user[0]._id;
        const bookingId = req.params.booking_id;
        const permission = ac.can(userRole).readOwn("event");
        if (permission.granted) {
            user.findOne(clientId, bookingId);
        } else {
            res.redirect("/login")
        }
    
    });
}