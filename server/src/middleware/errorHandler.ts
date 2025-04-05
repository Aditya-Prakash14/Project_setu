import { Request, Response } from 'express';
import ErrorResponse from '../utils/errorResponse.js';

interface MongooseError extends Error {
  code?: number;
  errors?: Record<string, { message: string }>;
}

/**
 * Custom error handler middleware
 * Formats and sends appropriate error responses
 */
const errorHandler = (
  err: Error | ErrorResponse | MongooseError,
  req: Request,
  res: Response
): void => {
  let error = { ...err };
  error.message = err.message;

  // Log for dev
  console.error(err);

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = new ErrorResponse(message, 404);
  }

  // Mongoose duplicate key
  if ((err as MongooseError).code === 11000) {
    const message = 'Duplicate field value entered';
    error = new ErrorResponse(message, 400);
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const mongooseErr = err as MongooseError;
    const message = mongooseErr.errors 
      ? Object.values(mongooseErr.errors).map(val => val.message).join(', ')
      : 'Validation Error';
    error = new ErrorResponse(message, 400);
  }

  // JSON Web Token error
  if (err.name === 'JsonWebTokenError') {
    const message = 'Not authorized to access this route';
    error = new ErrorResponse(message, 401);
  }

  // JWT expired error
  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired, please log in again';
    error = new ErrorResponse(message, 401);
  }

  res.status((error as ErrorResponse).statusCode || 500).json({
    success: false,
    error: error.message || 'Server Error',
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

export default errorHandler; 