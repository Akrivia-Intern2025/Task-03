exports.up = function(knex) {
    return knex.schema.createTable('categories', (table) => {
        table.increments('category_id').primary();
        table.string('category_name');
        table.text('description');
        table.integer('status').defaultTo(0);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('categories');
};