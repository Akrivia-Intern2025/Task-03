exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
      table.increments('user_id').primary();
      table.string('first_name', 255).notNullable();
      table.string('last_name', 255).notNullable();
      table.string('username', 255).notNullable().unique();
      table.string('password', 255).notNullable();
      table.string('email', 255).notNullable().unique();
      table.string('profile_pic', 500);
      table.string('thumbnail', 500);
      table.integer('status').defaultTo(0); // 0: created
      table.timestamps(true, true); // created_at, updated_at
    });
  };
  
  exports.down = function (knex) {
    return knex.schema.dropTable('users');
  };