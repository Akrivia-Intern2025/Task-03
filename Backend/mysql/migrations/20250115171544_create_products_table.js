exports.up = function(knex) {
    return knex.schema.createTable('products', (table) => {
        table.increments('product_id').primary();
        table.string('product_name');
        table.integer('category_id').unsigned().references('category_id').inTable('categories');
        table.integer('quantity_in_stock');
        table.decimal('unit_price', 10, 2);
        table.string('product_image');
        table.integer('status').defaultTo(0);
        table.string('unit');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('products');
};