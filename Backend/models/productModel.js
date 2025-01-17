

const knex = require('../mysql/connection');

const getAllProducts = () => {
    return knex('products').select('*');
};

const getProductById = (productId) => {
    return knex('products').where('product_id', productId).first();
};

const createProduct = (productData) => {
    return knex('products').insert(productData);
};

const updateProduct = (productId, productData) => {
    return knex('products').where('product_id', productId).update(productData);
};

const deleteProduct = (productId) => {
    return knex('products').where('product_id', productId).del();
};
const createProductToVendor = (productToVendorData) => {
  return knex('product_to_vendor').insert(productToVendorData);
};


module.exports = {
    getAllProducts,
    getProductById,
    createProduct,
    updateProduct,
    deleteProduct,
    createProductToVendor
};