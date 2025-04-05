import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Project from '../models/Project.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc    Get all projects with pagination, filtering, and sorting
 * @route   GET /api/v1/projects
 * @access  Public
 */
export const getProjects = async (req: Request, res: Response, next: NextFunction) => {
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
    let query = Project.find(JSON.parse(queryStr));
    
    // Handle search
    if (req.query.search) {
      const searchQuery = {
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { description: { $regex: req.query.search, $options: 'i' } },
          { category: { $regex: req.query.search, $options: 'i' } }
        ]
      };
      query = Project.find(searchQuery);
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
    const total = await Project.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // Execute query
    const projects = await query;
    
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
      count: projects.length,
      pagination,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single project by ID or slug
 * @route   GET /api/v1/projects/:id
 * @access  Public
 */
export const getProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let project;
    
    // Check if param is MongoDB ObjectId or slug
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      project = await Project.findById(req.params.id);
    } else {
      project = await Project.findOne({ slug: req.params.id });
    }
    
    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.id}`, 404));
    }
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new project
 * @route   POST /api/v1/projects
 * @access  Private/Admin
 */
export const createProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.create(req.body);
    
    res.status(201).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update project
 * @route   PUT /api/v1/projects/:id
 * @access  Private/Admin
 */
export const updateProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let project = await Project.findById(req.params.id);
    
    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.id}`, 404));
    }
    
    project = await Project.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: project
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete project
 * @route   DELETE /api/v1/projects/:id
 * @access  Private/Admin
 */
export const deleteProject = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const project = await Project.findById(req.params.id);
    
    if (!project) {
      return next(new ErrorResponse(`Project not found with id of ${req.params.id}`, 404));
    }
    
    await project.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get featured projects
 * @route   GET /api/v1/projects/featured
 * @access  Public
 */
export const getFeaturedProjects = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 3;
    
    const projects = await Project.find({ featured: true })
      .sort('-createdAt')
      .limit(limit);
    
    res.status(200).json({
      success: true,
      count: projects.length,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get projects by status
 * @route   GET /api/v1/projects/status/:status
 * @access  Public
 */
export const getProjectsByStatus = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { status } = req.params;
    
    // Validate status
    if (!['upcoming', 'ongoing', 'completed'].includes(status)) {
      return next(new ErrorResponse(`Invalid status: ${status}`, 400));
    }
    
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const projects = await Project.find({ status })
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);
      
    const total = await Project.countDocuments({ status });
    
    // Pagination
    const pagination: Record<string, unknown> = {};
    const endIndex = page * limit;
    
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
      count: projects.length,
      pagination,
      data: projects
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get projects by category
 * @route   GET /api/v1/projects/category/:category
 * @access  Public
 */
export const getProjectsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { category } = req.params;
    
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const projects = await Project.find({ category })
      .sort('-createdAt')
      .skip(startIndex)
      .limit(limit);
      
    const total = await Project.countDocuments({ category });
    
    // Pagination
    const pagination: Record<string, unknown> = {};
    const endIndex = page * limit;
    
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
      count: projects.length,
      pagination,
      data: projects
    });
  } catch (err) {
    next(err);
  }
}; 