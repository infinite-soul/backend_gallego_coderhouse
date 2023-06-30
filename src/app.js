const express = require('express');
const app = express();
const productRouter = require('./ProductRouter');
const cartRouter = require('./CartRouter');
const PORT = 8080;

app.use(express.json());

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);

app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
