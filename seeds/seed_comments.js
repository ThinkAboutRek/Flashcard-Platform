// Comments seed
exports.seed = async function (knex) {
  await knex('comments').del();
  await knex('comments').insert([
    { id: 1, comment: 'Great set!', set_id: 1, user_id: 1 },
    { id: 2, comment: 'Really helpful!', set_id: 2, user_id: 2 }
  ]);
};
