const { getMovies, postMovie } = require('../components/movie/movieController');
const db = require('../database');
const movieSchema = require('../components/movie/movieSchema');
const {
  dummyDatabase, dummyMovie, mockRequest, mockResponse,
} = require('./testHelper');

jest.mock('../database');
jest.mock('../components/movie/movieSchema');

describe('getMovies', () => {
  const randomSpy = jest.spyOn(global.Math, 'random');

  test('should get a random movie if no request query', async () => {
    const req = mockRequest();
    const resp = mockResponse();

    db.getAllFromDatabase.mockResolvedValue(dummyDatabase);

    randomSpy.mockReturnValue(0.83);
    await getMovies(req, resp);

    randomSpy.mockReturnValue(0.45);
    await getMovies(req, resp);

    expect(resp.json).toHaveBeenCalledTimes(2);
    expect(resp.json.mock.calls[0][0]).toBe(dummyDatabase.movies[2]);
    expect(resp.json.mock.calls[1][0]).toBe(dummyDatabase.movies[1]);
  });

  test('should throw error if database read promise is rejected', async () => {
    const req = mockRequest();
    const resp = mockResponse();

    db.getAllFromDatabase.mockRejectedValue(new Error('Could not access file'));

    await expect(getMovies(req, resp)).rejects.toThrow('Could not access file');
  });

  test('should get a random movie with runtime equal to (+-10) duration in query', async () => {
    const req = mockRequest({ duration: 90 });
    const resp = mockResponse();

    db.getAllFromDatabase.mockResolvedValue(dummyDatabase);

    randomSpy.mockReturnValue(0.11);
    await getMovies(req, resp);

    expect(resp.json).toHaveBeenCalledTimes(1);
    expect(Math.abs(resp.json.mock.calls[0][0].runtime - 90)).toBeLessThanOrEqual(10);
    expect(resp.json).toHaveBeenCalledWith(dummyDatabase.movies[0]);
  });

  test('should get a list of movies with one of the genres same as genre in query ', async () => {
    const req = mockRequest({ genre: 'Comedy' });
    const resp = mockResponse();

    db.getAllFromDatabase.mockResolvedValue(dummyDatabase);

    await getMovies(req, resp);

    expect(resp.json).toHaveBeenCalledTimes(1);
    resp.json.mock.calls[0][0].forEach((movieReturned) => {
      expect(movieReturned.genres).toContain('Comedy');
    });
  });

  test('should get a list of movies with one of the genres same as lowercased genre in query', async () => {
    const req = mockRequest({ genre: 'comedy' });
    const resp = mockResponse();

    db.getAllFromDatabase.mockResolvedValue(dummyDatabase);

    await getMovies(req, resp);

    expect(resp.json).toHaveBeenCalledTimes(1);
    resp.json.mock.calls[0][0].forEach((movieReturned) => {
      expect(movieReturned.genres).toContain('Comedy');
    });
  });

  test('should get a list of movies with at least one of the genres same as genres in query', async () => {
    const genresQueried = ['Crime', 'Drama', 'Thriller'];
    const req = mockRequest({ genre: genresQueried });
    const resp = mockResponse();

    db.getAllFromDatabase.mockResolvedValue(dummyDatabase);

    await getMovies(req, resp);

    expect(resp.json).toHaveBeenCalledTimes(1);
    expect(resp.json.mock.calls[0][0].length).toBe(2);
    resp.json.mock.calls[0][0].forEach((movieReturned) => {
      expect(genresQueried.some((genre) => movieReturned.genres.includes(genre))).toBeTruthy();
    });

    expect(resp.json.mock.calls[0][0]).toEqual([dummyDatabase.movies[1], dummyDatabase.movies[2]]);
  });
});

describe('postMovies', () => {
  const dummyMovieDatabase = {
    id: 1,
    ...dummyMovie,
  };

  test('should validate movie and add movie to database if no validation error', async () => {
    const req = mockRequest({}, dummyMovie);
    const resp = mockResponse();

    movieSchema.validate.mockReturnValue({});
    db.addMovieToDatabase.mockResolvedValue(dummyMovieDatabase);

    await postMovie(req, resp);

    expect(movieSchema.validate).toHaveBeenCalledTimes(1);
    expect(movieSchema.validate).toHaveBeenCalledWith(dummyMovie);

    expect(db.addMovieToDatabase).toHaveBeenCalledTimes(1);
    expect(db.addMovieToDatabase).toHaveBeenCalledWith(dummyMovie);

    expect(resp.json).toHaveBeenCalledTimes(1);
    expect(resp.json).toHaveBeenCalledWith(dummyMovieDatabase);
  });

  test('should throw error if database write promise is rejected', async () => {
    const req = mockRequest();
    const resp = mockResponse();

    db.addMovieToDatabase.mockRejectedValue(new Error('Could not access file'));

    await expect(postMovie(req, resp)).rejects.toThrow('Could not access file');
  });

  test('should validate movie and respond with status 400 and error message if validation error', async () => {
    const wrongDummyMovie = { ...dummyMovie, title: 7 };
    const req = mockRequest({}, wrongDummyMovie);
    const resp = mockResponse();

    movieSchema.validate.mockReturnValue({ error: { details: [{ message: '\"title\" must be a string' }] } });

    await postMovie(req, resp);

    expect(movieSchema.validate).toHaveBeenCalledWith(wrongDummyMovie);

    expect(resp.status).toHaveBeenCalledTimes(1);
    expect(resp.status).toHaveBeenCalledWith(400);
    expect(resp.json).toHaveBeenCalledTimes(1);
    expect(resp.json).toHaveBeenCalledWith({ error: '\"title\" must be a string' });
  });
});
