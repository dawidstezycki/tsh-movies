const fs = require('fs').promises;

const databasePath = './data/db.json';

const getAllFromDatabase = async () => {
  const moviesDbString = await fs.readFile(databasePath, 'utf-8');
  const moviesDb = JSON.parse(moviesDbString);
  return moviesDb;
};

const addMovieToDatabase = async (movieObject) => {
  const moviesDbString = await fs.readFile(databasePath, 'utf-8');
  const moviesDb = JSON.parse(moviesDbString);
  const movieEntry = { id: moviesDb.movies.length + 1, ...movieObject };
  moviesDb.movies.push(movieEntry);
  await fs.writeFile(databasePath, JSON.stringify(moviesDb, null, 2));
  return movieEntry;
};

module.exports = { getAllFromDatabase, addMovieToDatabase };
