const { processResource, handleAPIResponse } = require('./process-resource');

const { PassThrough } = require('stream');
const { EventEmitter } = require('events');

describe('processResource', () => {
  const buildRequestUrl = jest.fn();
  const handleAPIResponse = jest.fn(() => 'handleApiResponse');
  const httpGet = jest.fn();
  const httpsGet = jest.fn();
  const http = {
    get: httpGet,
  };
  const https = {
    get: httpsGet,
  };

  afterEach(() => {
    buildRequestUrl.mockReset();
    handleAPIResponse.mockClear();
    httpGet.mockReset();
    httpsGet.mockReset();
  });

  const req = {
    protocol: 'protocol',
    get: _ => _,
    query: {
      foo: 'bla',
    },
  };
  const res = 'res';
  const counter = 'counter';
  const key = 'foo';

  it('should make an request', () => {
    const expectedForUrl = ['protocol', 'host', 'bla'];
    const expectedForHandleApiResponse = ['res', 'counter', 'foo'];
    const expectedForHttpGet = ['some-url', 'handleApiResponse'];

    buildRequestUrl.mockImplementation(() => 'some-url');

    processResource(buildRequestUrl, handleAPIResponse, https, http)(
      req,
      res,
      counter,
    )(key);

    expect(buildRequestUrl).toHaveBeenCalledWith(...expectedForUrl);
    expect(handleAPIResponse).toHaveBeenCalledWith(
      ...expectedForHandleApiResponse,
    );
    expect(httpGet).toHaveBeenCalledWith(...expectedForHttpGet);
  });

  it('should make an https request', () => {
    const expectedForHttpsGet = ['https://some-url', 'handleApiResponse'];

    buildRequestUrl.mockImplementation(() => 'https://some-url');

    processResource(buildRequestUrl, handleAPIResponse, https, http)(
      req,
      res,
      counter,
    )(key);

    expect(httpsGet).toHaveBeenCalledWith(...expectedForHttpsGet);
  });
});

describe('handleAPIResponse', () => {
  const finishStreamAsJSON = jest.fn();
  const validate = jest.fn();
  const handleOriginError = jest.fn();

  afterEach(() => {
    finishStreamAsJSON.mockReset();
    validate.mockReset();
    handleOriginError.mockReset();
  });

  it('should handle errors on origin', () => {
    const res = new PassThrough();
    const counter = 'counter';
    const key = 'key';
    const origin = new EventEmitter();

    validate.mockImplementation(() => 'error');

    handleAPIResponse(finishStreamAsJSON, validate, handleOriginError)(
      res,
      counter,
      key,
    )(origin);

    expect(handleOriginError).toHaveBeenCalled();
    expect(finishStreamAsJSON).toHaveBeenCalledWith(res, 'counter');
  });

  it('should write from origin to destination', () => {
    const res = new PassThrough();
    const counter = 'counter';
    const key = 'key';
    const origin = new EventEmitter();

    handleAPIResponse(finishStreamAsJSON, validate, handleOriginError)(
      res,
      counter,
      key,
    )(origin);

    res.on('data', chunk =>
      expect(['"key":', 'foo'].indexOf(chunk.toString()) > -1).toBeTruthy(),
    );

    origin.emit('data', 'foo');
    origin.emit('end');

    expect(finishStreamAsJSON).toHaveBeenCalledWith(res, 'counter');
  });
});
