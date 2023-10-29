import { ProductModel } from "./models/productModel.js";

export const getProducts = async (page = 1, limit = 10, sort, filter, filterValue) => {
    try {
        const filterOptions = filter && filterValue ? { [filter]: { $regex: filterValue, $options: 'i' } } : {};

        const sortOptions = sort === 'desc' ? -1 : 1;

        const options = {
            limit: limit,
            page: page,
            sort: sort === 'desc' ? { price: -1 } : { price: 1 },
            ...filterOptions,
        };

        const response = await ProductModel.paginate({}, options);

        console.log('productDao ok');
        return response;
    } catch (error) {
        console.log(error);
    }
};

export const getProductById = async (id) => {
    try {
        const response = await ProductModel.findById(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const addProduct = async (obj) => {
    try {
        const response = await ProductModel.create(obj);
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const updateProduct = async (id, obj) => {
    try {
        const response = await ProductModel.findByIdAndUpdate(id, obj, { new: true });
        return response;
    } catch (error) {
        console.log(error);
    }
}

export const deleteProduct = async (id) => {
    try {
        const response = await ProductModel.findByIdAndDelete(id);
        return response;
    } catch (error) {
        console.log(error);
    }
}
