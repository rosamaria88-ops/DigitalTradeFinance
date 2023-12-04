class InvalidSessionIdentierError extends Error {
  constructor(sessionIdentier) {
    const message = `Invalid sessionIdentier: ${sessionIdentier}`;
    super(message);
    this.name = this.constructor.name;
  }
}

module.exports = InvalidSessionIdentierError;
