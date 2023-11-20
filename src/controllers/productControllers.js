import { getUserByID } from "../daos/mongodb/userDao.js";
import * as service from "../services/productServices.js";

const renderPage = (pageName) => async (req, res, next) => {
  try {
    res.render(pageName);
  } catch (error) {
    console.error('Error al renderizar la página:', error.message);
    next(error);
  }
};

export const getproduct = async (req, res, next) => {
  try {
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getProductsService(
      page,
      limit,
      sort,
      filter,
      filterValue
    );

    res.status(200).json({
      info: {
        status: "success",
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: !!response.hasPrevPage,
        nextPage: !!response.hasNextPage,
        page: response.page,
        hasPrevPage: !!response.hasPrevPage,
        hasNextPage: !!response.hasNextPage,
        prevLink: response.hasPrevPage ? `http://localhost:8080/api/products?page=${response.prevPage}` : null,
        nextLink: response.hasNextPage ? `http://localhost:8080/api/products?page=${response.nextPage}` : null,
      },
    });
  } catch (error) {
    console.error('Error al obtener el producto:', error.message);
    next(error);
  }
};

export const getproductPaginate = async (req, res, next) => {
  try {
    const { page, limit, sort, filter, filterValue } = req.query;
    const response = await service.getProductsService(
      page,
      limit,
      sort,
      filter,
      filterValue
    );

    const productsMap = response.docs.map((product) => product.toObject());
    const user = (await getUserByID(req.session.passport.user)).toObject();

    if (req.session) {
      res.status(200).render("products", {
        productsMap,
        hasPrevPage: !!response.hasPrevPage,
        hasNextPage: !!response.hasNextPage,
        nextPage: response.hasNextPage ? `http://localhost:8080/products?page=${response.nextPage}` : null,
        prevPage: response.hasPrevPage ? `http://localhost:8080/products?page=${response.prevPage}` : null,
        limit,
        page,
        totalPages: response.totalPages,
        products: response.docs,
        user,
      });
    } else {
      res.render("login");
    }
  } catch (error) {
    console.error('Error al paginar el producto:', error.message);
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getProductByIdService(id);

    if (!product) {
      res.status(404).json({ message: "Producto no encontrado" });
    } else {
      res.status(200).json({ message: product });
    }
  } catch (error) {
    console.error('Error al obtener el producto por ID:', error.message);
    next(error);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = await service.addProductService(req.body);
    if (!product) {
      res.status(404).json({ message: "Error al crear el producto" });
    } else {
      res.status(200).json(product);
    }
  } catch (error) {
    console.error('Error al agregar el producto:', error.message);
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const productUpdated = await service.updateProductService(id, req.body);
    res.json(productUpdated);
  } catch (error) {
    console.error('Error al actualizar el producto:', error.message);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProd = await service.deleteProductService(id);
    res.status(200).json(deletedProd);
  } catch (error) {
    console.error('Error al eliminar el producto:', error.message);
    next(error);
  }
};
