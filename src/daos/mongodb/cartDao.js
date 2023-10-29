import { CartsModel } from "./models/cartModel.js";

export const getCart = async () => {
    try {
        return await CartsModel.find({}).populate('products.ProductID');
    } catch (error) {
        console.log('Error al obtener el carrito:', error);
    }
}

export const getCartById = async (id) => {
    try {
        return await CartsModel.find({ _id: id }).populate('products.ProductID');
    } catch (error) {
        console.log('Error al obtener el carrito por ID:', error);
    }
}

export const createCart = async () => {
    try {
        const newCart = await CartsModel.create({ products: [] });
        console.log('Carrito creado exitosamente');
        return newCart;
    } catch (error) {
        console.log('Error al crear el carrito:', error);
    }
}

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
        console.log('Producto añadido al carrito exitosamente');
        return cart;
    } catch (error) {
        console.log('Error al añadir producto al carrito:', error);
    }
}

export const deleteProductInCart = async (id, productId) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);

        if (prodIsInCart) {
            cart.products = cart.products.filter((prod) => prod.ProductID.toString() !== productId);
            await cart.save();
            console.log('Producto eliminado del carrito exitosamente');
            return cart;
        } else {
            console.log('Error: El producto no se encontró en el carrito');
            return cart;
        }
    } catch (error) {
        console.log('Error al eliminar producto del carrito:', error);
    }
}

export const cleanCart = async (id) => {
    try {
        const cart = await CartsModel.findById(id);

        if (cart) {
            cart.products = [];
            await cart.save();
            console.log('Carrito vaciado exitosamente');
            return cart;
        } else {
            console.log('Error: carrito no encontrado');
            return null;
        }
    } catch (error) {
        console.log('Error al vaciar el carrito:', error);
    }
}

export const updateQuantityInCart = async (id, productId, quantity) => {
    try {
        const cart = await CartsModel.findOne({ _id: id });
        const prodIsInCart = cart.products.find((prod) => prod.ProductID.toString() === productId);

        if (prodIsInCart) {
            const productIndex = cart.products.findIndex((prod) => prod.ProductID.toString() === productId.toString());
            if (productIndex === -1) {
                throw new Error('Producto no encontrado en el carrito');
            }

            if (!Number.isNaN(quantity) && Number.isInteger(quantity) && quantity >= 0) {
                cart.products[productIndex].quantity = quantity;
                cart.markModified("products");
                await cart.save();
                console.log('Cantidad del producto actualizada exitosamente');
            } else {
                console.log('Valor de cantidad no válido');
            }
        } else {
            console.log('Producto no encontrado. Imposible actualizar la cantidad');
        }

        return cart;
    } catch (error) {
        console.log('Error al actualizar la cantidad del producto en el carrito:', error);
    }
}

export const updateCart = async (id, obj) => {
    try {
        const cart = await CartsModel.findById(id);

        if (!cart) {
            throw new Error('Carrito no encontrado');
        }

        cart.products = obj;
        cart.markModified('products');
        await cart.save();
        console.log('Carrito actualizado exitosamente');
        return cart;
    } catch (error) {
        console.log('Error al actualizar el carrito:', error);
    }
}
