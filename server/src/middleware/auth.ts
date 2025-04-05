import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { UserRole, IUser } from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// Interface for JWT payload
interface JwtPayload {
  id: string;
}

// Extend Express Request interface to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

/**
 * Middleware to protect routes - verifies the JWT token and adds the user to the request
 */
export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token = '';

  // Check if token exists in Authorization header (Bearer token)
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    // Set token from Bearer token in header
    token = req.headers.authorization.split(' ')[1];
  } 
  // Check if token exists in cookie
  else if (req.cookies.token) {
    token = req.cookies.token;
  }

  // Make sure token exists
  if (!token) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as JwtPayload;

    // Find the user by id
    const user = await User.findById(decoded.id);

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (err) {
    return next(new ErrorResponse('Not authorized to access this route', 401));
  }
};

/**
 * Middleware to authorize specific roles
 */
export const authorize = (...roles: UserRole[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.user) {
      return next(new ErrorResponse('User not found', 404));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `User role ${req.user.role} is not authorized to access this route`,
          403
        )
      );
    }
    next();
  };
}; 