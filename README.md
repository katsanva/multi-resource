# multi-resource

[![Build Status](https://travis-ci.org/katsanva/multi-resource.svg?branch=master)](https://travis-ci.org/katsanva/multi-resource)
[![Maintainability](https://api.codeclimate.com/v1/badges/6a3ee538b80602b14a09/maintainability)](https://codeclimate.com/github/katsanva/multi-resource/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/6a3ee538b80602b14a09/test_coverage)](https://codeclimate.com/github/katsanva/multi-resource/test_coverage)

An express middleware to fetch multiple resources from API with one request

## Installation

```bash
npm i multi-resource
```

## Usage

```javascript 1.8
const express = require('express');
const mr = require('multi-resource');

const app = express();
app.use(mr());

app.listen(3000);
```

```bash
curl http://localhost:3000/api/resources?users=api/users
```

Also, see [example](./examples/server.js)

### Options

- `basePath` - ('api')
- `url` - ('resources')

## Limitations

- Will not work with non `application/json` APIs
- Will not work if API returns status code different from 200
