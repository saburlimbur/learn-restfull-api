class ResponseError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'ResponseError!';
  }
}

export { ResponseError };
