import express from 'express';
import {
  register,
  login,
  logout,
  getMe,
  updateDetails,
  updatePassword
} from '../controllers/authController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Public routes
router.post('/register', register);
router.post('/login', login);
router.get('/logout', logout);

// Protected routes
router.use(protect); // All routes below this middleware are protected
router.get('/me', getMe);
router.put('/updatedetails', updateDetails);
router.put('/updatepassword', updatePassword);

export default router; 