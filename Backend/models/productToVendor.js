const knex = require('../mysql/connection');

const createProductToVendor = (productToVendorData) => {
  return knex('product_to_vendor').insert(productToVendorData);
};

const updateProductToVendor = (productId, productToVendorData) => {
  return knex('product_to_vendor')
    .where('product_id', productId)
    .update(productToVendorData);
};

module.exports = {
  createProductToVendor,
  updateProductToVendor,
};