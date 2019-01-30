const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    fname: {
        type: String
    },
    lname: {
        type: String
    },
    age: {
        type: Number
    },
    pass: {
        type: String
    },
    email: {
        type: String
    }
},{ collection: 'Users' });

module.exports = mongoose.model('Users', usersSchema);