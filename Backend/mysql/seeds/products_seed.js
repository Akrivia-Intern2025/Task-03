
exports.seed = function (knex) {
  return knex('products')
    .del() // Delete existing entries
    .then(function () {
      return knex('products').insert([
        // Fruits Category Products
        { 
          product_id: 1, 
          product_name: 'Apple', 
          category_id: 1, 
          quantity_in_stock: 100, 
          unit_price: 30.00, 
          product_image: 'apple.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 piece' 
        },
        { 
          product_id: 2, 
          product_name: 'Banana', 
          category_id: 1, 
          quantity_in_stock: 150, 
          unit_price: 20.00, 
          product_image: 'banana.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 bunch' 
        },
        { 
          product_id: 3, 
          product_name: 'Orange', 
          category_id: 1, 
          quantity_in_stock: 120, 
          unit_price: 25.00, 
          product_image: 'orange.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 piece' 
        },
        { 
          product_id: 4, 
          product_name: 'Strawberry', 
          category_id: 1, 
          quantity_in_stock: 80, 
          unit_price: 40.00, 
          product_image: 'strawberry.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 pack' 
        },

        // Vegetables Category Products
        { 
          product_id: 5, 
          product_name: 'Carrot', 
          category_id: 2, 
          quantity_in_stock: 200, 
          unit_price: 15.00, 
          product_image: 'carrot.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 kg' 
        },
        { 
          product_id: 6, 
          product_name: 'Tomato', 
          category_id: 2, 
          quantity_in_stock: 180, 
          unit_price: 18.00, 
          product_image: 'tomato.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 kg' 
        },
        { 
          product_id: 7, 
          product_name: 'Spinach', 
          category_id: 2, 
          quantity_in_stock: 120, 
          unit_price: 25.00, 
          product_image: 'spinach.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 bunch' 
        },

        // Dairy Category Products
        { 
          product_id: 8, 
          product_name: 'Milk', 
          category_id: 3, 
          quantity_in_stock: 300, 
          unit_price: 25.00, 
          product_image: 'milk.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 liter' 
        },
        { 
          product_id: 9, 
          product_name: 'Cheese', 
          category_id: 3, 
          quantity_in_stock: 100, 
          unit_price: 100.00, 
          product_image: 'cheese.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '200 grams' 
        },
        { 
          product_id: 10, 
          product_name: 'Butter', 
          category_id: 3, 
          quantity_in_stock: 80, 
          unit_price: 50.00, 
          product_image: 'butter.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '100 grams' 
        },

        // Snacks Category Products
        { 
          product_id: 11, 
          product_name: 'Chips', 
          category_id: 4, 
          quantity_in_stock: 120, 
          unit_price: 10.00, 
          product_image: 'chips.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 pack' 
        },
        { 
          product_id: 12, 
          product_name: 'Cookies', 
          category_id: 4, 
          quantity_in_stock: 90, 
          unit_price: 15.00, 
          product_image: 'cookies.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 pack' 
        },
        { 
          product_id: 13, 
          product_name: 'Nuts', 
          category_id: 4, 
          quantity_in_stock: 60, 
          unit_price: 50.00, 
          product_image: 'nuts.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 pack' 
        },

        // Beverages Category Products
        { 
          product_id: 14, 
          product_name: 'Juice', 
          category_id: 5, 
          quantity_in_stock: 150, 
          unit_price: 30.00, 
          product_image: 'juice.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 liter' 
        },
        { 
          product_id: 15, 
          product_name: 'Soda', 
          category_id: 5, 
          quantity_in_stock: 200, 
          unit_price: 20.00, 
          product_image: 'soda.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 can' 
        },
        { 
          product_id: 16, 
          product_name: 'Energy Drink', 
          category_id: 5, 
          quantity_in_stock: 50, 
          unit_price: 45.00, 
          product_image: 'energy_drink.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 can' 
        },

        // Additional Products
        { 
          product_id: 17, 
          product_name: 'Pineapple', 
          category_id: 1, 
          quantity_in_stock: 50, 
          unit_price: 60.00, 
          product_image: 'pineapple.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 piece' 
        },
        { 
          product_id: 18, 
          product_name: 'Cucumber', 
          category_id: 2, 
          quantity_in_stock: 100, 
          unit_price: 30.00, 
          product_image: 'cucumber.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 piece' 
        },
        { 
          product_id: 19, 
          product_name: 'Yogurt', 
          category_id: 3, 
          quantity_in_stock: 200, 
          unit_price: 35.00, 
          product_image: 'yogurt.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 pack' 
        },
        { 
          product_id: 20, 
          product_name: 'Chocolates', 
          category_id: 4, 
          quantity_in_stock: 150, 
          unit_price: 50.00, 
          product_image: 'chocolates.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 bar' 
        },
        { 
          product_id: 21, 
          product_name: 'Iced Tea', 
          category_id: 5, 
          quantity_in_stock: 100, 
          unit_price: 25.00, 
          product_image: 'iced_tea.jpg', 
          status: 1, 
          created_at: knex.fn.now(), 
          updated_at: knex.fn.now(), 
          unit: '1 bottle' 
        }
      ]);
    });
};

