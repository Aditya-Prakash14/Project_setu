import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  slug: string;
  description: string;
  detailedDescription?: string;
  location?: string;
  startDate?: Date;
  endDate?: Date;
  status: 'upcoming' | 'ongoing' | 'completed';
  category: string;
  impactMetrics?: {
    beneficiaries?: number;
    volunteers?: number;
    funds?: number;
    customMetrics?: Record<string, number | string>;
  };
  coverImage: string;
  gallery?: string[];
  featured: boolean;
  contactEmail?: string;
  contactPhone?: string;
  socialLinks?: {
    website?: string;
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema = new Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxLength: [100, 'Title cannot be more than 100 characters']
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Please add a description'],
    maxLength: [500, 'Description cannot be more than 500 characters']
  },
  detailedDescription: {
    type: String
  },
  location: {
    type: String
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date
  },
  status: {
    type: String,
    enum: ['upcoming', 'ongoing', 'completed'],
    default: 'upcoming'
  },
  category: {
    type: String,
    required: [true, 'Please add a category']
  },
  impactMetrics: {
    beneficiaries: {
      type: Number,
      default: 0
    },
    volunteers: {
      type: Number,
      default: 0
    },
    funds: {
      type: Number,
      default: 0
    },
    customMetrics: {
      type: Map,
      of: Schema.Types.Mixed
    }
  },
  coverImage: {
    type: String,
    default: 'default-project-cover.jpg'
  },
  gallery: [String],
  featured: {
    type: Boolean,
    default: false
  },
  contactEmail: {
    type: String,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please add a valid email'
    ]
  },
  contactPhone: {
    type: String
  },
  socialLinks: {
    website: String,
    facebook: String,
    twitter: String,
    instagram: String
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Generate slug from title
ProjectSchema.pre('save', function (next) {
  if (this.isModified('title') || !this.slug) {
    this.slug = this.title
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, '')
      .replace(/[\s_-]+/g, '-')
      .replace(/^-+|-+$/g, '');
  }

  // Update status based on dates
  const now = new Date();
  if (this.startDate && this.endDate) {
    if (now < this.startDate) {
      this.status = 'upcoming';
    } else if (now > this.endDate) {
      this.status = 'completed';
    } else {
      this.status = 'ongoing';
    }
  }

  next();
});

// Add indices for faster querying
ProjectSchema.index({ title: 'text', description: 'text' });
ProjectSchema.index({ slug: 1 });
ProjectSchema.index({ status: 1 });
ProjectSchema.index({ category: 1 });
ProjectSchema.index({ featured: 1 });

export default mongoose.model<IProject>('Project', ProjectSchema); 