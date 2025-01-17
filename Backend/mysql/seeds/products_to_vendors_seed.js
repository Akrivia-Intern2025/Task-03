exports.seed = function (knex) {
  return knex('product_to_vendor')
    .del() // Delete existing entries
    .then(function () {
      return knex('product_to_vendor').insert([
        // Fruits Category Products
        { product_id: 1, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Apple
        { product_id: 1, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 2, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Banana
        { product_id: 2, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 3, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Orange
        { product_id: 3, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 4, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Strawberry
        { product_id: 4, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },

        // Vegetables Category Products
        { product_id: 5, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Carrot
        { product_id: 5, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 6, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Tomato
        { product_id: 6, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 7, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Spinach
        { product_id: 7, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },

        // Dairy Category Products
        { product_id: 8, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Milk
        { product_id: 8, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 9, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Cheese
        { product_id: 9, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 10, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Butter
        { product_id: 10, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },

        // Snacks Category Products
        { product_id: 11, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Chips
        { product_id: 11, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 12, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Cookies
        { product_id: 12, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 13, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Nuts
        { product_id: 13, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },

        // Beverages Category Products
        { product_id: 14, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Juice
        { product_id: 14, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 15, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Soda
        { product_id: 15, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 16, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Energy Drink
        { product_id: 16, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },

        // Additional Products
        { product_id: 17, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Pineapple
        { product_id: 17, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 18, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Cucumber
        { product_id: 18, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 19, vendor_id: 3, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Yogurt
        { product_id: 19, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() },
        { product_id: 20, vendor_id: 2, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }, // Chocolates
        { product_id: 20, vendor_id: 1, status: 1, created_at: knex.fn.now(), updated_at: knex.fn.now() }
      ]);
    });
};
