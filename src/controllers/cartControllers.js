import * as cartService from '../services/cartServices.js';
import { getUserByID } from "../persistance/daos/mongodb/userDaoMongo.js";
import { HttpResponse } from "../utils/http.response.js";
import error from "../utils/errors.dictionary.js";

const httpResponse = new HttpResponse();

const sendHttpResponse = (res, data, errorMessage) => {
    if (!data) {
        return httpResponse.NotFound(res, errorMessage);
    }
    return httpResponse.Ok(res, data);
};

export const getCart = async (req, res, next) => {
    try {
        const data = await cartService.getCartService();
        sendHttpResponse(res, { 'cart ': data }, error.CART_NOT_FOUND);
    } catch (error) {
        next(error.message);
    }
};

export const getCartById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await cartService.getCartByIdService(id);
        sendHttpResponse(res, { cart }, error.CART_NOT_FOUND);
    } catch (error) {
        next(error.message);
    }
};

export const createCart = async (req, res, next) => {
    try {
        const cart = await cartService.createCartService();
        sendHttpResponse(res, { cart }, error.CART_NOT_CREATED);
    } catch (error) {
        next(error.message);
    }
};

export const saveProductToCart = async (req, res, next) => {
    try {
        const { id, productId } = req.params;
        const cart = await cartService.saveProductToCartService(id, productId);
        sendHttpResponse(res, { cart }, error.CART_NOT_UPDATED);
    } catch (error) {
        next(error.message);
    }
};

export const deleteProductInCart = async (req, res, next) => {
    try {
        const { id, productId } = req.params;
        const cart = await cartService.deleteProductInCartService(id, productId);
        sendHttpResponse(res, { cart }, error.CART_NOT_DELETED);
    } catch (error) {
        next(error.message);
    }
};

export const cleanCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const cart = await cartService.cleanCartService(id);
        sendHttpResponse(res, { cart }, error.CART_NOT_EMPTIED);
    } catch (error) {
        next(error.message);
    }
};

export const updateQuantityInCart = async (req, res, next) => {
    try {
        const { id, productId } = req.params;
        const { quantity } = req.body;
        const cart = await cartService.updateQuantityInCartService(id, productId, quantity);
        sendHttpResponse(res, { cart }, error.CART_NOT_UPDATED);
    } catch (error) {
        next(error.message);
    }
};

export const updateCart = async (req, res, next) => {
    try {
        const { id } = req.params;
        const obj = req.body;
        const cart = await cartService.updateCartService(id, obj);
        sendHttpResponse(res, { cart }, error.CART_NOT_UPDATED);
    } catch (error) {
        next(error.message);
    }
};

export const generateTicket = async (req, res, next) => {
    try {
        const user = await getUserByID(req.user);
        if (!user) {
            return httpResponse.NotFound(res, error.USER_NOT_FOUND);
        }

        const { id } = req.params;
        const cartID = id ? id : user.cart[0].CartID;
        const userID = user.id;

        const ticket = await cartService.generateTicketService(userID, cartID);
        sendHttpResponse(res, ticket, error.TICKET_NOT_CREATED);
    } catch (error) {
        console.log(error);
        next(error.message);
    }
};
