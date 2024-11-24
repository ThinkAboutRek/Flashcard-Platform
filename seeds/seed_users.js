// seeds/seed_users.js
exports.seed = async function (knex) {
  await knex('users').del();
  await knex('users').insert([
    { id: 1, name: 'Alice', admin: false },
    { id: 2, name: 'Bob', admin: true },
    { id: 3, name: 'Charlie', admin: true }
  ]);
};
