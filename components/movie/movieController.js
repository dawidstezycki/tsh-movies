const movieSchema = require('./movieSchema');
const db = require('../../database');
const {
  extractGenresFromQuery, getGenresMatchingMovie, isAnyGenreMatchingMovie,
} = require('../../utils/movieHelper');

const getMovies = async (request, response) => {
  const moviesDb = await db.getAllFromDatabase();
  const durationQuery = request.query.duration;
  const genresQuery = request.query.genre;

  let filteredMovies = moviesDb.movies;

  if (durationQuery) {
    filteredMovies = filteredMovies.filter(movie => Math.abs(durationQuery - movie.runtime) <= 10);
  }
  if (genresQuery) {
    const genresRequested = extractGenresFromQuery(genresQuery);

    filteredMovies = filteredMovies.filter(movie => isAnyGenreMatchingMovie(genresRequested, movie));

    const filteredAndSortedMovies = filteredMovies.sort((movie1, movie2) => {
      return getGenresMatchingMovie(genresRequested, movie1).length <
        getGenresMatchingMovie(genresRequested, movie2).length ? 1 : -1;
    });

    response.json(filteredAndSortedMovies);
  } else {
    response.json(filteredMovies[Math.floor(Math.random() * filteredMovies.length)]);
  }
};

const postMovie = async (request, response) => {
  const { error } = movieSchema.validate(request.body);

  if (error) {
    const errorMessage = error.details.map((i) => i.message).join(',');
    response.status(400).json({ error: errorMessage });
  } else {
    const movieEntry = await db.addMovieToDatabase(request.body);
    response.json(movieEntry);
  }
};

module.exports = {
  getMovies,
  postMovie,
};
