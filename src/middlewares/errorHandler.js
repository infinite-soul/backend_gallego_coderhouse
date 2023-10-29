export const errorHandler = (error, req, res, next) => {
    console.log(`${error.message}`);
    const status = error.status || 404


    const filePath = path.join(__dirname, 'data', 'products.json');

    res.status(status).send(error.message)
}
