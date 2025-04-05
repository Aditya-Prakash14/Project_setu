import mongoose, { Document, Schema } from 'mongoose';

export interface ITestimonial extends Document {
  name: string;
  position?: string;
  organization?: string;
  avatar?: string;
  content: string;
  rating?: number;
  featured: boolean;
  projectRelated?: mongoose.Types.ObjectId;
  verified: boolean;
  location?: string;
  createdAt: Date;
  updatedAt: Date;
}

const TestimonialSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    trim: true,
    maxLength: [100, 'Name cannot be more than 100 characters']
  },
  position: {
    type: String,
    trim: true
  },
  organization: {
    type: String,
    trim: true
  },
  avatar: {
    type: String,
    default: 'default-avatar.jpg'
  },
  content: {
    type: String,
    required: [true, 'Please add testimonial content'],
    trim: true,
    maxLength: [1000, 'Testimonial cannot be more than 1000 characters']
  },
  rating: {
    type: Number,
    min: [1, 'Rating must be at least 1'],
    max: [5, 'Rating cannot be more than 5']
  },
  featured: {
    type: Boolean,
    default: false
  },
  projectRelated: {
    type: Schema.Types.ObjectId,
    ref: 'Project'
  },
  verified: {
    type: Boolean,
    default: false
  },
  location: {
    type: String,
    trim: true
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Add indices for faster querying
TestimonialSchema.index({ featured: 1 });
TestimonialSchema.index({ verified: 1 });
TestimonialSchema.index({ projectRelated: 1 });

export default mongoose.model<ITestimonial>('Testimonial', TestimonialSchema); 