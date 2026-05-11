import mongoose, { Schema, Document } from 'mongoose';
import { IMessage } from './types';

export interface IMessageDocument extends IMessage, Document {}

const MessageSchema: Schema = new Schema({
  senderId: { type: String, required: true, index: true },
  receiverId: { type: String, required: true, index: true },
  content: { type: String, required: true },
  status: { 
    type: String, 
    enum: ['sent', 'delivered', 'read'], 
    default: 'sent' 
  },
  createdAt: { type: Date, default: Date.now }
}, {
  timestamps: true
});

// Compound index for fast retrieval of chat history between two users
MessageSchema.index({ senderId: 1, receiverId: 1, createdAt: -1 });

export const MessageModel = mongoose.model<IMessageDocument>('Message', MessageSchema);
