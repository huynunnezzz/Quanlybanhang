const mongoose = require('mongoose');

const rolesSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    display: {
        type: String,
        require: true
    }
});

module.exports = mongoose.model('ROLES', rolesSchema, 'roles');