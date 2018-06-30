/**
 *
 * @param response http.IncomingMessage
 * @returns {boolean|string}
 */
const isInvalidContentType = response => {
  const contentType = response.headers['content-type'];

  return (
    !/^application\/json/.test(contentType) &&
    `Invalid content-type. Expected 'application/json' but received '${contentType ||
      ''}'`
  );
};

/**
 *
 * @param response http.IncomingMessage
 * @returns {boolean|string}
 */
const isInvalidStatusCode = response => {
  const { statusCode } = response;

  return statusCode !== 200 && `Request Failed. Status Code: ${statusCode}`;
};

/**
 *
 * @param response http.IncomingMessage
 * @returns {boolean|string}
 */
const validate = response =>
  isInvalidStatusCode(response) || isInvalidContentType(response);

module.exports = {
  isInvalidContentType,
  isInvalidStatusCode,
  validate,
};
