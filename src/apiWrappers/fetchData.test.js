import fetchData, { DataURL } from './fetchData';

describe('FetchData test', () => {
  test('fetches data from server when server returns a successful response', async () => {
    const response = [];
    global.fetch = jest.fn(() => Promise.resolve({
      json: () => Promise.resolve(response),
    }));

    const data = await fetchData();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(DataURL);
    expect(data).toEqual(response);
  });
  test('fetches data from server when server returns a failure response', async () => {
    window.fetch = jest.fn().mockImplementation(() => Promise.reject(new Error()));

    await expect(fetchData()).rejects.toEqual(new Error('Error in FetchData'));

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith(DataURL);
  });
});
