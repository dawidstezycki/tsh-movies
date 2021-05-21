const Joi = require('joi');
const moviesDb = require('../../data/db.json');

const movieSchema = Joi.object({
  genres: Joi.array().items(Joi.string().valid(...moviesDb.genres))
    .required(),
  title: Joi.string()
    .max(255)
    .required(),
  year: Joi.number()
    .required(),
  runtime: Joi.number()
    .required(),
  director: Joi.string()
    .max(255)
    .required(),

  actors: Joi.string(),
  plot: Joi.string(),
  posterUrl: Joi.string(),
});

module.exports = movieSchema;
