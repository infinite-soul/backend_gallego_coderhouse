function validateCreateFields(req, res, next) {
  const requiredFields = ['title', 'description', 'price', 'stock', 'category'];

  const hasMissingFields = requiredFields.some(field => !req.body[field]);
  if (hasMissingFields) {
    return res.status(400).send({ status: 'error', error: 'Faltan campos obligatorios' });
  }

  // Establecer thumbnails a un array vacío si no se proporciona
  if (!req.body.thumbnails) {
    req.body.thumbnails = [];
  }

  next();
}

function validateUpdateFields(req, res, next) {
  const { title, description, price, stock, category, thumbnails } = req.body;

  if (!title && !description && !price && !stock && !category && !thumbnails) {
    return res.status(400).send({ status: 'error', error: 'No hay campos para actualizar' });
  }

  next();
}

module.exports = {
  validateCreateFields,
  validateUpdateFields,
};
