import mongoose, { Document, Schema, Types } from 'mongoose';

// This is the new, plain object type that needs to be added.
// It represents the data after .lean() is used.
export type ProductType = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  category: 'PCs' | 'Accessories';
  type?: 'gamer' | 'burautique' | 'multimedia' | 'convertible';
  condition: 'Neuf' | 'Comme neuf' | 'Execellent' | 'Bon' | 'fonctionelle avec default';
  images: string[];
  stock: number;
  isOnPromotion: boolean;
  createdAt: Date;
  updatedAt: Date;
}

// This is the updated interface for the full Mongoose Document.
export interface IProduct extends Document, Omit<ProductType, '_id'> {}

const ProductSchema: Schema = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['PCs', 'Accessories'], required: true, index: true },
    type: { type: String, enum: ['gamer', 'burautique', 'multimedia', 'convertible'], index: true },
    condition: { type: String, enum: ['Neuf', 'Comme neuf', 'Execellent', 'Bon', 'fonctionelle avec default'], required: true, index: true },
    images: [{ type: String, required: true }],
    stock: { type: Number, required: true, default: 1 },
    isOnPromotion: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);