/**
 * Custom error class for API errors
 * Extends the built-in Error class with a statusCode property
 */
class ErrorResponse extends Error {
  statusCode: number;
  
  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
  }
}

export default ErrorResponse; 