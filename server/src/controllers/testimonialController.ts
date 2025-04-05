import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Testimonial from '../models/Testimonial.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc    Get all testimonials with pagination, filtering, and sorting
 * @route   GET /api/v1/testimonials
 * @access  Public
 */
export const getTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Copy req.query to avoid modifying the original
    const reqQuery = { ...req.query };
    
    // Fields to exclude from filtering
    const removeFields = ['select', 'sort', 'page', 'limit', 'search'];
    removeFields.forEach(param => delete reqQuery[param]);
    
    // Create query string and replace operators with MongoDB operators
    let queryStr = JSON.stringify(reqQuery);
    queryStr = queryStr.replace(/\b(gt|gte|lt|lte|in)\b/g, match => `$${match}`);
    
    // Find resources
    let query = Testimonial.find(JSON.parse(queryStr));
    
    // By default, only show verified testimonials
    if (!req.user || req.user.role !== 'admin') {
      query = query.find({ verified: true });
    }
    
    // Handle search
    if (req.query.search) {
      const searchQuery = {
        $or: [
          { name: { $regex: req.query.search, $options: 'i' } },
          { content: { $regex: req.query.search, $options: 'i' } },
          { organization: { $regex: req.query.search, $options: 'i' } }
        ]
      };
      query = Testimonial.find(searchQuery);
    }
    
    // Handle select fields
    if (req.query.select) {
      const fields = (req.query.select as string).split(',').join(' ');
      query = query.select(fields);
    }
    
    // Handle sorting
    if (req.query.sort) {
      const sortBy = (req.query.sort as string).split(',').join(' ');
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sort by most recent
    }
    
    // Pagination
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const total = await Testimonial.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // If related to project, populate project details
    if (req.query.populate) {
      query = query.populate({
        path: 'projectRelated',
        select: 'title slug'
      });
    }
    
    // Execute query
    const testimonials = await query;
    
    // Pagination result
    const pagination: Record<string, unknown> = {};
    
    if (endIndex < total) {
      pagination.next = {
        page: page + 1,
        limit
      };
    }
    
    if (startIndex > 0) {
      pagination.prev = {
        page: page - 1,
        limit
      };
    }
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      pagination,
      data: testimonials
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single testimonial
 * @route   GET /api/v1/testimonials/:id
 * @access  Public
 */
export const getTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id).populate({
      path: 'projectRelated',
      select: 'title slug'
    });
    
    if (!testimonial) {
      return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }
    
    // If testimonial is not verified and user is not admin, return 404
    if (!testimonial.verified && (!req.user || req.user.role !== 'admin')) {
      return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new testimonial
 * @route   POST /api/v1/testimonials
 * @access  Private/Admin
 */
export const createTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // If not admin, testimonial is not verified by default
    if (req.user && req.user.role !== 'admin') {
      req.body.verified = false;
    }
    
    const testimonial = await Testimonial.create(req.body);
    
    res.status(201).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update testimonial
 * @route   PUT /api/v1/testimonials/:id
 * @access  Private/Admin
 */
export const updateTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }
    
    testimonial = await Testimonial.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete testimonial
 * @route   DELETE /api/v1/testimonials/:id
 * @access  Private/Admin
 */
export const deleteTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }
    
    await testimonial.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get featured testimonials
 * @route   GET /api/v1/testimonials/featured
 * @access  Public
 */
export const getFeaturedTestimonials = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 3;
    
    const testimonials = await Testimonial.find({ 
      featured: true,
      verified: true 
    })
    .sort('-createdAt')
    .limit(limit);
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get testimonials by project
 * @route   GET /api/v1/testimonials/project/:projectId
 * @access  Public
 */
export const getTestimonialsByProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { projectId } = req.params;
    
    // Validate projectId
    if (!mongoose.Types.ObjectId.isValid(projectId)) {
      return next(new ErrorResponse(`Invalid project ID: ${projectId}`, 400));
    }
    
    const testimonials = await Testimonial.find({ 
      projectRelated: projectId,
      verified: true 
    })
    .sort('-createdAt');
    
    res.status(200).json({
      success: true,
      count: testimonials.length,
      data: testimonials
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Approve/verify a testimonial
 * @route   PUT /api/v1/testimonials/:id/verify
 * @access  Private/Admin
 */
export const verifyTestimonial = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let testimonial = await Testimonial.findById(req.params.id);
    
    if (!testimonial) {
      return next(new ErrorResponse(`Testimonial not found with id of ${req.params.id}`, 404));
    }
    
    testimonial = await Testimonial.findByIdAndUpdate(
      req.params.id, 
      { verified: true }, 
      {
        new: true,
        runValidators: true
      }
    );
    
    res.status(200).json({
      success: true,
      data: testimonial
    });
  } catch (err) {
    next(err);
  }
}; 