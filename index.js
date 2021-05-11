require('dotenv').config()
const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser(process.env.SESSION_SECRET));

/* SESSION SETUP*/

app.use(session({ 
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
}));

/* MONGOOSE SETUP */

const db = require('./app/models/mongoose.js');
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log('Connected to the database!');
  })
  .catch(err => {
    console.log('Cannot connect to the database!', err);
    process.exit();
  });
  
/* PASSPORT SETUP */

const passport = require('passport');

app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(db.users.createStrategy());

passport.serializeUser(db.users.serializeUser());
passport.deserializeUser(db.users.deserializeUser());

/* ROUTES */

const user = require('./app/routes/user.routes');
app.use('/user', user);


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})