const mongoose = require('mongoose');

const adminsSchema = new mongoose.Schema({
    account:{
     type:String,
     require:true
    },
    password:{
     type:String,
     require:true
    },
    fullName:{
        type:String,
        require:true
       },
    sex:{
        type:String,
        requi:true,
    },
    address:{
        type:String,
        require:true
    },
    phoneNumber:{
        type:String,
        require:true
    },role:{
        type:String,
        require:true
       },
    
});

module.exports = mongoose.model('ADMINS', adminsSchema,'admin');