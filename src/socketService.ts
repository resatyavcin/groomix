import { io, Socket } from 'socket.io-client';
import { type SocketEventPayloads } from './socketEvents';

let socket: Socket | null = null;

export function connectSocket(apiUrl: string) {
  if (!socket) {
    socket = io(apiUrl);
  }
  return socket;
}

export function emitEvent<K extends keyof SocketEventPayloads>(event: K, payload: SocketEventPayloads[K]) {
  if (!socket) throw new Error('Socket not connected');
  socket.emit(event, payload);
}

export function onSocketEvent<K extends keyof SocketEventPayloads>(
  event: K,
  handler: (payload: SocketEventPayloads[K]) => void
) {
  socket?.on(event, handler as any);
}

export function offSocketEvent<K extends keyof SocketEventPayloads>(
  event: K,
  handler: (payload: SocketEventPayloads[K]) => void
) {
  socket?.off(event, handler as any);
}

export function disconnectSocket() {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
}

export function getSocket() {
  return socket;
}
