class Counter {
  constructor(limit = 0) {
    this._value = 0;
    this._limit = limit;
  }

  tick() {
    this._value += 1;
  }

  canTickMore() {
    return this._value < this._limit;
  }

  get value() {
    return this._value;
  }

  get limit() {
    return this._limit;
  }
}

module.exports = Counter;
