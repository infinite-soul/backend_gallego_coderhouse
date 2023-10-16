const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const productsSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    stock:{
        type: Number,
        default: 0
    },
    description:{
        type: String,
    },
});

const productsModel = model('Products', productsSchema);

module.exports = { productsModel };
