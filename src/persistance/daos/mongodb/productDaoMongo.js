import { ProductModel } from "./models/productModel.js";
import { fakerES_MX as faker } from "@faker-js/faker";
import { ProductModelMocks } from "./models/productModel_Mocks.js";

const DEFAULT_LIMIT = 10;
const DEFAULT_PAGE = 1;
const DEFAULT_SORT = 1;

export const getProducts = async (page = DEFAULT_PAGE, limit = DEFAULT_LIMIT, sort = DEFAULT_SORT, filter, filterValue) => {
    try {
        const filterOptions = filter && filterValue ? { [filter]: { $regex: filterValue, $options: 'i' } } : {};

        const sortOptions = sort === 'desc' ? -1 : 1;
        const sortField = sort === 'desc' ? '-price' : 'price';

        const options = {
            limit,
            page,
            sort: { [sortField]: sortOptions }
        };

        const response = await ProductModel.paginate(filterOptions, options);
        return response;
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getProductById = async (id) => {
    try {
        return await ProductModel.findById(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const addProduct = async (obj) => {
    try {
        return await ProductModel.create(obj);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const updateProduct = async (id, obj) => {
    try {
        return await ProductModel.findByIdAndUpdate(id, obj, { new: true });
    } catch (error) {
        throw new Error(error.message);
    }
};

export const deleteProduct = async (id) => {
    try {
        return await ProductModel.findByIdAndDelete(id);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const createProductsMock = async (cant = 100) => {
    try {
        const products = [];

        for (let i = 0; i < cant; i++) {
            const data = {
                title: faker.commerce.productName(),
                description: faker.commerce.productDescription(),
                code: faker.commerce.isbn(),
                price: parseInt(faker.commerce.price()),
                stock: Math.floor(Math.random() * 99),
                category: faker.commerce.department(),
                thumbnails: faker.image.avatar()
            };

            products.push(data);
        }

        // Regresa la lista de productos para uso local
        return products;
        // Registra en MongoDB directamente si es necesario
        // return await ProductModelMocks.create(products);
    } catch (error) {
        throw new Error(error.message);
    }
};

export const getProductsMocks = async () => {
    try {
        return await ProductModelMocks.find({});
    } catch (error) {
        throw new Error(error.message);
    }
};
