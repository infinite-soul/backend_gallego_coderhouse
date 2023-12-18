import { CartsModel } from "./models/cartModel.js";
import { TicketModel } from "./models/ticketModel.js";
import { ProductModel } from "./models/productModel.js";
import { UserModel } from "./models/userModel.js";


export const getCart = async () => {
    try {
        return await CartsModel.find({}).populate('products.ProductID');
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getCartById = async (id) => {
    try {
        return await CartsModel.findById(id).populate('products.ProductID');
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createCart = async () => {
    try {
        const newCart = await CartsModel.create({ products: [] });
        console.log('Carrito creado exitosamente');
        return newCart;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const saveProductToCart = async (id, productId) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);
        if (prodIsInCart) {
            prodIsInCart.quantity++;
        } else {
            cart.products.push({
                ProductID: productId,
                quantity: 1
            });
        }
        cart.markModified("products");
        await cart.save();
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteProductInCart = async (id, productId) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);
        if (prodIsInCart) {
            cart.products = cart.products.filter((prod) => prod.ProductID.toString() !== productId);
            await cart.save();
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const cleanCart = async (id) => {
    try {
        const cart = await CartsModel.findById(id);
        if (cart) {
            cart.products = [];
            await cart.save();
            console.log('Carrito vacío');
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateQuantityInCart = async (id, productId, quantity) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);
        if (prodIsInCart) {
            const productIndex = cart.products.findIndex((prod) => prod.ProductID.toString() === productId.toString());
            if (productIndex !== -1 && !Number.isNaN(quantity) && Number.isInteger(quantity) && quantity >= 0) {
                cart.products[productIndex].quantity = quantity;
                cart.markModified("products");
                await cart.save();
            }
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateCart = async (id, obj) => {
    try {
        const cart = await CartsModel.findById(id);
        if (cart) {
            cart.products = obj;
            cart.markModified('products');
            await cart.save();
        }
        return cart;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const generateTicket = async (userID, cartID) => {
    try {
        const userCart = await CartsModel.findById(cartID);
        if (userCart) {
            const productsNotPurchased = [];
            let totalAmount = 0;
            const purchasedProducts = [];
            for (const productItem of userCart.products) {
                const productID = productItem.ProductID;
                const quantityInCart = productItem.quantity;
                const productDB = await ProductModel.findById(productID);
                if (productDB && quantityInCart <= productDB.stock) {
                    const amount = quantityInCart * productDB.price;
                    totalAmount += amount;
                    productDB.stock -= quantityInCart;
                    await productDB.save();
                    purchasedProducts.push({
                        ProductID: productID,
                        quantity: quantityInCart,
                        price: productDB.price,
                    });
                } else {
                    productsNotPurchased.push(productID);
                }
            }
            if (totalAmount > 0) {
                const ticket = await TicketModel.create({
                    code: `${Math.random()}`,
                    purchase_datetime: new Date().toLocaleString(),
                    amount: totalAmount,
                    purchaser: userID,
                    products: purchasedProducts,
                });
                userCart.products = userCart.products.filter(productItem => productsNotPurchased.includes(productItem.ProductID));
                userCart.markModified('products');
                await userCart.save();
                const updatedUser = await UserModel.findOneAndUpdate(
                    { _id: userID },
                    { $push: { ticket: { TicketID: ticket.id } } },
                );
                return {
                    ticket,
                    productsNotPurchased,
                    user: updatedUser
                };
            } else {
                return {
                    ticket: null,
                    productsNotPurchased,
                };
            }
        } else {
            throw new Error('Carrito no encontrado');
        }
    } catch (error) {
        console.error(error);
        throw error;
    }
};

export const createCartTestMocks = async () => {
    try {
        const newCart = await CartsModel.create({});
        console.log('Carrito creado exitosamente');
        return newCart;
    } catch (error) {
        throw new Error(error.message);
    }
};
