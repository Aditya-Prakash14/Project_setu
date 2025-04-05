import express, { Application, Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import connectDB from './config/database.js';
import errorHandler from './middleware/errorHandler.js';
import createAdminUser from './utils/createAdminUser.js';

// Import routes
import authRoutes from './routes/authRoutes.js';
import userRoutes from './routes/userRoutes.js';
import blogRoutes from './routes/blogRoutes.js';
import projectRoutes from './routes/projectRoutes.js';
import testimonialRoutes from './routes/testimonialRoutes.js';
// app.use('/api/v1/settings', settingsRoutes);

// Load environment variables
dotenv.config({ path: './server/.env' });

// Connect to database
connectDB().then(async () => {
  // Create admin user if one doesn't exist
  await createAdminUser();
}).catch(err => {
  console.error('Failed to initialize database and admin user:', err);
});

// Initialize Express app
const app: Application = express();

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Enable CORS
app.use(cors({
  origin: process.env.NODE_ENV === 'development' 
    ? 'http://localhost:5173' // Vite dev server
    : 'https://projectsetu.org',
  credentials: true
}));

// Security headers
app.use(helmet());

// Logging middleware in development
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Get dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Set static folder
app.use('/uploads', express.static(path.join(__dirname, '../../uploads')));

// Define API routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/blogs', blogRoutes);
app.use('/api/v1/projects', projectRoutes);
app.use('/api/v1/testimonials', testimonialRoutes);
// app.use('/api/v1/settings', settingsRoutes);

// Root route
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Project Setu API',
    version: '1.0.0'
  });
});

// 404 handler - must be before the error handler
app.use((req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Resource not found'
  });
});

// Error handling middleware
app.use(errorHandler);

// Set port
const PORT = process.env.PORT || 5001;

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err: Error) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});

export default app; 