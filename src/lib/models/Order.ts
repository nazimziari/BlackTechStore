import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// This is the plain object type, useful for passing data to client components
export type OrderType = {
  _id: Types.ObjectId;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  customerCity: string; // Changed from Wilaya to City
  customerAddress: string;
  products: {
    productId: Types.ObjectId;
    name: string;
    price: number;
    quantity: number;
  }[];
  totalAmount: number;
  status: 'Pending' | 'Confirmed' | 'Shipped' | 'Delivered' | 'Cancelled'; // Status is back
  createdAt: Date;
  updatedAt: Date;
}

// This is the Mongoose Document interface
export interface IOrder extends Document, Omit<OrderType, '_id'> {}

// --- THE SCHEMA IS UPDATED HERE ---
const OrderSchema: Schema<IOrder> = new Schema(
  {
    customerName: { type: String, required: true },
    customerEmail: { type: String, required: true },
    customerPhone: { type: String, required: true },
    customerCity: { type: String, required: true }, // Changed from Wilaya to City
    customerAddress: { type: String, required: true },
    products: [
      {
        productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
        name: { type: String, required: true },
        price: { type: Number, required: true },
        quantity: { type: Number, required: true },
      },
    ],
    totalAmount: { type: Number, required: true },
    // The 'status' field is added back, with a default of 'Pending'
    status: {
      type: String,
      enum: ['Pending', 'Confirmed', 'Shipped', 'Delivered', 'Cancelled'],
      default: 'Pending',
      index: true,
    },
  },
  { timestamps: true }
);

// This ensures the model is only compiled once
const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;