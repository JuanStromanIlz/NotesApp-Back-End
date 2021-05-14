import mongoose from 'mongoose';
import passportLocalMongoose from 'passport-local-mongoose';

const userSchema = new mongoose.Schema(
    {
        username: {type: String, required:true, unique:true},
        profileImg: {type: String, required:true, unique:true},
        email: {type: String, required:true, unique:true}
    }
);

userSchema.plugin(passportLocalMongoose);

const userModel = mongoose.model('users', userSchema);

export { userModel };
    
