exports.seed = function (knex) {
  // Reset the auto-increment counter for categories
  return knex.raw('ALTER TABLE categories AUTO_INCREMENT = 1')
    .then(function () {
      // Delete dependent products first to avoid foreign key constraint error
      return knex('products').del();
    })
    .then(function () {
      // Delete categories after products
      return knex('categories').del();
    })
    .then(function () {
      // Insert seed data
      return knex('categories').insert([
        { category_id: 1, category_name: 'Fruits', created_at: knex.fn.now(), description: 'Fresh fruits like apples, bananas, oranges, and berries', status: 1, updated_at: knex.fn.now() },
        { category_id: 2, category_name: 'Vegetables', created_at: knex.fn.now(), description: 'Fresh and organic vegetables including leafy greens, carrots, and tomatoes', status: 1, updated_at: knex.fn.now() },
        { category_id: 3, category_name: 'Dairy', created_at: knex.fn.now(), description: 'Dairy products such as milk, cheese, yogurt, and butter', status: 1, updated_at: knex.fn.now() },
        { category_id: 4, category_name: 'Snacks', created_at: knex.fn.now(), description: 'Packaged and ready-to-eat snacks like chips, nuts, and cookies', status: 1, updated_at: knex.fn.now() },
        { category_id: 5, category_name: 'Beverages', created_at: knex.fn.now(), description: 'Drinks like juices, soft drinks, energy drinks, and bottled water', status: 1, updated_at: knex.fn.now() }
      ]);
    });
};
