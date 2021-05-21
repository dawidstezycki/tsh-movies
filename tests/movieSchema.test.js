const movieSchema = require('../components/movie/movieSchema');
const { dummyMovie } = require('./testHelper');

describe('Movie Schema', () => {
  test('should return no error if correct data', () => {
    const { error } = movieSchema.validate(dummyMovie);
    expect(error).toBe(undefined);
  });
  describe('genre validation', () => {
    test('should return error if not predefined genre given', () => {
      const wrongGenreDummyMovie = {
        ...dummyMovie,
        genres: ['Random'],
      };

      const { error } = movieSchema.validate(wrongGenreDummyMovie);
      const errorMessage = error.details.map((i) => i.message).join(',');
      expect(errorMessage).toBe('\"genres[0]\" must be one of [Comedy, Fantasy, Crime, Drama, Music, Adventure, History, Thriller, Animation, Family, Mystery, Biography, Action, Film-Noir, Romance, Sci-Fi, War, Western, Horror, Musical, Sport]');
    });

    test('should return error if genre not given', () => {
      const noGenreDummyMovie = {
        ...dummyMovie,
      };
      delete noGenreDummyMovie.genres;

      const { error } = movieSchema.validate(noGenreDummyMovie);
      const errorMessage = error.details.map((i) => i.message).join(',');
      expect(errorMessage).toBe('\"genres\" is required');
    });
  });

  describe('title validation', () => {
    test('should return error if title not given', () => {
      const noTitleDummyMovie = {
        ...dummyMovie,
      };
      delete noTitleDummyMovie.title;

      const { error } = movieSchema.validate(noTitleDummyMovie);
      const errorMessage = error.details.map((i) => i.message).join(',');
      expect(errorMessage).toBe('\"title\" is required');
    });

    test('should return error if title given longer than 255 characters', () => {
      const wrongTitleDummyMovie = {
        ...dummyMovie,
        title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      };

      const { error } = movieSchema.validate(wrongTitleDummyMovie);
      const errorMessage = error.details.map((i) => i.message).join(',');
      expect(errorMessage).toBe('\"title\" length must be less than or equal to 255 characters long');
    });

    test('should return error if title is not a string', () => {
      const wrongTitleDummyMovie = {
        ...dummyMovie,
        title: 7,
      };

      const { error } = movieSchema.validate(wrongTitleDummyMovie);
      const errorMessage = error.details.map((i) => i.message).join(',');
      expect(errorMessage).toBe('\"title\" must be a string');
    });
  });
  describe('actors validation', () => {
    test('should return no error if actors not given', () => {
      const noActorsDummyMovie = {
        ...dummyMovie,
      };
      delete noActorsDummyMovie.actors;

      const { error } = movieSchema.validate(noActorsDummyMovie);
      expect(error).toBe(undefined);
    });
    test('should return error if actors is not a string', () => {
      const wrongActorsDummyMovie = {
        ...dummyMovie,
        actors: 7,
      };

      const { error } = movieSchema.validate(wrongActorsDummyMovie);
      const errorMessage = error.details.map((i) => i.message).join(',');
      expect(errorMessage).toBe('\"actors\" must be a string');
    });
  });
});
