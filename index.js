require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const session = require('express-session');
const cookieParser = require("cookie-parser");
const passport = require("passport");
const facebookStrategy = require("passport-facebook").Strategy;
const userController = require("./app/controllers/user.controller");
// const db = require("./app/models/mongoose");
// const User = db.users;

const bodyParser = require("body-parser");
const cors = require("cors");
const corsOptions = {
    origin: "http://localhost:3000",
    credentials: true
};


const app = express();
// app.use(cors(corsOptions));
// app.options('*', cors(corsOptions));

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/app/views')
app.set('view engine', 'ejs')
app.use(bodyParser.json());
app.use(cookieParser(process.env.SESSION_SECRET));
require("./app/auth/passport")(app);
// app.use(session({
//   name: 'Notes',
//   secret: process.env.SESSION_SECRET,
//   resave: true,
//   saveUninitialized: true
// }));

// app.use(passport.initialize());
// app.use(passport.session());

// passport.serializeUser(function (user, done) {
//   //this id correspond to User.facebookId
//     done(null, user.id);
// });

// passport.deserializeUser(function(id, done) {
//   User.find({facebookId: id}, function(err, user) {
//     done(err, user);
//   });
// });
// passport.use(
//   new facebookStrategy(
//     {
//       clientID: process.env.FACEBOOK_CLIENT_ID,
//       clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
//       callbackURL: process.env.FACEBOOK_CALLBACK_URL,
//       profileFields: ["id", "first_name", "last_name", "picture.type(large)", "email"]
//     },
//     function(accessToken, refreshToken, profile, done) {
//       const { id, first_name, last_name, picture, email } = profile._json;
//       const newUser = {
//         fName: first_name,
//         lName: last_name,
//         userPhoto: picture,
//         email: email,
//         facebookId: id
//       }
//       userController.createUser(newUser);
//       done(null, profile);
//     }
//   )
// )
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

  //llamar a las rutas
require("./app/routes/auth.routes")(app);
const user = require("./app/routes/user.routes");
app.use("/user", user);


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})