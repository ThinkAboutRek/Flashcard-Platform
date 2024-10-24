/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('sets', (table) => {
      table.increments('id').primary();
      table.string('name').notNullable();
      table.json('cards');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('sets');
  };
  