exports.up = function(knex) {
    return knex.schema.createTable('vendors', (table) => {
        table.increments('vendor_id').primary();
        table.string('vendor_name');
        table.string('contact_name');
        table.text('address');
        table.string('city');
        table.string('postal_code');
        table.string('country');
        table.string('phone');
        table.integer('status').defaultTo(0);
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('vendors');
};