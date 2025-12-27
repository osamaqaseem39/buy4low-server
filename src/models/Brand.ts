import mongoose, { Schema, Document } from 'mongoose';
import { IBrand } from '../types';

export interface IBrandDocument extends Omit<IBrand, '_id'>, Document {}

const brandSchema = new Schema<IBrandDocument>(
  {
    name: {
      type: String,
      required: [true, 'Please add a brand name'],
      trim: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },
    website: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

// Index
brandSchema.index({ slug: 1, isActive: 1 });

export default mongoose.model<IBrandDocument>('Brand', brandSchema);
