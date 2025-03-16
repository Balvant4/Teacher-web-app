class ApiError extends Error {
  constructor(statusCode, message = "Something went wrong", error = null) {
    super(message);
    this.statusCode = statusCode;
    this.success = false;
    this.errors = error || message; // Store error as a string

    Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
