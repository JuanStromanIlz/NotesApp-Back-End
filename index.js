require('dotenv').config()
const express = require("express");
const ejs = require("ejs");
const session = require('express-session');
const passport = require("passport");
const bodyParser = require("body-parser");
const cors = require("cors");


const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.set('views', __dirname + '/app/views')
app.set('view engine', 'ejs');
app.use(cors({
  origin: process.env.FRONTEND_HOST,
  credentials: true
}));
app.use(bodyParser.json());
require("./app/auth/passport")(app);

const db = require("./app/models/mongoose.js");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    preflightContinue: true
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
require("./app/routes/user.routes")(app);



const PORT = process.env.PORT || 8080;
app.listen(PORT, ()=>{
    console.log(`Server runnig on port ${PORT}`);
})