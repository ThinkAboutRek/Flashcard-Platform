// seeds/seed_users.js
exports.seed = function (knex) {
  return knex('users')
    .del()
    .then(() => {
      return knex('users').insert([
        { id: 1, username: 'john_doe', admin: false },
        { id: 2, username: 'admin_user', admin: true }
      ]);
    });
};
