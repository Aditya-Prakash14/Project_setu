import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Blog, { IBlog } from '../models/Blog.js';
import ErrorResponse from '../utils/errorResponse.js';

/**
 * @desc    Get all blogs with pagination, filtering, and sorting
 * @route   GET /api/v1/blogs
 * @access  Public
 */
export const getBlogs = async (req: Request, res: Response, next: NextFunction) => {
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
    let query = Blog.find(JSON.parse(queryStr));
    
    // Handle search (simple text search)
    if (req.query.search) {
      const searchQuery = {
        $or: [
          { title: { $regex: req.query.search, $options: 'i' } },
          { summary: { $regex: req.query.search, $options: 'i' } },
          { categories: { $regex: req.query.search, $options: 'i' } },
          { tags: { $regex: req.query.search, $options: 'i' } }
        ]
      };
      query = Blog.find(searchQuery);
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
    const total = await Blog.countDocuments();
    
    query = query.skip(startIndex).limit(limit);
    
    // If user is not admin, only show published blogs
    if (!req.user || req.user.role !== 'admin') {
      query = query.find({ status: 'published' });
    }
    
    // Add author data
    query = query.populate({
      path: 'author',
      select: 'name avatar'
    });
    
    // Execute query
    const blogs = await query;
    
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
      count: blogs.length,
      pagination,
      data: blogs
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get single blog by ID or slug
 * @route   GET /api/v1/blogs/:id
 * @access  Public
 */
export const getBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let blog;
    
    // Check if param is MongoDB ObjectId or slug
    if (mongoose.Types.ObjectId.isValid(req.params.id)) {
      blog = await Blog.findById(req.params.id).populate({
        path: 'author',
        select: 'name avatar bio'
      });
    } else {
      blog = await Blog.findOne({ slug: req.params.id }).populate({
        path: 'author',
        select: 'name avatar bio'
      });
    }
    
    if (!blog) {
      return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
    }
    
    // If blog is a draft and user is not admin, return 404
    if (blog.status === 'draft' && (!req.user || req.user.role !== 'admin')) {
      return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
    }
    
    // Increment view count if not admin
    if (!req.user || req.user.role !== 'admin') {
      blog.viewCount = blog.viewCount + 1;
      await blog.save();
    }
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Create new blog
 * @route   POST /api/v1/blogs
 * @access  Private
 */
export const createBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Add author to req.body
    if (req.user) {
      req.body.author = req.user.id;
    }
    
    const blog = await Blog.create(req.body);
    
    res.status(201).json({
      success: true,
      data: blog
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Update blog
 * @route   PUT /api/v1/blogs/:id
 * @access  Private
 */
export const updateBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    let blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
    }
    
    // Make sure user is blog owner or admin
    if (req.user && blog.author instanceof mongoose.Types.ObjectId && 
        blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this blog`, 401));
    }
    
    blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    
    res.status(200).json({
      success: true,
      data: blog
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Delete blog
 * @route   DELETE /api/v1/blogs/:id
 * @access  Private
 */
export const deleteBlog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const blog = await Blog.findById(req.params.id);
    
    if (!blog) {
      return next(new ErrorResponse(`Blog not found with id of ${req.params.id}`, 404));
    }
    
    // Make sure user is blog owner or admin
    if (req.user && blog.author instanceof mongoose.Types.ObjectId && 
        blog.author.toString() !== req.user.id && req.user.role !== 'admin') {
      return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this blog`, 401));
    }
    
    await blog.deleteOne();
    
    res.status(200).json({
      success: true,
      data: {}
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get featured blogs
 * @route   GET /api/v1/blogs/featured
 * @access  Public
 */
export const getFeaturedBlogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const limit = parseInt(req.query.limit as string, 10) || 3;
    
    const blogs = await Blog.find({ 
      status: 'published',
      isFeatured: true 
    })
    .sort('-publishedAt')
    .limit(limit)
    .populate({
      path: 'author',
      select: 'name avatar'
    });
    
    res.status(200).json({
      success: true,
      count: blogs.length,
      data: blogs
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @desc    Get blogs by category
 * @route   GET /api/v1/blogs/category/:category
 * @access  Public
 */
export const getBlogsByCategory = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const page = parseInt(req.query.page as string, 10) || 1;
    const limit = parseInt(req.query.limit as string, 10) || 10;
    const startIndex = (page - 1) * limit;
    
    const category = req.params.category;
    
    const blogs = await Blog.find({ 
      categories: category,
      status: 'published'
    })
    .sort('-publishedAt')
    .skip(startIndex)
    .limit(limit)
    .populate({
      path: 'author',
      select: 'name avatar'
    });
    
    const total = await Blog.countDocuments({ 
      categories: category,
      status: 'published'
    });
    
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
      count: blogs.length,
      pagination,
      data: blogs
    });
  } catch (err) {
    next(err);
  }
}; 