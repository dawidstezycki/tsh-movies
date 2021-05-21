const fs = require('fs').promises;
const { getAllFromDatabase, addMovieToDatabase } = require('../database');
const { dummyMovie, dummyDatabase } = require('./testHelper');

const readFileSpy = jest.spyOn(fs, 'readFile');
const writeFileSpy = jest.spyOn(fs, 'writeFile');

describe('getAllFromDatabase', () => {
  test('should return object parsed from returned string if readFile successful', async () => {
    const fileContent = JSON.stringify(dummyDatabase, null, 2);

    readFileSpy.mockResolvedValue(fileContent);
    const result = await getAllFromDatabase();

    expect(result).toEqual(dummyDatabase);
    readFileSpy.mockClear();
  });
  test('should throw error if readFile promise is rejected', async () => {
    readFileSpy.mockRejectedValue(new Error('Could not access file'));

    await expect(getAllFromDatabase()).rejects.toThrow('Could not access file');

    readFileSpy.mockClear();
  });
});

describe('addMovieToDatabase', () => {
  test('should write movie to database and return movie with id if writeFile successful', async () => {
    const fileContent = JSON.stringify(dummyDatabase, null, 2);
    const finalDatabase = { ...dummyDatabase };
    finalDatabase.movies.push({ id: 4, ...dummyMovie });

    readFileSpy.mockResolvedValue(fileContent);
    writeFileSpy.mockResolvedValue({});
    const result = await addMovieToDatabase(dummyMovie);

    expect(writeFileSpy).toHaveBeenCalledWith('./data/db.json', JSON.stringify(finalDatabase, null, 2));
    expect(result).toEqual({ ...dummyMovie, id: 4 });

    readFileSpy.mockClear();
    writeFileSpy.mockClear();
  });
  test('should throw error if writeFile promise is rejected', async () => {
    const readFileSpy = jest.spyOn(fs, 'readFile');
    const fileContent = JSON.stringify(dummyDatabase, null, 2);

    readFileSpy.mockResolvedValue(fileContent);
    writeFileSpy.mockRejectedValue(new Error('Could not access file'));

    await expect(addMovieToDatabase(dummyMovie)).rejects.toThrow('Could not access file');

    readFileSpy.mockClear();
    writeFileSpy.mockClear();
  });
});
