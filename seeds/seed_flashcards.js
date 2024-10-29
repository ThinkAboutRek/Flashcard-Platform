exports.seed = function(knex) {
  return knex('flashcards')
    .del()
    .then(() => {
      return knex('flashcards').insert([
        { id: 1, question: 'What is the capital of France?', answer: 'Paris', difficulty: 'easy', set_id: 1 },
        { id: 2, question: 'What is the square root of 16?', answer: '4', difficulty: 'easy', set_id: 2 }
      ]);
    });
};
