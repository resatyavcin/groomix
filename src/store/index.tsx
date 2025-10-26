import { createStore } from 'solid-js/store';
import { AppContext, type AppState, type User, type Room } from './appStore';
import { useContext } from 'solid-js';
import type { GroomingCardContentType } from '../../constants/GroomingCardContentList';

type AppProviderProps = {
  children: any;
};

export function AppProvider(props: AppProviderProps) {
  const [state, setState] = createStore<AppState>({
    user: null,
    selectedScore: { scoreId: null, score: null },
    onlineUsers: [],
    room: null,
    isLoading: false,
  });

  const store: [
    AppState,
    {
      setUser: (user: User | null) => void;
      setOnlineUsers: (users: User[]) => void;
      setSelectedScore: (selectedScore: Pick<GroomingCardContentType, 'score' | 'scoreId'>) => void;
      setRoom: (room: Room | null) => void;
      setLoading: (val: boolean) => void;
      updateUserScore: (incomingUser: User) => void;
    },
  ] = [
    state,
    {
      setUser: (user: User | null) => setState('user', user),
      setOnlineUsers: (users: User[]) => {
        setState('onlineUsers', users);
      },
      setSelectedScore: (selectedScore: Pick<GroomingCardContentType, 'score' | 'scoreId'>) =>
        setState('selectedScore', selectedScore),
      setRoom: (room: Room | null) => setState('room', room),
      setLoading: (val: boolean) => setState('isLoading', val),
      updateUserScore: (incomingUser) => {
        const index = state.onlineUsers.findIndex((u) => u.id === incomingUser.id);
        if (index === -1) return;

        // Proxy veya referans problemi olmaması için "flatten" et
        const cleanScore = incomingUser.selectedScore
          ? { ...incomingUser.selectedScore } // yeni referans oluştur
          : { score: null, scoreId: null };
        setState('onlineUsers', index, 'selectedScore', cleanScore);
      },
    },
  ];

  return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used within <AppProvider>');
  return ctx;
}
