import express from 'express';
import {
  getProjects,
  getProject,
  createProject,
  updateProject,
  deleteProject,
  getFeaturedProjects,
  getProjectsByStatus,
  getProjectsByCategory
} from '../controllers/projectController.js';

import { protect, authorize } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = express.Router();

// Special routes
router.get('/featured', getFeaturedProjects);
router.get('/status/:status', getProjectsByStatus);
router.get('/category/:category', getProjectsByCategory);

// Public GET routes
router.route('/')
  .get(getProjects);

router.route('/:id')
  .get(getProject);

// Protected routes for creating, updating, and deleting projects
router.use(protect);
router.use(authorize(UserRole.ADMIN));

router.route('/')
  .post(createProject);

router.route('/:id')
  .put(updateProject)
  .delete(deleteProject);

export default router; 