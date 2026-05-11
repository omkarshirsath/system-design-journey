import { Server, Socket } from 'socket.io';
import { ChatService } from '../services/chat.service';
import { MessageSchema } from '../domain/types';
import winston from 'winston';

const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()],
});

export class SocketController {
  private chatService: ChatService;

  constructor(private io: Server) {
    this.chatService = new ChatService();
  }

  public async handleConnection(socket: Socket): Promise<void> {
    const userId = socket.handshake.query.userId as string;

    if (!userId) {
      logger.warn('Connection attempt without userId');
      socket.disconnect();
      return;
    }

    logger.info(`User connected: ${userId} (Socket: ${socket.id})`);
    await this.chatService.setUserOnline(userId, socket.id);
    
    // Join personal room for 1:1 messaging
    socket.join(userId);

    // Broadcast updated user list to everyone
    await this.broadcastUserList();

    socket.on('send_message', async (data, callback) => {
      try {
        const validatedData = MessageSchema.parse({
          ...data,
          senderId: userId,
          createdAt: new Date(),
        });

        const savedMessage = await this.chatService.processMessage(validatedData);

        // Deliver to receiver room
        this.io.to(validatedData.receiverId).emit('receive_message', savedMessage);

        // Acknowledge to sender
        if (callback) callback({ status: 'ok', message: savedMessage });
      } catch (error) {
        logger.error('Message handling error:', error);
        if (callback) callback({ status: 'error', error: 'Invalid message format' });
      }
    });

    socket.on('get_history', async (data, callback) => {
      try {
        const { targetId } = data;
        if (!targetId) return;

        const history = await this.chatService.getHistory(userId, targetId);
        if (callback) callback({ status: 'ok', history });
      } catch (error) {
        logger.error('History fetch error:', error);
        if (callback) callback({ status: 'error', error: 'Failed to fetch history' });
      }
    });

    socket.on('disconnect', async () => {
      logger.info(`User disconnected: ${userId}`);
      await this.chatService.setUserOffline(userId);
      await this.broadcastUserList();
    });
  }

  private async broadcastUserList(): Promise<void> {
    const onlineUsers = await this.chatService.getOnlineUsers();
    this.io.emit('user_list', onlineUsers);
  }
}
