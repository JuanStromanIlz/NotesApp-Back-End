require('dotenv').config()
const express = require('express');
const cookieParser = require('cookie-parser');
const app = express();
app.use(express.json({limit: '20mb'}));
app.use(express.urlencoded({ extended: false, limit: '20mb' }));
app.use(cookieParser(process.env.SESSION_SECRET));
require('./app/auth/passport')(app);

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

//llamado a las rutas
const auth = require('./app/routes/auth.routes');
const user = require('./app/routes/user.routes');
app.use('/auth', auth);
app.use('/user', user);


const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})