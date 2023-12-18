import fs from 'fs/promises';
import { resolve } from 'path';
const pathFile = resolve('db/carts.json');

const readCartFile = async () => {
  try {
    const data = await fs.readFile(pathFile, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    if (error.code === 'ENOENT') {
      return [];
    }
    throw error;
  }
};

const writeCartFile = async (data) => {
  await fs.writeFile(pathFile, JSON.stringify(data, null, 2));
};

export const getCart = async () => {
  try {
    const cart = await readCartFile();
    return cart;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const createCart = async () => {
  try {
    const carts = await readCartFile();
    const maxId = Math.max(...carts.map((cart) => cart.id), 0);

    const newCart = {
      id: maxId + 1,
      products: [],
    };

    carts.push(newCart);
    await writeCartFile(carts);

    return `El carrito ${newCart.id} se ha creado correctamente`;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getCartById = async (cartId) => {
  try {
    const carts = await readCartFile();
    const cart = carts.find((cart) => cart.id === cartId);

    if (cart) {
      return cart;
    } else {
      console.log(`El carrito ${cartId} no se ha encontrado`);
      return false;
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const saveProductToCart = async (cartId, productId) => {
  try {
    const carts = await readCartFile();
    const cartIndex = carts.findIndex((cart) => cart.id === cartId);

    if (cartIndex > -1) {
      const productIndex = carts[cartIndex].products.findIndex((product) => product.id === productId);

      if (productIndex > -1) {
        carts[cartIndex].products[productIndex].quantity++;
      } else {
        const newProduct = {
          id: productId,
          quantity: 1,
        };
        carts[cartIndex].products.push(newProduct);
      }

      await writeCartFile(carts);
      return carts;
    } else {
      return 'Error: ID del carrito no encontrado';
    }
  } catch (error) {
    console.error(error);
    throw error;
  }
};
