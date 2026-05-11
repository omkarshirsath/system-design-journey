import { useEffect, useRef, useState, useCallback } from 'react';
import { io, Socket } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:4000';

export const useSocket = (userId: string) => {
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!userId) return;

    const socket = io(SOCKET_URL, {
      query: { userId },
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to socket server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from socket server');
    });

    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, [userId]);

  const sendMessage = useCallback((receiverId: string, content: string) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('send_message', { receiverId, content }, (ack: any) => {
        if (ack.status === 'error') {
          console.error('Message delivery failed:', ack.error);
        }
      });
    }
  }, []);

  const onMessage = useCallback((handler: (message: any) => void) => {
    socketRef.current?.on('receive_message', handler);
    return () => {
      socketRef.current?.off('receive_message', handler);
    };
  }, []);

  const onUserList = useCallback((handler: (users: string[]) => void) => {
    socketRef.current?.on('user_list', handler);
    return () => {
      socketRef.current?.off('user_list', handler);
    };
  }, []);

  const fetchHistory = useCallback((targetId: string, callback: (history: any[]) => void) => {
    if (socketRef.current?.connected) {
      socketRef.current.emit('get_history', { targetId }, (ack: any) => {
        if (ack.status === 'ok') {
          callback(ack.history);
        }
      });
    }
  }, []);

  return { isConnected, sendMessage, onMessage, onUserList, fetchHistory };
};
