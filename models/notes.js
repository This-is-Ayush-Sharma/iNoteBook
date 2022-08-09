const mongoose = require('mongoose');

const notes = mongoose.Schema({
    email:{
        type:String,
        require:true
    },
    title:{
        type:String,
        require:true
    },
    body:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model("notes",notes);