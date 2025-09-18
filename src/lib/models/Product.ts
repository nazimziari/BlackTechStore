import mongoose, { Document, Schema, Model, Types } from 'mongoose';

export type ProductType = {
  _id: Types.ObjectId;
  name: string;
  description: string;
  price: number;
  promotionalPrice?: number; // --- NEW FIELD ---
  category: 'PCs' | 'Accessories' | 'Other';
  brand: 'Acer' | 'Apple' | 'Asus' | 'HP' | 'Lenovo' | 'MSI' | 'Razer' | 'Samsung' | 'Sony' | 'Toshiba' | 'Custom' | 'Dell' | 'Logitech';
  type?: 'Gamer' | 'Office' | 'Multimedia' | 'Convertible' | 'Keyboard' | 'Mouse' | 'Headset' | 'Webcam';
  condition: 'Neuf' | 'Comme neuf' | 'Execellent' | 'Bon' | 'fonctionelle avec default';
  images: string[];
  stock: number;
  isOnPromotion: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface IProduct extends Document, Omit<ProductType, '_id'> {}

const ProductSchema: Schema<IProduct> = new Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    promotionalPrice: { type: Number }, // --- NEW FIELD ---
    category: { type: String, enum: ['PCs', 'Accessories' , 'Other'], required: true, index: true },
    brand: { type: String, enum: ['Acer', 'Apple', 'Asus', 'HP', 'Lenovo', 'MSI', 'Razer', 'Samsung', 'Sony', 'Toshiba', 'Custom', 'Dell', 'Logitech'], required: true, index: true },
    type: { type: String, enum: ['Gamer', 'Office', 'Multimedia', 'Convertible', 'Keyboard', 'Mouse', 'Headset', 'Webcam'], index: true },
    condition: { type: String, enum: ['Neuf', 'Comme neuf', 'Execellent', 'Bon', 'fonctionelle avec default'], required: true, index: true, },
    images: [{ type: String, required: true }],
    stock: { type: Number, required: true, default: 1 },
    isOnPromotion: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;