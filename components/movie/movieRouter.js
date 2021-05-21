const movieRouter = require('express').Router();
const { postMovie, getMovies } = require('./movieController');

movieRouter.get('/', getMovies);
movieRouter.post('/', postMovie);

module.exports = movieRouter;
