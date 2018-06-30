const http = require('http');
const https = require('https');
const { PassThrough } = require('stream');
const { buildRequestUrl } = require('./build-request-url');
const { finishStreamAsJSON, handleOriginError } = require('./end-stream');
const { validate } = require('./validate-api-response');

const processResource = (buildRequestUrl, handleAPIResponse, https, http) => (
  req,
  res,
  counter,
) => key => {
  const url = buildRequestUrl(req.protocol, req.get('host'), req.query[key]);
  const requester = url.startsWith('https') ? https : http;

  requester.get(url, handleAPIResponse(res, counter, key));
};

const handleAPIResponse = (finishStreamAsJSON, validate, handleOriginError) => (
  res,
  counter,
  key,
) => origin => {
  const destination = new PassThrough();
  const markDestinationProcessed = () => finishStreamAsJSON(res, counter);

  destination.on('data', res.write.bind(res));
  destination.write(`"${key}":`);

  let error = validate(origin);

  if (error) {
    handleOriginError(origin, destination, error);

    markDestinationProcessed();

    return;
  }

  origin.on('data', destination.write.bind(destination));
  origin.on('end', () => destination.emit('end'));

  destination.on('end', markDestinationProcessed);
};

module.exports = processResource(
  buildRequestUrl,
  handleAPIResponse(finishStreamAsJSON, validate, handleOriginError),
  https,
  http,
);

module.exports.processResource = processResource;
module.exports.handleAPIResponse = handleAPIResponse;
