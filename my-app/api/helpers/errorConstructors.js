export class BaseError extends Error {
  constructor(name, message, status) {
    super(message);
    this.name = name;
    this.status = status;
  }
}

export class ValidationError extends BaseError {
  constructor(message) {
    super("message", message, 400);
  }
}
