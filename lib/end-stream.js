/**
 *
 * @param res Express.ServerResponse
 * @param counter Counter
 */
const finishStreamAsJSON = (res, counter) => {
  counter.tick();

  if (counter.canTickMore()) {
    res.write(',');
  } else {
    res.write(`}`);
    res.end();
  }
};

/**
 *
 * @param origin http.IncomingMessage
 * @param destination stream.PassThrough
 * @param message string
 */
const handleOriginError = (origin, destination, message) => {
  origin.resume();

  destination.write(`{"error":true,"reason":"${message}"}`);
  destination.emit('end');
};

module.exports = {
  finishStreamAsJSON,
  handleOriginError,
};
