const express = require('express');
const middleware = require('../lib');
const customer = require('./customer');
const users = require('./users');

const port = process.env.PORT || 3000;

const DEFAULT_CB = () => console.log(`Listening on port ${port}`);

const server = (cb = DEFAULT_CB) => {
  const app = express();

  app.use(middleware());

  app.get('/api/users', (req, res) => {
    res.json(users);
  });

  app.get('/api/countries', (req, res) => {
    res.end(`{result: 'countries'}`);
  });

  app.get('/api/customers/23', (req, res) => {
    res.json(customer);
  });

  return app.listen(port, cb);
};

module.exports = server;
