import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../daos/mongodb/productDao.js";


export const getProductsService = async (page, limit, sort, filter, filterValue) => {
    try {
        const response = await getProducts(page, limit, sort, filter, filterValue)
        return response
    } catch (error) {
        console.log(error);
    }
}

export const getProductByIdService = async (id) => {
    try {
        const item = await getProductById(id)
        if (!item) { return false; }
        else { return item }

    } catch (error) {
        console.log(error);
    }
}

export const addProductService = async (obj) => {
    try {
        const newProduct = await addProduct(obj)

        if (!newProduct) { return false; }
        else { return newProduct }

    } catch (error) {
        console.log(error);
    }
}

export const updateProductService = async (id, obj) => {
    try {
        const updateProd = await updateProduct(id, obj)

        return updateProd

    } catch (error) {
        console.log(error);
    }
}

export const deleteProductService = async (id) => {
    try {
        const deleteProd = await deleteProduct(id)
        return deleteProd

    } catch (error) {
        console.log(error);
    }
}
