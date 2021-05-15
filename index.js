import 'dotenv/config.js';
import express from 'express';
import session from 'express-session';
const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));


/* SESSION SETUP*/
app.set('trust proxy', 1);
app.use(session({ 
  secret: process.env.SESSION_SECRET,
  name: 'sessionId',
  resave: false,
  saveUninitialized: false,
  proxy: true,
  cookie: {
    httpOnly: false,
    secure: false,
    sameSite: 'none',
    domain: process.env.FRONTEND_HOST
  }
}));

/* MONGOOSE SETUP */

import { db } from './app/models/mongoose.js';

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

import passport from 'passport';
app.use(passport.initialize());
app.use(passport.session());

/* PASSPORT LOCAL AUTHENTICATION */

passport.use(db.users.createStrategy());
passport.serializeUser(db.users.serializeUser());
passport.deserializeUser(db.users.deserializeUser());

/* ROUTES */

import { welcomeTextAPI } from './app/default.notes.js';
import { router as userRoutes } from './app/routes/user.routes.js';
app.use('/user', userRoutes);
app.get('/', (req, res) => {
  res.json(welcomeTextAPI);
});


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})