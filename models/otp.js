const mongoose = require('mongoose');

const otpData = mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    }
});

module.exports = mongoose.model('OtpData',otpData);