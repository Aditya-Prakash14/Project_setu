import mongoose, { Document, Schema } from 'mongoose';
import { IUser } from './User.js';

export interface IBlog extends Document {
  title: string;
  slug: string;
  summary: string;
  content: string;
  coverImage: string;
  author: IUser['_id'];
  categories: string[];
  tags: string[];
  isFeatured: boolean;
  status: 'draft' | 'published';
  viewCount: number;
  readTime: number;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxLength: [200, 'Title cannot be more than 200 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  summary: {
    type: String,
    required: [true, 'Please add a summary'],
    maxLength: [500, 'Summary cannot be more than 500 characters']
  },
  content: {
    type: String,
    required: [true, 'Please add content'],
  },
  coverImage: {
    type: String,
    default: 'default-blog-cover.jpg'
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  categories: [{
    type: String,
    trim: true
  }],
  tags: [{
    type: String,
    trim: true
  }],
  isFeatured: {
    type: Boolean,
    default: false
  },
  status: {
    type: String,
    enum: ['draft', 'published'],
    default: 'draft'
  },
  viewCount: {
    type: Number,
    default: 0
  },
  readTime: {
    type: Number,
    default: 0
  },
  publishedAt: {
    type: Date
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug from title
BlogSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Set publishedAt date when status changes to published
  if (this.isModified('status') && this.status === 'published' && !this.publishedAt) {
    this.publishedAt = new Date();
  }

  // Calculate read time (rough estimation based on word count)
  if (this.isModified('content')) {
    const words = this.content.trim().split(/\s+/).length;
    const wpm = 225; // average reading speed
    this.readTime = Math.ceil(words / wpm);
  }

  next();
});

// Add index for faster querying
BlogSchema.index({ title: 'text', summary: 'text', content: 'text' });
BlogSchema.index({ slug: 1 });
BlogSchema.index({ status: 1, publishedAt: -1 });
BlogSchema.index({ categories: 1 });
BlogSchema.index({ tags: 1 });

export default mongoose.model<IBlog>('Blog', BlogSchema); 