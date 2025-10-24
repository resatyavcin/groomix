import { createContext } from 'solid-js';
import type { GroomingCardContentType } from '../../constants/GroomingCardContentList';

interface User {
  readonly id: string;
  name: string;
  isAdmin: boolean;
  selectedScore?: Pick<GroomingCardContentType, 'score' | 'scoreId'>;
  deviceId: string;
  createdAt: Date;
}

interface Room {
  readonly id: string;
  name: string;
  createdAt: Date;
}

interface AppState {
  user: User | null;
  room: Room | null;
  isLoading: boolean;
}

const AppContext = createContext<
  [
    AppState,
    {
      setUser: (user: User | null) => void;
      setRoom: (room: Room | null) => void;
      setLoading: (val: boolean) => void;
    },
  ]
>();

export { AppContext, type User, type Room, type AppState };
