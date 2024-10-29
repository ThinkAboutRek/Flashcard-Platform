exports.seed = function(knex) {
    return knex('comments')
      .del()
      .then(() => {
        return knex('comments').insert([
          { id: 1, comment: 'This set is really helpful!', set_id: 1, user_id: 1 },
          { id: 2, comment: 'Great flashcards!', set_id: 2, user_id: 2 }
        ]);
      });
  };