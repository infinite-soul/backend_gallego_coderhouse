import * as service from '../services/cartServices.js'
import { getUserByID } from "../persistance/daos/mongodb/userDao.js";
import { createResponse } from "../utils.js";

export const getCart = async (req,res,next) => {

    try {        
        const data = await service.getCartService()
        res.status(200).json(data)
    } catch (error) {
        next(error.message)
    }
}


export const getCartById = async (req,res,next) => {

    try {
        const { id } = req.params
        const cart = await service.getCartByIdService (id)
        if (!cart) res.status(404).json ({ message: 'Carrito no encontrado'})
        else res.status(200).json (cart)
    } catch (error) {
        next(error.message)
    }
}


export const createCart = async (req,res,next) => {

    try {

        const cart = await service.createCartService ()
        if (!cart) req.status(404).json({ message: 'Falló la creación del carrito' })
        else res.status(200).json ({ message: 'Carrito creado'})
        
    } catch (error) {
        next(error.message)
    }
}


export const saveProductCart = async (req,res,next) => {

    try {        
        const { id, productId } = req.params
        const cart = await service.saveProductCartService ( id, productId )
        res.status(200).json({ message: 'Producto guardado'})
    } catch (error) {
        next(error.message)
    }
}


export const deleteProductCart = async (req,res,next) => {

    try {
        const { id, productId } = req.params
        const cart = await service.deleteProductCartService (id, productId)
        res.status(200).json({ message: 'Producto eliminado', cart})
    } catch (error) {
        next(error.message)
    }
}


export const cleanCart = async (req, res, next) => {

    try {        
        const {id} = req.params        
        const cart = await service.cleanCartService (id)
        res.status(200).json({ message: 'Carrito vaciado', cart})
    } catch (error) {
        next(error.message)
    }
}


export const updateQuantityCart = async (req,res,next) => {

    try {
        
        const { id, productId } = req.params
        const { quantity } = req.body
        const cart = await service.updateQuantityCartService ( id, productId, quantity )
        res.status(200).json({ message: 'Producto guardado', 'cart': cart})
    } catch (error) {
        next(error.message)
    }
}


export const updateCart = async (req,res,next) => {

    try {
        
        const { id } = req.params
        const obj = req.body;
        const cart = await service.updateCartService ( id, obj )
        res.status(200).json({ message: 'Producto guardado', 'cart': cart})
    } catch (error) {
        next(error.message)
    }
}

export const generateReceipt = async (req, res, next) => {
    try {
        const user = await getUserByID(req.user);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const userID = user.id;
        const cartID = user.cart[0].CartID;
        console.log('userID = ' + userID);
        console.log('cartID = ' + cartID);

        const receipt = await service.generateReceiptService(userID, cartID);
        if (!receipt) {
            return res.status(404).json({ message: 'Error generando el recibo' });
        }

        res.status(200).json(receipt);

    } catch (error) {
        console.log(error);
        next(error.message);
    }
}
