const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required:true, unique:true},
        photo: String,
        email: {type: String, required:true, unique:true}
    }
);

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('users', userSchema);
    
