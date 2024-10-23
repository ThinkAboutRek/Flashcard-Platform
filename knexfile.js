// knexfile.js
module.exports = {
  development: {
    client: 'sqlite3',
    connection: {
      filename: './db/flashcards.sqlite'
    },
    useNullAsDefault: true
  },
  test: {
    client: 'sqlite3',
    connection: {
      filename: './db/test_flashcards.sqlite' // Separate test database
    },
    useNullAsDefault: true
  }
};
