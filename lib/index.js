const Url = require('url');
const Counter = require('./counter');
const processResource = require('./process-resource');

const DEFAULT_OPTIONS = {
  basePath: 'api',
  url: 'resources',
};

const getRoute = opts => {
  const { basePath, url } = {
    ...DEFAULT_OPTIONS,
    ...(opts || {}),
  };

  return `/${basePath}/${url}`;
};

const middleware = (processResource, getRoute, Counter) => opts => {
  const route = getRoute(opts);

  return (req, res, next) => {
    const url = Url.parse(req.url);

    if (req.method !== 'GET' || url.pathname !== route) {
      return next();
    }

    const resources = Object.keys(req.query);
    const limit = resources.length;

    res
      .status(200)
      .type('json')
      .write('{');

    if (!limit) {
      res.end('}');

      return;
    }

    const counter = new Counter(limit);

    resources.map(processResource(req, res, counter));
  };
};

module.exports = middleware(processResource, getRoute, Counter);

module.exports.middleware = middleware;
module.exports.getRoute = getRoute;
