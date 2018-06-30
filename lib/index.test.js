const { getRoute, middleware } = require('./index');

describe('getRoute', () => {
  it('should apply default options', () => {
    const expected = '/api/resources';

    const result = getRoute();

    expect(result).toBe(expected);
  });

  it('should apply provided options', () => {
    const options = {
      url: 'foo',
      basePath: 'bla',
    };

    const expected = '/bla/foo';

    const result = getRoute(options);

    expect(result).toEqual(expected);
  });

  it('should apply partially provided options', () => {
    const opts = { url: 'foo' };
    const expected = '/api/foo';

    const result = getRoute(opts);

    expect(result).toEqual(expected);
  });
});

describe('middleware', () => {
  const actualProcessResource = jest.fn();
  const processResource = jest.fn(() => actualProcessResource);
  const getRoute = jest.fn();
  const opts = {};
  const next = jest.fn();
  const Counter = jest.fn();

  afterEach(() => {
    actualProcessResource.mockReset();
    getRoute.mockReset();
    next.mockReset();
  });

  it('should skip if method is incompatible', () => {
    const req = {
      method: 'POST',

      url: 'foo',
    };
    const res = {};

    middleware(processResource, getRoute, Counter)(opts)(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it('should skip if url is incorrect', () => {
    getRoute.mockImplementation(() => '/foo/bla');
    const req = {
      method: 'POST',

      url: 'foo',
    };
    const res = {};

    middleware(processResource, getRoute, Counter)(opts)(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  describe('url is matched', () => {
    const url = '/foo/bla';
    const req = {
      method: 'GET',
      url,
      query: {},
    };
    const res = {};
    const status = jest.fn(() => res);
    const type = jest.fn(() => res);
    const write = jest.fn(() => res);
    const end = jest.fn(() => res);

    res.status = status;
    res.type = type;
    res.write = write;
    res.end = end;

    beforeEach(() => {
      getRoute.mockImplementation(() => url);
    });

    it('should response with empty object', () => {
      middleware(processResource, getRoute, Counter)(opts)(req, res, next);

      expect(status).toHaveBeenCalledWith(200);
      expect(type).toHaveBeenCalledWith('json');
      expect(write).toHaveBeenCalledWith('{');
      expect(end).toHaveBeenCalledWith('}');
    });

    it('should process each query param', () => {
      req.query = {
        foo: 'bla',
      };
      const expected = ['foo', 0, ['foo']];

      middleware(processResource, getRoute, Counter)(opts)(req, res, next);

      expect(actualProcessResource).toHaveBeenCalledWith(...expected);
    });
  });
});
