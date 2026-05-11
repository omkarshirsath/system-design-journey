import { z } from 'zod';

export const MessageStatusSchema = z.enum(['sent', 'delivered', 'read']);
export type MessageStatus = z.infer<typeof MessageStatusSchema>;

export const MessageSchema = z.object({
  id: z.string().uuid().optional(),
  senderId: z.string().min(1),
  receiverId: z.string().min(1),
  content: z.string().min(1).max(2000),
  status: MessageStatusSchema.default('sent'),
  createdAt: z.date().default(() => new Date()),
});

export type IMessage = z.infer<typeof MessageSchema>;

export interface IUser {
  id: string;
  username: string;
  isOnline: boolean;
  lastSeen: Date;
}

export interface ChatSession {
  userId: string;
  socketId: string;
}
