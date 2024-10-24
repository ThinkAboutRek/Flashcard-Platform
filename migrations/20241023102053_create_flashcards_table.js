/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('flashcards', (table) => {
      table.increments('id').primary();
      table.string('question').notNullable();
      table.string('answer').notNullable();
      table.enum('difficulty', ['easy', 'medium', 'hard']);
      table.integer('set_id').unsigned().references('id').inTable('sets').onDelete('CASCADE');
      table.timestamps(true, true);
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable('flashcards');
  };
  