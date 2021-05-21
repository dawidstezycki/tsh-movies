const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);

const extractGenresFromQuery = (genresQuery) => (typeof genresQuery === 'string'
  ? [capitalize(genresQuery)]
  : genresQuery.map((genre) => capitalize(genre)));

const getGenresMatchingMovie = (genres, movie) => {
  return genres.filter((genre) => movie.genres.includes(genre));
};

const isAnyGenreMatchingMovie = (genres, movie) => {
  return genres.some((genre) => movie.genres.includes(genre));
};

module.exports = {
  extractGenresFromQuery, getGenresMatchingMovie, isAnyGenreMatchingMovie,
};
