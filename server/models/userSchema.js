const mongoose = require('mongoose'); 
const PassportLocalMongoose = require('passport-local-mongoose');

var userSchema = new mongoose.Schema({
    firstname:{
        type: String,
        required: true
    },
    lastname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: String,
        // required: true
    },
    avatar:{
        type: String
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    confirmationCode:{
        type: String,
        unique: true
    },
    confirResetPasswordCode:{
        type: String,
        unique: true
    },
    facebookId: String,
    googleId: String
},
{
    timestamps: true
}
);

userSchema.plugin(PassportLocalMongoose);

//Export the model
module.exports = mongoose.model('User', userSchema);