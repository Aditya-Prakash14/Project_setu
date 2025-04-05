import express from 'express';
import {
  getBlogs,
  getBlog,
  createBlog,
  updateBlog,
  deleteBlog,
  getFeaturedBlogs,
  getBlogsByCategory
} from '../controllers/blogController.js';

import { protect } from '../middleware/auth.js';

const router = express.Router();

// Special routes
router.get('/featured', getFeaturedBlogs);
router.get('/category/:category', getBlogsByCategory);

// Regular routes
router
  .route('/')
  .get(getBlogs)
  .post(protect, createBlog);

router
  .route('/:id')
  .get(getBlog)
  .put(protect, updateBlog)
  .delete(protect, deleteBlog);

export default router; 