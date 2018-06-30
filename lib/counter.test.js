const Counter = require('./counter');

describe('Counter', () => {
  it('should set a limit', () => {
    const limit = 3;
    const counter = new Counter(limit);

    expect(counter.limit).toBe(limit);
  });

  it('should set default limit', () => {
    const expected = 0;
    const counter = new Counter();

    expect(counter.limit).toBe(expected);
  });

  it('should disallow to set limit after creation', () => {
    const counter = new Counter();

    counter.limit = 5;

    expect(counter.limit).toEqual(0);
  });

  it('should set default value', () => {
    const expected = 0;
    const counter = new Counter();

    expect(counter.value).toBe(expected);
  });

  it('should disallow to set value after creation', () => {
    const counter = new Counter();

    counter.value = 5;

    expect(counter.value).toEqual(0);
  });

  it('should allow to tick', () => {
    const limit = 1;
    const expected = true;
    const counter = new Counter(limit);
    const result = counter.canTickMore();

    expect(result).toBe(expected);
  });

  it('should increase value after tick', () => {
    const limit = 1;
    const expected = 1;
    const counter = new Counter(limit);

    counter.tick();

    expect(counter.value).toBe(expected);
  });

  it('should disallow to tick', () => {
    const limit = 1;
    const expected = false;
    const counter = new Counter(limit);

    counter.tick();
    const result = counter.canTickMore();

    expect(result).toBe(expected);
  });
});
