import { Request, Response, NextFunction } from 'express';
import User, { UserRole } from '../models/User.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc    Get all users
 * @route   GET /api/v1/users
 * @access  Private/Admin
 */
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();

    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single user
 * @route   GET /api/v1/users/:id
 * @access  Private/Admin
 */
export const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create user
 * @route   POST /api/v1/users
 * @access  Private/Admin
 */
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.create(req.body);

    res.status(201).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update user
 * @route   PUT /api/v1/users/:id
 * @access  Private/Admin
 */
export const updateUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete user
 * @route   DELETE /api/v1/users/:id
 * @access  Private/Admin
 */
export const deleteUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return next(new ErrorResponse(`User not found with id of ${req.params.id}`, 404));
    }

    // Don't allow deletion of the last admin user
    if (user.role === UserRole.ADMIN) {
      const adminCount = await User.countDocuments({ role: UserRole.ADMIN });
      
      if (adminCount === 1) {
        return next(new ErrorResponse(`Cannot delete the last admin user`, 400));
      }
    }

    await user.deleteOne();

    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
}; 