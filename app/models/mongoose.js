import mongoose from 'mongoose';
import { dbConfig } from '../config/db.config.js';
import { userModel } from './user.model.js';
import { noteModel } from './note.model.js';

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = dbConfig.online;
db.notes = noteModel;
db.users = userModel;

export { db };