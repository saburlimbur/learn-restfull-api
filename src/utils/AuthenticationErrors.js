class AuthenticationError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
    this.name = 'AuthenticatioError!';
  }
}

export { AuthenticationError };
