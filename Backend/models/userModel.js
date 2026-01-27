import mongoose from 'mongoose'

const { Schema } = mongoose;

const UserSchema = new Schema({
    username : {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        minlength: 3,
        maxlength: 9
    },
    password : {
        type: String,
        required: true,
        minlength: 8
    },
    firstName : {
        type: String,
        required: true,
        trim: true,
        maxlength: 9
    },
    lastName : {
        type: String,
        required: true,
        trim: true,
        maxlength: 9
    }
});

const User = mongoose.model("User", UserSchema);

module.exports = {
    User
}
