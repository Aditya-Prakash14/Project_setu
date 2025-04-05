import express from 'express';
import {
  getUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
} from '../controllers/userController.js';

import { protect, authorize } from '../middleware/auth.js';
import { UserRole } from '../models/User.js';

const router = express.Router();

// Apply protection and admin authorization to all routes
router.use(protect);
router.use(authorize(UserRole.ADMIN));

router
  .route('/')
  .get(getUsers)
  .post(createUser);

router
  .route('/:id')
  .get(getUser)
  .put(updateUser)
  .delete(deleteUser);

export default router; 