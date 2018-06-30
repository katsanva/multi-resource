const {
  isInvalidContentType,
  isInvalidStatusCode,
  validate,
} = require('./validate-api-response');

describe('validate', () => {
  it('should be not ok', () => {
    const response = {
      statusCode: 200,
      headers: {
        'content-type': 'application/json',
      },
    };

    const result = validate(response);

    expect(result).toBeFalsy();
  });
});

describe('isInvalidContentType', () => {
  it('should be ok', () => {
    const response = {
      headers: {
        'content-type': 'text/json',
      },
    };

    const result = isInvalidContentType(response);

    expect(result).toBeTruthy();
  });

  it('should be ok, no content-type', () => {
    const response = {
      headers: {},
    };

    const result = isInvalidContentType(response);

    expect(result).toBeTruthy();
  });
});

describe('isInvalidStatusCode', () => {
  it('should be ok', () => {
    const response = {
      statusCode: 205,
    };

    const result = isInvalidStatusCode(response);

    expect(result).toBeTruthy();
  });
});
