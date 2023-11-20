import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const cartSchema = new Schema({
    CartID: {
        type: Schema.Types.ObjectId,
        ref: 'carts',
        required: true,
    },
}, { _id: false });

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, required: true, default: 0 },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    isGithub: { type: Boolean, default: false },
    cart: { type: [cartSchema], default: [] },
}, { timestamps: true });

export const UserModel = model('user', userSchema);
