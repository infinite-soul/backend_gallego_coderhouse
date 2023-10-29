import * as service from "../services/productServices.js";

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
    const nextPage = response.hasNextPage
      ? `http://localhost:8080/api/products?page=${response.nextPage}`
      : null;
    const prevPage = response.hasPrevPage
      ? `http://localhost:8080/api/products?page=${response.prevPage}`
      : null;
    const existHasPrevPage = response.hasPrevPage ? true : false;
    const existHasNextPage = response.hasNextPage ? true : false;
    const existPrevLink = prevPage ? true : false;
    const existNextLink = nextPage ? true : false;

    res.status(200).json({
      info: {
        status: "success",
        payload: response.docs,
        totalPages: response.totalPages,
        prevPage: existPrevLink,
        nextPage: existNextLink,
        page: response.page,
        hasPrevPage: existHasPrevPage,
        hasNextPage: existHasNextPage,
        prevLink: prevPage,
        nextLink: nextPage,
      },
    });
  } catch (error) {
    next(error.message);
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
    const nextPage = response.hasNextPage
      ? `http://localhost:8080/products?page=${response.nextPage}`
      : null;
    const prevPage = response.hasPrevPage
      ? `http://localhost:8080/products?page=${response.prevPage}`
      : null;
    const existHasPrevPage = response.hasPrevPage ? true : false;
    const existHasNextPage = response.hasNextPage ? true : false;

    const userExists = await req.session.email;

    const userName = await req.session.user.first_name
    const userLastName = await req.session.user.last_name
    const userEmail = await req.session.user.email
    const userAge = await req.session.user.age

    
    const products = response.docs

    const productsMap = products.map((product) => product.toObject());

    if (userExists) {
      res.status(200)
      .render ("products", {
        productsMap,
        hasPrevPage : existHasPrevPage ,
        hasNextPage : existHasNextPage,
        nextPage,
        prevPage,
        limit,
        page,
        totalPages : response.totalPages,
        products,
        userExists,
        userName,
        userLastName,
        userAge,
        userEmail
      }) ;
    } else {
      res.render("login");
    }
  } catch (error) {
    next(error.message);
  }
};


export const getProductById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.getProductByIdService(id);

    if (!product) res.status(404).json({ message: "No se encontró el producto" });
    else res.status(200).json({ message: product });
  } catch (error) {
    next(error.message);
  }
};

export const addProduct = async (req, res, next) => {
  try {
    const product = await service.addProductService(req.body);
    if (!product) res.status(404).json({ message: "No se pudo crear el producto" });
    else res.status(200).json(product);
  } catch (error) {
    next(error.message);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    const productUpdated = await service.updateProductService(id, req.body);
    res.json(productUpdated);
  } catch (error) {
    next(error.message);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedProd = await service.deleteProductService(id);
    res.status(200).json(deletedProd);
  } catch (error) {
    next(error.message);
  }
};
