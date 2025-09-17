import mongoose, { Document, Schema, Model, Types } from 'mongoose';

// Define the shape of a plain message object
export type MessageType = {
  _id: Types.ObjectId;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: Date;
  updatedAt: Date;
}

// Define the shape of a Mongoose Document for a message
export interface IMessage extends Document, Omit<MessageType, '_id'> {}

// --- THE FIX IS HERE ---
// We now explicitly type our model to ensure it has the correct static methods
const MessageSchema: Schema<IMessage> = new Schema(
  {
    name: { type: String, required: [true, 'Name is required.'] },
    email: { type: String, required: [true, 'Email is required.'] },
    phone: { type: String, required: [true, 'Phone number is required.'] },
    message: { type: String, required: [true, 'Message is required.'], maxLength: [100, 'Message cannot exceed 100 characters.'] },
  },
  { timestamps: true }
);

// We define the model variable separately before exporting
const Message: Model<IMessage> = mongoose.models.Message || mongoose.model<IMessage>('Message', MessageSchema);

export default Message;