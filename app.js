const express = require('express');
require('express-async-errors');
const middleware = require('./utils/middleware');
const movieRouter = require('./components/movie/movieRouter');

const app = express();

app.use(express.json());
app.use('/movies', movieRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
