const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
       account: {
              type: String,
              require: true
       },
       password: {
              type: String,
              require: true
       },
       fullName: {
              type: String,
              require: true
       },
       sex: {
              type: String,
              require: true,
       },
       role: {
              type: String,
              require: true
       },
       address: {
              type: String,
              require: true
       },
       phoneNumber: {
              type: String,
              require: true
       },
       thumbnail: {
              type: String,
              default: null
       },
       cat_id: {
              type: mongoose.Types.ObjectId,
              ref: "ADMINS",
              require: true,
       }

});

module.exports = mongoose.model('USERS', usersSchema, 'users');