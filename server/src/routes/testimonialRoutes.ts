import express from 'express';
import {
  getTestimonials,
  getTestimonial,
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getFeaturedTestimonials,
  getTestimonialsByProject,
  verifyTestimonial
} from '../controllers/testimonialController.js';

import { protect, authorize } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = express.Router();

// Special routes (public)
router.get('/featured', getFeaturedTestimonials);
router.get('/project/:projectId', getTestimonialsByProject);

// Regular routes
router.route('/')
  .get(getTestimonials)
  .post(protect, createTestimonial);

router.route('/:id')
  .get(getTestimonial)
  .put(protect, authorize(UserRole.ADMIN), updateTestimonial)
  .delete(protect, authorize(UserRole.ADMIN), deleteTestimonial);

// Admin-only routes
router.route('/:id/verify')
  .put(protect, authorize(UserRole.ADMIN), verifyTestimonial);

export default router; 