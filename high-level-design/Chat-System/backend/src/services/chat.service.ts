import { MessageRepository } from '../repositories/message.repository';
import { IMessage } from '../domain/types';
import { redis } from '../infrastructure/redis';

export class ChatService {
  private messageRepository: MessageRepository;
  private memorySessions: Map<string, string> = new Map();

  constructor() {
    this.messageRepository = new MessageRepository();
  }

  async processMessage(messageData: Partial<IMessage>): Promise<IMessage> {
    // Logic for processing, filtering, and saving messages
    const savedMessage = await this.messageRepository.saveMessage(messageData);
    return savedMessage.toObject() as IMessage;
  }

  async getHistory(user1Id: string, user2Id: string): Promise<IMessage[]> {
    const history = await this.messageRepository.getChatHistory(user1Id, user2Id);
    return history.map(h => h.toObject() as IMessage);
  }

  async setUserOnline(userId: string, socketId: string): Promise<void> {
    this.memorySessions.set(userId, socketId);
    try {
      if (redis.status === 'ready') {
        await redis.set(`user:${userId}:status`, 'online');
        await redis.set(`user:${userId}:socket`, socketId);
      }
    } catch (err) {
      // Redis failover handled by memorySessions
    }
  }

  async setUserOffline(userId: string): Promise<void> {
    this.memorySessions.delete(userId);
    try {
      if (redis.status === 'ready') {
        await redis.del(`user:${userId}:status`);
        await redis.del(`user:${userId}:socket`);
      }
    } catch (err) {}
  }

  async getUserSocket(userId: string): Promise<string | null> {
    const memorySocket = this.memorySessions.get(userId);
    if (memorySocket) return memorySocket;

    try {
      if (redis.status === 'ready') {
        return await redis.get(`user:${userId}:socket`);
      }
    } catch (err) {}
    return null;
  }

  async getOnlineUsers(): Promise<string[]> {
    const onlineUsers: Set<string> = new Set();
    
    // Get from memory fallback
    this.memorySessions.forEach((_, userId) => onlineUsers.add(userId));

    // Get from Redis if available
    try {
      if (redis.status === 'ready') {
        const keys = await redis.keys('user:*:status');
        keys.forEach(key => {
          const userId = key.split(':')[1];
          if (userId) onlineUsers.add(userId);
        });
      }
    } catch (err) {}

    return Array.from(onlineUsers);
  }
}
