const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response) => {
  console.error(error.message);

  response.status(404).json({ error: error.message });
};

module.exports = {
  unknownEndpoint,
  errorHandler,
};
