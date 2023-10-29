import { cleanCart, createCart, deleteProductInCart, getCart, getCartById, saveProductToCart, updateCart, updateQuantityInCart } from "../daos/mongodb/cartDao.js";


export const getCartService = async () => {

    try {
        const cart = await getCart()
        return cart
    } catch (error) {
        console.log(error);
    }

}

export const getCartByIdService = async (id) => {

    try {
        const cart = await getCartById(id)
        if (!cart) { return false; }
        else { return cart; }
    } catch (error) {
        console.log(error);
    }

}

export const createCartService = async () => {

    try {
        const cart = await createCart()
        if (!cart) { return false; }
        else { return true; }
    } catch (error) {
        console.log(error);
    }

}

export const saveProductToCartService = async (id, productId) => {

    try {
        const cart = await saveProductToCart(id, productId)
        return cart
    } catch (error) {
        console.log(error);
    }

}


export const deleteProductInCartService = async (id, productId) => {

    try {
        const cart = await deleteProductInCart(id, productId)

        return cart

    } catch (error) {
        console.log(error);
    }

}



export const cleanCartService = async (id) => {

    try {
        const cart = await cleanCart(id)
        return cart
    } catch (error) {
        console.log(error);
    }
}


export const updateQuantityInCartService = async (id, productId, quantity) => {

    try {
        const cart = await updateQuantityInCart(id, productId, quantity);
        return cart
    } catch (error) {
        console.log(error);
    }

}



export const updateCartService = async (id, obj) => {

    try {
        const cart = await updateCart (id, obj);
        return cart
    } catch (error) {
        console.log(error);
    }

}