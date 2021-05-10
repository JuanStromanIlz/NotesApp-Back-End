const dbConfig = require('../config/db.config.js');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.online;
db.notes = require('./note.model.js');
db.users = require('./user.model.js');

module.exports = db;