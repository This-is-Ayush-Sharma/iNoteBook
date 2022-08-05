const mongoose = require('mongoose');

exports.connectDB = ()=>{
    mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`,()=>{
        console.log("successfully connected to the database...");
    })
}