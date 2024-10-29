// Collection seed
exports.seed = function(knex) {
    return knex('collections')
      .del()
      .then(() => {
        return knex('collections').insert([
          { id: 1, user_id: 1, set_id: 1, comment: 'Love this set!' },
          { id: 2, user_id: 2, set_id: 2, comment: 'Great for studying math' }
        ]);
      });
  };