const mongoose = require('mongoose');
const { Schema, model } = mongoose;

const cartsSchema = new Schema(
    {
        products: {
            type: [
                {
                    productId: { type: mongoose.Schema.Types.ObjectId, ref: "products" },
                    quantity: Number,
                },
            ],
            required: true,
        },
    },
);

const cartsModel = model('Carts', cartsSchema);

module.exports = { cartsModel };