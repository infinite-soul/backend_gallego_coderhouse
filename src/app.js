import express from 'express';
import { __dirname, mongoStoreParameters } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';
import MongoStore from 'connect-mongo';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import "./daos/mongodb/userDao.js";
import morgan from 'morgan';
import './daos/mongodb/conection.js';
import './passport/passport-local.js';
import './passport/passport-github.js';
import productRouter from './routes/productRoutes.js';
import cartRouter from './routes/cartRoutes.js';
import viewsRouter from './routes/viewsRoutes.js';
import userRouter from './routes/userRoutes.js';
import * as servChat from '../src/services/chatServices.js';
import { addProduct, deleteProduct, getProducts } from './daos/mongodb/productDao.js';
import passport from 'passport';
import 'dotenv/config'

// Constantes
const PORT = process.env.PORT;
const PUBLIC_DIR = __dirname + '/public';
const VIEWS_DIR = __dirname + '/views';

// Configuración de la aplicación
const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(PUBLIC_DIR));
app.use(errorHandler);
app.use(morgan('dev'));

// Configuración de Handlebars
app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', VIEWS_DIR);

app.use(cookieParser());
app.use(session(mongoStoreParameters));
app.use(passport.initialize());
app.use(passport.session());

// Rutas
app.use('/api/products', productRouter);
app.use('/api/cart', cartRouter);
app.use('/', viewsRouter);
app.use('/api/users', userRouter);

// Configuración del servidor y Socket.io
const httpServer = app.listen(PORT, () => console.log(`Servidor en el puerto ${PORT}`));
const socketServer = new Server(httpServer);

// Eventos de Socket.io
socketServer.on('connection', async (socket) => {
    // Eventos de conexión y desconexión
    console.log('Inicio de sesion', socket.id);
    socket.on('disconnect', () => console.log('Desconección', socket.id));

    // Eventos de chat
    socketServer.emit('messages', await servChat.getChatService());
    socket.on('chat:message', async (msg) => {
        await servChat.createService(msg);
        socketServer.emit('messages', await servChat.getChatService());
    });
    socket.on('chat:typing', (user) => socket.broadcast.emit('chat:typing', user));

    // Eventos de usuario
    socket.emit('msg', 'Bienvenido');
    socket.on('newUser', (user) => {
        console.log(`>${user} inició sesión`);
        socket.broadcast.emit('newUser', user);
    });
    socket.on('logout', () => {
        socketServer.user = null;
        socketServer.emit('logout');
    });

    // Eventos de productos
    socket.emit('allProducts', await getProducts());
    socket.on('newProduct', async (obj) => {
        await addProduct(obj);
        socket.emit('allProducts', await getProducts());
    });
    socket.on('deleteProduct', async (producto) => {
        await deleteProduct(Number(producto));
        socketServer.emit('allProducts', await getProducts());
    });
});
