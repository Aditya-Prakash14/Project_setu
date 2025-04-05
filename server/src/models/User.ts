import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export enum UserRole {
  USER = 'user',
  EDITOR = 'editor',
  ADMIN = 'admin'
}

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: UserRole;
  avatar?: string;
  bio?: string;
  position?: string;
  socialLinks?: {
    twitter?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  resetPasswordToken?: string;
  resetPasswordExpire?: Date;
  createdAt: Date;
  updatedAt: Date;
  matchPassword(enteredPassword: string): Promise<boolean>;
  getSignedJwtToken(): string;
}

// Define static methods for the User model
interface UserModel extends Model<IUser> {
  findByEmail(email: string): Promise<IUser | null>;
}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxLength: [50, 'Name cannot be more than 50 characters']
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minLength: [6, 'Password must be at least 6 characters'],
    select: false // Don't return password in queries by default
  },
  role: {
    type: String,
    enum: Object.values(UserRole),
    default: UserRole.USER
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  bio: {
    type: String,
    maxLength: [500, 'Bio cannot be more than 500 characters']
  },
  position: {
    type: String,
    maxLength: [100, 'Position cannot be more than 100 characters']
  },
  socialLinks: {
    twitter: String,
    facebook: String,
    instagram: String,
    linkedin: String
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(this: IUser, next) {
  if (!this.isModified('password')) {
    next();
    return;
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(this: IUser) {
  return jwt.sign(
    { id: this._id },
    process.env.JWT_SECRET || 'defaultsecret', // Fallback for type safety
    { expiresIn: process.env.JWT_EXPIRE || '30d' } // Fallback for type safety
  );
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(this: IUser, enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Static method to find user by email
UserSchema.statics.findByEmail = async function(email: string) {
  return await this.findOne({ email });
};

export default mongoose.model<IUser, UserModel>('User', UserSchema); 