import fs from 'fs';
import { __dirname } from '../utils.js';

const pathFile = `${__dirname}/db/products.json`;

const readFile = async (path) => {
  try {
    if (fs.existsSync(path)) {
      const data = await fs.promises.readFile(path, 'utf8');
      return JSON.parse(data);
    } else {
      return [];
    }
  } catch (error) {
    throw error;
  }
};

const writeFile = async (path, data) => {
  try {
    await fs.promises.writeFile(path, JSON.stringify(data));
  } catch (error) {
    throw error;
  }
};

export const addProduct = async ({ title, description, price, thumbnails, code, status, category, stock }) => {
  try {
    if (!title || !description || !price || !thumbnails || !status || !category || !stock) {
      throw new Error('Faltan datos obligatorios');
    }

    const checkProduct = await checkCode(code);
    if (checkProduct === 'OK') {
      const maxId = await getMaxID();
      const product = {
        id: maxId + 1,
        title,
        description,
        code,
        price,
        status,
        stock,
        category,
        thumbnails,
      };

      const productFile = await getProducts();
      productFile.push(product);
      await writeFile(pathFile, productFile);

      return `Se creó el producto ${code} con éxito`;
    } else {
      throw new Error(`No es posible crear el producto ${code} porque ya existe`);
    }
  } catch (error) {
    throw error;
  }
};

export const updateProduct = async (id, { title, description, price, thumbnails, code, status, category, stock }) => {
  try {
    const products = await getProducts();
    const productToUpdate = products.find((product) => product.id === id);

    if (!productToUpdate) {
      throw new Error(`No existe el producto ${id}`);
    }

    productToUpdate.title = title || productToUpdate.title;
    productToUpdate.description = description || productToUpdate.description;
    productToUpdate.price = price || productToUpdate.price;
    productToUpdate.thumbnails = thumbnails || productToUpdate.thumbnails;
    productToUpdate.code = code || productToUpdate.code;
    productToUpdate.status = status || productToUpdate.status;
    productToUpdate.category = category || productToUpdate.category;
    productToUpdate.stock = stock || productToUpdate.stock;

    const updatedProducts = products.map((product) => (product.id === id ? productToUpdate : product));

    await writeFile(pathFile, updatedProducts);

    return `Se actualizó el producto ${id}`;
  } catch (error) {
    throw error;
  }
};

export const getProductById = async (productId) => {
  try {
    const products = await getProducts();
    const product = products.find((product) => product.id === productId);

    if (!product) {
      throw new Error(`El ID del producto ${productId} no existe`);
    }

    return product;
  } catch (error) {
    throw error;
  }
};

export const getProducts = async () => {
  try {
    return await readFile(pathFile);
  } catch (error) {
    throw error;
  }
};

export const getMaxID = async () => {
  try {
    const products = await getProducts();
    return products.reduce((maxId, product) => Math.max(maxId, product.id), 0);
  } catch (error) {
    throw error;
  }
};

export const checkCode = async (codeProduct) => {
  try {
    const products = await getProducts();
    return products.some((product) => product.code === codeProduct) ? 'Error' : 'OK';
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id) => {
  try {
    const products = await getProducts();
    const productToDelete = products.find((product) => product.id === id);

    if (!productToDelete) {
      throw new Error(`El ID del producto ${id} no existe`);
    }

    const updatedProducts = products.filter((product) => product.id !== id);
    await writeFile(pathFile, updatedProducts);

    return `Producto con ID ${id} eliminado`;
  } catch (error) {
    throw error;
  }
};

export const deleteFile = async (pathFile) => {
  try {
    await fs.promises.unlink(pathFile);
    return `El archivo ${pathFile} ha sido eliminado.`;
  } catch (error) {
    throw error;
  }
};
