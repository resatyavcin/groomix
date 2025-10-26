import type { GroomingCardContentType } from '../constants/GroomingCardContentList';
import type { User } from './store/appStore';

export const SOCKET_EVENTS = {
  JOIN_ROOM: 'join-room',
  ROOM_USERS: 'room-users',
  SCORE_UPDATE: 'score-update',
  RESET_SCORES: 'reset-scores',
  SEND_SCORE: 'send-score',
  SHOW_ALL_SCORES: 'show-all-scores',
  IS_RESET: 'is-reset',
} as const;

export type SocketEventKey = keyof typeof SOCKET_EVENTS;
export type SocketEventName = (typeof SOCKET_EVENTS)[SocketEventKey];

export interface SocketEventPayloads {
  [SOCKET_EVENTS.JOIN_ROOM]: {
    userId: string;
    room: string;
    name: string;
    isAdmin?: boolean;
    deviceId?: string;
  };
  [SOCKET_EVENTS.SEND_SCORE]: Pick<GroomingCardContentType, 'scoreId' | 'score'> & { userId: string };
  [SOCKET_EVENTS.ROOM_USERS]: { users: User[] };
  [SOCKET_EVENTS.SCORE_UPDATE]: { userId: string; score: number };
  [SOCKET_EVENTS.SHOW_ALL_SCORES]: { show: boolean };
  [SOCKET_EVENTS.IS_RESET]: boolean;
}
