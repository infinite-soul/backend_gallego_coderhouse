const express = require('express');
const handlebars = require('express-handlebars');
const path = require('path');
const http = require('http');
const socketIO = require('socket.io');
const ProductManager = require('./ProductManager.js');
const productRouter = require('./ProductRouter.js');
const fs = require('fs').promises;
const configDB = require("./db/configDB.js");



const app = express();
const server = http.createServer(app);
const io = socketIO(server);
const productManager = new ProductManager();

app.use(express.json());
app.use(express.urlencoded({ extended: true }))


app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'views'));


app.use('/api/products', productRouter);

app.get('/', async (req, res) => {
  let allProducts = await productManager.getAllProducts();
  res.render('home', {
    title: 'Express Avanzado | Handlebars',
    products: allProducts,
  });
});

app.get('/realtimeproducts', async (req, res) => {
  let allProducts = await productManager.getAllProducts();
  res.render('realTimeProducts', {
    title: 'Real-Time Products',
    products: allProducts,
  });
});

let productsLoaded = false; 
let productsFileWatcher = null; 


async function loadProductsFromFile() {
  try {
    const fileData = await fs.readFile('products.json', 'utf8');
    productManager.setProducts(JSON.parse(fileData));

    if (productsLoaded) {
      io.emit('updateProducts', productManager.getAllProducts());
    } else {
      productsLoaded = true;
    }
  } catch (error) {
    console.error('Error al cargar los productos desde el archivo:', error);
  }
}

function watchProductsFile() {
  productsFileWatcher = fs.watch('./products.json', { persistent: false }, (eventType, filename) => {
    if (eventType === 'change') {
      console.log('Se detectó un cambio en el archivo products.json');
      loadProductsFromFile(); // Volver a cargar los productos desde el archivo
    }
  });
}

loadProductsFromFile();

io.on('connection', (socket) => {
  console.log('Cliente conectado');

  socket.emit('updateProducts', productManager.getAllProducts());


  socket.on('createProduct', async (product) => {
    await productManager.createProduct(product);

    io.emit('updateProducts', productManager.getAllProducts());
  });

  socket.on('deleteProduct', async (productId) => {
    await productManager.deleteProduct(productId);

    io.emit('updateProducts', productManager.getAllProducts());
  });

  socket.on('disconnect', () => {
    console.log('Cliente desconectado');
  });
});


const PORT = 8080;
server.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});


process.on('exit', () => {
  if (productsFileWatcher) {
    productsFileWatcher.close();
  }
});
