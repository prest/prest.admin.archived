import api from '~/client/nextApi';

describe('src/client/nextApi', () => {
  const fakeTable = 'fizzfuzz';
  const fakeResponse = { foo: 'bar' };
  const fakeFetch = { json: () => Promise.resolve(fakeResponse) };

  beforeEach(() => {
    (fetch as jest.Mock).mockResolvedValue(fakeFetch);
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should call databases correctly', async () => {
    const response = await api.databases();

    expect(response).toEqual(fakeResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith('http://localhost:3001/api/databases');
  });

  it('should call table show correctly', async () => {
    const response = await api.table(fakeTable).show();

    expect(response).toEqual(fakeResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/${fakeTable}/show`);
  });

  it('should call table query correctly', async () => {
    const response = await api.table(fakeTable).query();

    expect(response).toEqual(fakeResponse);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(`http://localhost:3001/api/${fakeTable}`);
  });
});
