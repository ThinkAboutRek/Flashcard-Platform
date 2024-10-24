/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('comments', (table) => {
      table.increments('id').primary();
      table.string('comment').notNullable();
      table.integer('set_id').unsigned().references('id').inTable('sets').onDelete('CASCADE');
      table.integer('user_id').unsigned().references('id').inTable('users').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('comments');
  };
  