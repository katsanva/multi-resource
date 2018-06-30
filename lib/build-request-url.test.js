const { buildRequestUrl } = require('./build-request-url');

describe('buildRequestUrl', () => {
  it('should make a valid url', () => {
    const protocol = 'http';
    const host = '127.0.0.1:3000';
    const path = 'foo';

    const expected = 'http://127.0.0.1:3000/foo';
    const result = buildRequestUrl(protocol, host, path);

    expect(result).toBe(expected);
  });

  // not sure it should work in this way, but why not
  it('should return a url if url is provided', () => {
    const protocol = 'http';
    const host = '127.0.0.1:3000';
    const path = 'https://some-url.com/';

    const expected = 'https://some-url.com/';
    const result = buildRequestUrl(protocol, host, path);

    expect(result).toBe(expected);
  });
});
