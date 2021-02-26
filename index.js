require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const app = express();
//const axios = require("axios").default;
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");



app.set('views', __dirname + '/app/views')
app.set('view engine', 'ejs');

var corsOptions = {
  origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());
//app.use(express.static("public"));

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))

const db = require("./app/models/mongoose.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch(err => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
  ///user routes test
//   const userController = require ("./app/controllers/user.controller");  
//   app.get('/auth/facebook',
//   passport.authenticate('facebook'));

// app.get('/auth/facebook/callback',
//   passport.authenticate('facebook', { failureRedirect: '/login' }),
//   function(req, res) {
//     // Successful authentication, redirect home.
//     res.redirect('/');
//   });
  ///user routes test
const userRouter = require("./app/routes/user.routes");
app.use(userRouter);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})