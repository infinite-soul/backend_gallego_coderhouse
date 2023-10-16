const path = require('path');
const { dirname } = require('dirname');
const { fileURLToPath } = require('url');

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

module.exports = __dirname;
