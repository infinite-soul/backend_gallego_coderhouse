const moongose = require('mongoose');

const URI = "mongodb+srv://lordchingzo:coderhouse@product.n09ozpk.mongodb.net/?retryWrites=true&w=majority"

moongose.connect(URI)
    .then(() => console.log("Se conecta a mongodb"))
    .catch((error) => console.log(error));