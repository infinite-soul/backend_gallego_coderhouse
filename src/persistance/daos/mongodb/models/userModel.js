import { Schema, model } from "mongoose";

const cartSchemaID = new Schema({
    CartID: {
        type: Schema.Types.ObjectId,
        ref: "carts",
        required: true
    }
});

const ticketSchemaID = new Schema({
    TicketID: {
        type: Schema.Types.ObjectId,
        ref: "ticket",
        required: true
    }
});

const userSchema = new Schema({
    first_name: { type: String, required: true },
    last_name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, default: 0 },
    password: { type: String, required: true, default: "" },
    role: { type: String, default: 'user' },
    isGithub: { type: Boolean, default: false },
    cart: [{ type: cartSchemaID, required: true }],
    ticket: [{ type: ticketSchemaID, required: true }]
});

export const UserModel = model('user', userSchema);
