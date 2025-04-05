import User, { UserRole } from '../models/User.js';

/**
 * Checks if an admin user exists and creates one if not
 * Uses environment variables for admin credentials
 */
const createAdminUser = async (): Promise<void> => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL;
    const adminPassword = process.env.ADMIN_PASSWORD;
    const adminName = process.env.ADMIN_NAME || 'Admin User';

    // Check if required environment variables are set
    if (!adminEmail || !adminPassword) {
      console.warn('Admin user creation skipped: ADMIN_EMAIL or ADMIN_PASSWORD not set in environment');
      return;
    }

    // Check if an admin user already exists
    const existingAdmin = await User.findOne({ role: UserRole.ADMIN });
    
    if (existingAdmin) {
      console.log('Admin user already exists');
      return;
    }

    // Create admin user
    const admin = await User.create({
      name: adminName,
      email: adminEmail,
      password: adminPassword,
      role: UserRole.ADMIN
    });

    console.log(`Admin user created: ${admin.email}`);
  } catch (error) {
    if (error instanceof Error) {
      console.error(`Error creating admin user: ${error.message}`);
    } else {
      console.error('Unknown error creating admin user');
    }
  }
};

export default createAdminUser; 