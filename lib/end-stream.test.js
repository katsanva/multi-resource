const { finishStreamAsJSON, handleOriginError } = require('./end-stream');

describe('finishStreamAsJSON', () => {
  const tick = jest.fn();
  const canTickMore = jest.fn();
  const counter = {
    tick,
    canTickMore,
  };

  const write = jest.fn();
  const end = jest.fn();
  const res = {
    write,
    end,
  };

  afterEach(() => {
    tick.mockReset();
    canTickMore.mockReset();
    write.mockReset();
    end.mockReset();
  });

  it('should tick a counter', () => {
    finishStreamAsJSON(res, counter);

    expect(tick).toHaveBeenCalledWith();
  });

  describe('counter can tick', () => {
    beforeEach(() => {
      canTickMore.mockImplementationOnce(() => true);
    });

    it('should close a "json property"', () => {
      const expected = ',';

      finishStreamAsJSON(res, counter);

      expect(write).toHaveBeenCalledWith(expected);
    });

    it('should not end response', () => {
      finishStreamAsJSON(res, counter);

      expect(end).not.toHaveBeenCalled();
    });
  });

  describe('counter has ended', () => {
    beforeEach(() => {
      canTickMore.mockImplementationOnce(() => false);
    });

    it('should end  whole json object', () => {
      const expected = '}';

      finishStreamAsJSON(res, counter);

      expect(write).toHaveBeenCalledWith(expected);
    });

    it('should end response', () => {
      finishStreamAsJSON(res, counter);

      expect(end).toHaveBeenCalledWith();
    });
  });
});

describe('handleOriginError', () => {
  const resume = jest.fn();
  const write = jest.fn();
  const emit = jest.fn();

  const origin = {
    resume,
  };
  const destination = {
    write,
    emit,
  };

  afterEach(() => {
    resume.mockReset();
    write.mockReset();
    emit.mockReset();
  });

  it('should consume the data from a stream without actual processing', () => {
    const message = 'message';

    handleOriginError(origin, destination, message);

    expect(resume).toHaveBeenCalledWith();
  });

  it('should report error with provided message', () => {
    const message = 'message';
    const expected = JSON.stringify({
      error: true,
      reason: 'message',
    });

    handleOriginError(origin, destination, message);

    expect(write).toHaveBeenCalledWith(expected);
  });

  it('should finish destination stream', () => {
    const message = 'message';
    const expected = ['end'];

    handleOriginError(origin, destination, message);

    expect(emit).toHaveBeenCalledWith(...expected);
  });
});
