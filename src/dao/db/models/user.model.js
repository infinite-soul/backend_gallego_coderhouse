const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const usersSchema = new Schema({
    first_name:{
        type: String,
        required: true
    },
    last_name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
});

const usersModel = model('Users', usersSchema);

module.exports = { usersModel };
