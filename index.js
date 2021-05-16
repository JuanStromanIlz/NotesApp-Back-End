import 'dotenv/config.js';
import express from 'express';
const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));

/* MONGOOSE SETUP */

import { db } from './app/models/mongoose.js';

db.mongoose
  .connect(db.route.online, {
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

import { passport } from './app/middleware/passport.auth.js';
app.use(passport.initialize());

/* CORS SETUP */

import cors from 'cors';

const corsOptions = {
  origin: [process.env.FRONTEND_HOST, 'http://localhost:3000/'],
  methods: ['GET', 'POST', 'PATCH', 'DELETE'],
  credentials: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

/* ROUTES */

import { welcomeTextAPI } from './app/config/default.notes.js';
import { router as userRoutes } from './app/routes/user.routes.js';
import { router as authRoutes } from './app/routes/auth.routes.js';
import { errorHandler } from './app/middleware/error.handler.js';

//WELCOME
app.get('/', (req, res) => {
  res.json(welcomeTextAPI);
});
//REGISTER, LOGIN
app.use('/', authRoutes);
//USER
app.use('/user', userRoutes);
app.use(errorHandler);

const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
  console.log(`Server runnig on port ${PORT}`);
});