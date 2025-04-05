import { Request, Response, NextFunction } from 'express';
import User, { UserRole, IUser } from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

// Set cookie options
const sendTokenResponse = (user: IUser, statusCode: number, res: Response) => {
  // Create token
  const token = user.getSignedJwtToken();

  const options = {
    expires: new Date(
      Date.now() + parseInt(process.env.JWT_COOKIE_EXPIRE as string || '30') * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production'
  };

  res
    .status(statusCode)
    .cookie('token', token, options)
    .json({
      success: true,
      token
    });
};

/**
 * @desc    Register user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
export const register = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { name, email, password } = req.body;

    // Create user
    const user = await User.create({
      name,
      email,
      password,
      role: UserRole.USER // Default role
    });

    // Send token response
    sendTokenResponse(user, 201, res);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
export const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;

    // Validate email & password
    if (!email || !password) {
      return next(new ErrorResponse('Please provide an email and password', 400));
    }

    // Check for user
    const user = await User.findOne({ email }).select('+password');

    if (!user) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Check if password matches
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      return next(new ErrorResponse('Invalid credentials', 401));
    }

    // Send token response
    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Log user out / clear cookie
 * @route   GET /api/v1/auth/logout
 * @access  Private
 */
export const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.cookie('token', 'none', {
      expires: new Date(Date.now() + 10 * 1000),
      httpOnly: true
    });

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get current logged in user
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
export const getMe = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id);

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update user details
 * @route   PUT /api/v1/auth/updatedetails
 * @access  Private
 */
export const updateDetails = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email
    };

    const user = await User.findByIdAndUpdate(req.user?.id, fieldsToUpdate, {
      new: true,
      runValidators: true
    });

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update password
 * @route   PUT /api/v1/auth/updatepassword
 * @access  Private
 */
export const updatePassword = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.user?.id).select('+password');

    if (!user) {
      return next(new ErrorResponse('User not found', 404));
    }

    // Check current password
    const isMatch = await user.matchPassword(req.body.currentPassword);

    if (!isMatch) {
      return next(new ErrorResponse('Password is incorrect', 401));
    }

    user.password = req.body.newPassword;
    await user.save();

    sendTokenResponse(user, 200, res);
  } catch (err) {
    next(err);
  }
}; 