exports.up = function(knex) {
    return knex.schema.createTable('product_to_vendor', (table) => {
      table.increments('id').primary();
      table.integer('product_id').unsigned().notNullable().references('product_id').inTable('products');
      table.integer('vendor_id').unsigned().notNullable().references('vendor_id').inTable('vendors');
      table.integer('status').defaultTo(1); // Assuming status is an integer
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTableIfExists('product_to_vendor');
  }; 