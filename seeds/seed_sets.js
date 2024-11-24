exports.seed = async function (knex) {
  await knex('sets').del(); // Clear existing data
  await knex('sets').insert([
    {
      id: 1,
      name: 'Set 1',
      cards: JSON.stringify([
        { question: 'What is JavaScript?', answer: 'A programming language.' },
        { question: 'What is Node.js?', answer: 'A runtime environment.' },
      ]),
    },
    {
      id: 2,
      name: 'Set 2',
      cards: JSON.stringify([
        { question: 'What is HTML?', answer: 'Markup language for web pages.' },
      ]),
    },
  ]);
};
