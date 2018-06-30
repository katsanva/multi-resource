const Url = require('url');

/**
 *
 * @param protocol string
 * @param host string
 * @param path string
 * @returns {string}
 */
const buildRequestUrl = (protocol, host, path) =>
  new Url.URL(path, `${protocol}://${host}`).toString();

module.exports = {
  buildRequestUrl,
};
