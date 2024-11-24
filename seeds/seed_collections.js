// Collection seed
exports.seed = async function (knex) {
  await knex('collections').del();
  await knex('collections').insert([
    { id: 1, user_id: 1, set_id: 1, comment: 'My first collection' },
    { id: 2, user_id: 2, set_id: 2, comment: 'Recommended set' }
  ]);
};
