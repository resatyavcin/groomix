import { createContext } from 'solid-js';
import type { GroomingCardContentType } from '../../constants/GroomingCardContentList';

interface User {
  readonly id: string;
  selectedScore?: Pick<GroomingCardContentType, 'score' | 'scoreId'>;
  name: string;
  isAdmin: boolean;
  deviceId: string;
  createdAt: Date;
  isOnline?: boolean;
}

interface Room {
  readonly id: string;
  name?: string;
  isPublicVote?: boolean;
  createdAt?: Date;
}

interface CalculateScore {
  winnerScore: number;
  chart: [{ id: number; value: number; label: string; count: number }];
}

interface AppState {
  user: User | null;
  onlineUsers: User[];
  selectedScore?: Pick<GroomingCardContentType, 'score' | 'scoreId'>;
  calculateScore: CalculateScore | null;
  room: Room | null;
  isLoading: boolean;
}

const AppContext = createContext<
  [
    AppState,
    {
      setUser: (user: User | null) => void;
      setCalculateScore: (calculateScore: CalculateScore) => void;
      setOnlineUsers: (users: User[]) => void;
      setRoom: (room: Room | null) => void;
      setSelectedScore: (selectedScore: Pick<GroomingCardContentType, 'score' | 'scoreId'>) => void;
      setLoading: (val: boolean) => void;
      updateUserScore: (incomingUser: User) => void;
    },
  ]
>();

export { AppContext, type User, type Room, type AppState, type CalculateScore };
