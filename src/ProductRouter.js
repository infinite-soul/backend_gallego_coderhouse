const express = require('express');
const router = express.Router();
const ProductManager = require('./ProductManager');

const productManager = new ProductManager();

router.get('/', (req, res) => {
    const limit = req.query.limit; // Obtener el valor de 'limit' de la consulta

    let products = productManager.getAllProducts();

    if (limit) {
        products = products.slice(0, parseInt(limit)); // Limitar la cantidad de productos según el límite especificado
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

router.post('/', async (req, res) => {
    try {
        const newProduct = await productManager.createProduct(req.body);
        res.status(201).send({ status: 'success', payload: newProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
});

router.put('/:id', (req, res) => {
    try {
        const updatedProduct = productManager.updateProduct(parseInt(req.params.id), req.body);
        res.send({ status: 'success', payload: updatedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
});

router.delete('/:id', (req, res) => {
    try {
        const deletedProduct = productManager.deleteProduct(parseInt(req.params.id));
        res.send({ status: 'success', payload: deletedProduct });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'error', error: 'Error interno del servidor' });
    }
});

module.exports = router;
