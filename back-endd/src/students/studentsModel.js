//model
//coomment
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let studentsSchema = new Schema({

    name: {
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    }, 
    phone: {
        type: String,
        required: true
    }

});

module.exports = mongoose.model('students', studentsSchema);