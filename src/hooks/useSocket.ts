import { onCleanup, createEffect } from 'solid-js';
import { connectSocket, emitEvent, onSocketEvent, offSocketEvent, disconnectSocket } from '../socketService';
import { SOCKET_EVENTS } from '../socketEvents';
import type { UserContext } from '../types/user';

interface SocketHandlers {
  onUsers?: (data: any) => void;
  onScoreUpdate?: (data: any) => void;
  onShowAllScores?: (data: any) => void;
  isReset?: (data: any) => void;
}

type UseSocketParams = {
  user: UserContext;
  setHandlers: SocketHandlers;
};

export function useSocket({ user, setHandlers }: UseSocketParams) {
  const { room, username, isAdmin, deviceId } = user;

  createEffect(() => {
    if (!room || !username?.trim() || username === 'null' || username === 'undefined') return;

    const socket = connectSocket(import.meta.env.VITE_API_URL);

    const handleConnect = () => {
      emitEvent(SOCKET_EVENTS.JOIN_ROOM, { room, name: username, isAdmin, deviceId });
    };

    socket.on('connect', handleConnect);

    if (setHandlers.onUsers) onSocketEvent(SOCKET_EVENTS.ROOM_USERS, setHandlers.onUsers);
    if (setHandlers.onScoreUpdate) onSocketEvent(SOCKET_EVENTS.SCORE_UPDATE, setHandlers.onScoreUpdate);
    if (setHandlers.onShowAllScores) onSocketEvent(SOCKET_EVENTS.SHOW_ALL_SCORES, setHandlers.onShowAllScores);
    if (setHandlers.isReset) onSocketEvent(SOCKET_EVENTS.IS_RESET, setHandlers.isReset);

    onCleanup(() => {
      socket.off('connect', handleConnect);
      if (setHandlers.onUsers) offSocketEvent(SOCKET_EVENTS.ROOM_USERS, setHandlers.onUsers);
      if (setHandlers.onScoreUpdate) offSocketEvent(SOCKET_EVENTS.SCORE_UPDATE, setHandlers.onScoreUpdate);
      if (setHandlers.onShowAllScores) offSocketEvent(SOCKET_EVENTS.SHOW_ALL_SCORES, setHandlers.onShowAllScores);
      if (setHandlers.isReset) offSocketEvent(SOCKET_EVENTS.IS_RESET, setHandlers.isReset);
      disconnectSocket();
    });
  });
}
