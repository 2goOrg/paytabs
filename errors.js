// eslint-disable-next-line max-classes-per-file
class BaseError extends Error {
  constructor(code = 0, name = 'UnexpectedError', status = 500, message = 'Internal server error') {
    super(message);

    this.code = code;
    this.name = name;
    this.status = status;
    this.message = message;
  }

  toJson() {
    return {
      error: this.name,
      message: this.message,
    };
  }
}

class ValidationError extends BaseError {
  constructor(message = 'Bad Request', errors) {
    super(0, 'ValidationError', 400, message);
    this.errors = errors;
  }
}

module.exports = {
  BaseError,
  ValidationError
};
