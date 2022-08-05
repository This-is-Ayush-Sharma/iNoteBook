const mongoose = require('mongoose');

const UserData = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true
    },
    firstName:{
        type:String,
        required:true,
    },
    lastName:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    status:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('UserData',UserData);