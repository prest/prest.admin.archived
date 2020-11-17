jest.mock('../../src/config', () => ({
  PREST_URL: 'http://localhost:3000',
}));

jest.mock('@postgresrest/node');

import PRestAPI from '@postgresrest/node';
import { PREST_URL } from '~/config';

describe('src/client/prest', () => {
  const fakeObj = { foo: 'bar' };

  it('should instance PRest with correct url', async () => {
    (PRestAPI as jest.Mock).mockImplementation(() => fakeObj);

    const module = await import('../../src/client/prest');

    expect(module.default).toEqual(fakeObj);
    expect(PRestAPI).toHaveBeenCalledTimes(1);
    expect(PRestAPI).toHaveBeenCalledWith(PREST_URL);
  });
});
