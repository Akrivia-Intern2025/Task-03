const knex = require('../mysql/connection');

const getAllVendors = () => {
  return knex('vendors').select('*');
};

const getVendorById = (vendorId) => {
  return knex('vendors').where('vendor_id', vendorId).first();
};

const createVendor = (vendorData) => {
  return knex('vendors').insert(vendorData);
};

const updateVendor = (vendorId, vendorData) => {
  return knex('vendors').where('vendor_id', vendorId).update(vendorData);
};

const deleteVendor = (vendorId) => {
  return knex('vendors').where('vendor_id', vendorId).del();
};

module.exports = {
  getAllVendors,
  getVendorById,
  createVendor,
  updateVendor,
  deleteVendor,
};