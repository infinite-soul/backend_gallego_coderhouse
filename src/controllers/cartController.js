const cartManager = require('../dao/fileSystem/CartManager');

async function handleRequest(asyncFunction) {
    return async (req, res, next) => {
        try {
            const result = await asyncFunction(req);
            res.status(200).json({ message: result });
        } catch (error) {
            next(error);
        }
    };
}

async function addProductToCart(req) {
    const { cid, pid } = req.params;
    return cartManager.addProductToCart(cid, pid, req.body.quantity);
}

async function createCart(req) {
    return cartManager.create(req.body);
}

async function getProductsOfCart(req) {
    const { cid } = req.params;
    const cart = await cartManager.getById(cid);
    return cart.products;
}

async function deleteProductFromCart(req) {
    const { cid, pid } = req.params;
    return cartManager.deleteProductFromCart(cid, pid);
}

async function deleteCart(req) {
    const { cid } = req.params;
    return cartManager.deleteProductsFromCart(cid);
}

async function updateProductOfCart(req) {
    const { cid, pid } = req.params;
    return cartManager.updateProductOfCartById(cid, pid, req.body.quantity);
}

async function updateProductsOfCart(req) {
    const { cid } = req.params;
    return cartManager.updateById(cid, req.body);
}

module.exports = {
    addProductToCart: handleRequest(addProductToCart),
    createCart: handleRequest(createCart),
    getProductsOfCart: handleRequest(getProductsOfCart),
    deleteProductFromCart: handleRequest(deleteProductFromCart),
    deleteCart: handleRequest(deleteCart),
    updateProductOfCart: handleRequest(updateProductOfCart),
    updateProductsOfCart: handleRequest(updateProductsOfCart),
};
