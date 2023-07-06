const express = require('express');
const exphbs = require('express-handlebars');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');
const handlebars = require('express-handlebars');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Configuración de Handlebars
app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars', 'views', path.join(__dirname, 'views'));



// Rutas
app.get('/', (req, res) => {
    res.render('home');
});

app.get('/realtimeproducts', (req, res) => {
    res.render('realTimeProducts');
});

// Conexión de socket.io
io.on('connection', (socket) => {
    console.log('Cliente conectado');

    // Emitir la lista de productos al cliente
    socket.emit('products', products);

    // Escuchar eventos del cliente
    socket.on('createProduct', (product) => {
        // Lógica para crear un nuevo producto
        products.push(product);

        // Emitir la lista de productos actualizada a todos los clientes
        io.emit('products', products);
    });

    socket.on('deleteProduct', (productId) => {
        // Lógica para eliminar un producto
        products = products.filter((product) => product.id !== productId);

        // Emitir la lista de productos actualizada a todos los clientes
        io.emit('products', products);
    });
});

const PORT = 8080;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});