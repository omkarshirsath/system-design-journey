import { MessageModel, IMessageDocument } from '../domain/models';
import { IMessage } from '../domain/types';

export class MessageRepository {
  async saveMessage(message: Partial<IMessage>): Promise<IMessageDocument> {
    const newMessage = new MessageModel(message);
    return await newMessage.save();
  }

  async getChatHistory(user1Id: string, user2Id: string, limit = 50): Promise<IMessageDocument[]> {
    return await MessageModel.find({
      $or: [
        { senderId: user1Id, receiverId: user2Id },
        { senderId: user2Id, receiverId: user1Id }
      ]
    })
      .sort({ createdAt: -1 })
      .limit(limit)
      .exec();
  }

  async updateMessageStatus(messageId: string, status: IMessage['status']): Promise<void> {
    await MessageModel.findByIdAndUpdate(messageId, { status }).exec();
  }
}
