export const SOCKET_EVENTS = {
  JOIN_ROOM: 'join-room',
  ROOM_USERS: 'room-users',
  SCORE_UPDATE: 'score-update',
  SHOW_ALL_SCORES: 'show-all-scores',
  IS_RESET: 'isReset',
} as const;

export type SocketEventKey = keyof typeof SOCKET_EVENTS;
export type SocketEventName = (typeof SOCKET_EVENTS)[SocketEventKey];

export interface SocketEventPayloads {
  [SOCKET_EVENTS.JOIN_ROOM]: {
    room: string;
    name: string;
    isAdmin?: boolean;
    deviceId?: string;
  };
  [SOCKET_EVENTS.ROOM_USERS]: { users: { id: string; name: string }[] };
  [SOCKET_EVENTS.SCORE_UPDATE]: { userId: string; score: number };
  [SOCKET_EVENTS.SHOW_ALL_SCORES]: { scores: Record<string, number> };
  [SOCKET_EVENTS.IS_RESET]: { reason?: string };
}
