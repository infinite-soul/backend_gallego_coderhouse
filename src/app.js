const express = require('express');
const ProductManager = require('./ProductManager'); 

const app = express();
const productManager = new ProductManager();

app.get('/products', async (req, res) => {
    try {
        const limit = req.query.limit; 

        if (limit) {
            const products = productManager.getProducts().slice(0, limit); 
            res.json(products);
        } else {
            const products = productManager.getProducts(); 
            res.json(products);
        }
    } catch (error) {
        res.status(500).json({ error: 'Error tecnico' });
    }
});


app.get('/products/:pid', async (req, res) => {
    try {
        const pid = parseInt(req.params.pid); 
        const product = productManager.getProductById(pid); 

        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Excepción: El producto no existe' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error tecnico' });
    }
});


const port = 8080;
app.listen(port, () => {
    console.log(`Servidor Express escuchando en el puerto ${port}`);
});
