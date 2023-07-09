const express = require('express');
const router = express.Router();
const ProductManager = require('./ProductManager');
const { validateFields } = require('./middlewares');

const productManager = new ProductManager();

router.get('/', (req, res) => {
    const limit = req.query.limit;

    let products = productManager.getAllProducts();

    if (limit) {
        products = products.slice(0, parseInt(limit));
    }

    res.send({ status: 'success', payload: products });
});

router.get('/:id', (req, res) => {
    const product = productManager.getProductById(parseInt(req.params.id));
    if (product) {
        res.send({ status: 'success', payload: product });
    } else {
        res.status(404).send({ status: 'error', error: 'Producto no encontrado' });
    }
});

router.post('/', validateFields, async (req, res) => {
    try {
        const newProduct = await productManager.createProduct(req.body);
        res.status(201).send({ status: 'success', payload: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
});

router.put('/:id', validateFields, (req, res) => {
    try {
        const updatedProduct = productManager.updateProduct(parseInt(req.params.id), req.body);
        res.send({ status: 'success', payload: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
});

module.exports = router;
