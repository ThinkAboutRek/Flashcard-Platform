exports.seed = function (knex) {
  return knex('sets')
    .del()
    .then(() => {
      return knex('sets').insert([
        { id: 1, name: 'European Capitals', cards: JSON.stringify([{ question: 'What is the capital of France?', answer: 'Paris', difficulty: 'easy' }]) },
        { id: 2, name: 'Math Formulas', cards: JSON.stringify([{ question: 'What is the quadratic formula?', answer: 'ax^2 + bx + c = 0', difficulty: 'medium' }]) }
      ]);
    });
};
