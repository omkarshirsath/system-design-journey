import React, { useState, useEffect, useRef } from 'react';
import { Send, User, Circle, LogOut, MessageSquare } from 'lucide-react';
import { useSocket } from './hooks/useSocket.ts';
import { format } from 'date-fns';
import './App.css';

interface Message {
  senderId: string;
  receiverId: string;
  content: string;
  createdAt: string | Date;
}

const ChatApp: React.FC = () => {
  const [userId, setUserId] = useState<string>('');
  const [targetUserId, setTargetUserId] = useState<string>('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<string[]>([]);
  const [activeChats, setActiveChats] = useState<string[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const { isConnected, sendMessage, onMessage, onUserList, fetchHistory } = useSocket(userId);

  useEffect(() => {
    if (isLoggedIn) {
      const unsubMessages = onMessage((message: Message) => {
        setMessages((prev) => [...prev, message]);
        // Add to active chats if not already there
        setActiveChats((prev) => {
          if (!prev.includes(message.senderId)) return [...prev, message.senderId];
          return prev;
        });
      });

      const unsubUsers = onUserList((users: string[]) => {
        setOnlineUsers(users.filter(u => u !== userId));
      });

      return () => {
        unsubMessages();
        unsubUsers();
      };
    }
  }, [isLoggedIn, onMessage, onUserList, userId]);

  useEffect(() => {
    if (isLoggedIn && targetUserId) {
      fetchHistory(targetUserId, (history: Message[]) => {
        setMessages(history.reverse()); // Reverse to show oldest first in list
      });
    }
  }, [isLoggedIn, targetUserId, fetchHistory]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId.trim()) setIsLoggedIn(true);
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputMessage.trim() || !targetUserId.trim()) return;

    const newMessage: Message = {
      senderId: userId,
      receiverId: targetUserId,
      content: inputMessage,
      createdAt: new Date(),
    };

    setMessages((prev) => [...prev, newMessage]);
    sendMessage(targetUserId, inputMessage);
    setInputMessage('');
  };

  if (!isLoggedIn) {
    return (
      <div className="login-container animate-fade">
        <div className="login-card">
          <div className="icon-wrapper">
            <MessageSquare size={40} className="primary-icon" />
          </div>
          <h1>Join Chat</h1>
          <p>Enter your unique User ID to start messaging.</p>
          <form onSubmit={handleLogin}>
            <input
              type="text"
              placeholder="Your User ID (e.g., Alice)"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              className="premium-input"
              required
            />
            <button type="submit" className="premium-button">Get Started</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="chat-container animate-fade">
      <div className="chat-sidebar">
        <div className="sidebar-header">
          <div className="user-profile">
            <div className="avatar">
              <User size={24} />
            </div>
            <div className="user-info">
              <span className="username">{userId}</span>
              <span className="status">
                <Circle size={8} fill={isConnected ? 'var(--success)' : 'var(--error)'} className="status-dot" />
                {isConnected ? 'Online' : 'Reconnecting...'}
              </span>
            </div>
          </div>
          <button className="icon-button" onClick={() => setIsLoggedIn(false)}>
            <LogOut size={20} />
          </button>
        </div>
        
        <div className="sidebar-content">
          <div className="online-users-section">
            <p className="section-title">Online Now</p>
            <div className="online-avatars">
              {onlineUsers.length > 0 ? onlineUsers.map(user => (
                <div 
                  key={user} 
                  className={`online-avatar-item ${targetUserId === user ? 'active' : ''}`}
                  onClick={() => setTargetUserId(user)}
                  title={user}
                >
                  <div className="avatar-sm">
                    <User size={16} />
                  </div>
                  <Circle size={10} fill="var(--success)" className="online-indicator" />
                </div>
              )) : <p className="empty-small">No others online</p>}
            </div>
          </div>

          <div className="search-section">
            <label>Start New Chat</label>
            <input
              type="text"
              placeholder="User ID (e.g., Bob)"
              value={targetUserId}
              onChange={(e) => setTargetUserId(e.target.value)}
              className="premium-input-sm"
            />
          </div>

          <div className="recent-chats">
            <p className="section-title">Active Conversations</p>
            {activeChats.map(chatUser => (
              <div 
                key={chatUser} 
                className={`chat-item ${targetUserId === chatUser ? 'active' : ''}`}
                onClick={() => setTargetUserId(chatUser)}
              >
                <div className="avatar-sm">
                  <User size={16} />
                </div>
                <span>{chatUser}</span>
              </div>
            ))}
            {targetUserId && !activeChats.includes(targetUserId) && (
              <div className="chat-item active">
                <div className="avatar-sm">
                  <User size={16} />
                </div>
                <span>{targetUserId}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="chat-main">
        {targetUserId ? (
          <>
            <div className="chat-header">
              <div className="header-info">
                <h3>{targetUserId}</h3>
                <p>Direct Message</p>
              </div>
            </div>

            <div className="message-list">
              {messages.map((msg, index) => (
                <div key={index} className={`message-wrapper ${msg.senderId === userId ? 'sent' : 'received'}`}>
                  <div className="message-bubble">
                    <p>{msg.content}</p>
                    <span className="timestamp">
                      {format(new Date(msg.createdAt), 'HH:mm')}
                    </span>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            <form className="message-input-area" onSubmit={handleSend}>
              <input
                type="text"
                placeholder="Type a message..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="premium-input-chat"
              />
              <button type="submit" className="send-button" disabled={!inputMessage.trim()}>
                <Send size={20} />
              </button>
            </form>
          </>
        ) : (
          <div className="empty-state">
            <MessageSquare size={64} className="muted-icon" />
            <h2>No Conversation Selected</h2>
            <p>Enter a Target User ID in the sidebar to start chatting.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatApp;
