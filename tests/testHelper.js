const dummyDatabase = {
  genres: [
    'Comedy',
    'Fantasy',
    'Crime',
    'Drama',
    'Music',
    'Adventure',
    'History',
    'Thriller',
    'Animation',
    'Family',
    'Mystery',
    'Biography',
    'Action',
    'Film-Noir',
    'Romance',
    'Sci-Fi',
    'War',
    'Western',
    'Horror',
    'Musical',
    'Sport',
  ],
  movies: [
    {
      id: 1,
      title: 'Beetlejuice',
      year: '1988',
      runtime: '92',
      genres: [
        'Comedy',
        'Fantasy',
      ],
      director: 'Tim Burton',
      actors: 'Alec Baldwin, Geena Davis, Annie McEnroe, Maurice Page',
      plot: 'A couple of recently deceased ghosts contract the services of a "bio-exorcist" in order to remove the obnoxious new owners of their house.',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BMTUwODE3MDE0MV5BMl5BanBnXkFtZTgwNTk1MjI4MzE@._V1_SX300.jpg',
    },
    {
      id: 36,
      title: 'Reservoir Dogs',
      year: '1992',
      runtime: '99',
      genres: [
        'Crime',
        'Drama',
        'Thriller',
      ],
      director: 'Quentin Tarantino',
      actors: 'Harvey Keitel, Tim Roth, Michael Madsen, Chris Penn',
      plot: 'After a simple jewelry heist goes terribly wrong, the surviving criminals begin to suspect that one of them is a police informant.',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BNjE5ZDJiZTQtOGE2YS00ZTc5LTk0OGUtOTg2NjdjZmVlYzE2XkEyXkFqcGdeQXVyMzM4MjM0Nzg@._V1_SX300.jpg',
    },
    {
      id: 3,
      title: 'The Shawshank Redemption',
      year: '1994',
      runtime: '142',
      genres: [
        'Crime',
        'Drama',
      ],
      director: 'Frank Darabont',
      actors: 'Tim Robbins, Morgan Freeman, Bob Gunton, William Sadler',
      plot: 'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
      posterUrl: 'https://images-na.ssl-images-amazon.com/images/M/MV5BODU4MjU4NjIwNl5BMl5BanBnXkFtZTgwMDU2MjEyMDE@._V1_SX300.jpg',
    },
  ],
};

const dummyMovie = {
  genres: ['Comedy'],
  title: 'My Favorite Movie',
  year: 1989,
  runtime: 120,
  director: 'Director McArtist',
  actors: 'Actress DeBeautiful, Actor Von Muscles, Meryl Streep',
  plot: 'Characterina (Actress DeBeautiful) falls in love with Heron (Actor Von Muscles) and is advised against relationship by Meryl Streep (herself)',
  posterUrl: 'https://i.pinimg.com/originals/6f/d7/c3/6fd7c39c68f4fc5276ffd495e45ef78a.jpg',
};

const mockRequest = (query = {}, body = {}) => {
  const req = { query, body };
  return req;
};

const mockResponse = () => {
  const resp = {};
  resp.status = jest.fn().mockReturnValue(resp);
  resp.json = jest.fn().mockReturnValue(resp);
  return resp;
};

module.exports = {
  dummyDatabase, dummyMovie, mockRequest, mockResponse,
};
