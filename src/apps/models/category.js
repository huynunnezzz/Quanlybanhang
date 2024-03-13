const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    description:{
        type:String,
        default:null
    },
    title:{
        type:String,
        require:true
    },
    slug:{
        type:String,
        require:true
    },
});

module.exports = mongoose.model('Category', categorySchema, 'categories');