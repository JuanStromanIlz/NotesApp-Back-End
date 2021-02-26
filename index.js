require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const app = express();
//const axios = require("axios").default;
const session = require("express-session");
const passport = require("passport");
const passportLocalMongoose = require("passport-local-mongoose");
const FacebookStrategy = require('passport-facebook').Strategy;
const bodyParser = require("body-parser");
const cors = require("cors");
const routes = require('./app/routes/loginFacebook.routes');


app.set('views', __dirname + '/app/views')
app.set('view engine', 'ejs');

var corsOptions = {
  origin: "http://localhost:8081"
};

// app.use(cors(corsOptions));

// app.use(bodyParser.json());
// //app.use(express.static("public"));

// // parse requests of content-type - application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }))

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function (user, cb) {
  cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
  cb(null, obj);
});






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
 
//require("./app/routes/cumpleaños.routes")(app);
app.use('/', routes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})