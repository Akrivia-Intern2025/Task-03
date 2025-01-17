const knex = require('../mysql/connection');

const getAllCategories = () => {
  return knex('categories').select('*');
};

const getCategoryById = (categoryId) => {
  return knex('categories').where('category_id', categoryId).first();
};

const createCategory = (categoryData) => {
  return knex('categories').insert(categoryData);
};

const updateCategory = (categoryId, categoryData) => {
  return knex('categories').where('category_id', categoryId).update(categoryData);
};

const deleteCategory = (categoryId) => {
  return knex('categories').where('category_id', categoryId).del();
};

module.exports = {
  getAllCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
};