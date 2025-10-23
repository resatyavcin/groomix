import { createStore } from 'solid-js/store';
import { AppContext, type AppState, type User, type Room } from './appStore';
import { useContext } from 'solid-js';

type AppProviderProps = {
  children: any;
};

export function AppProvider(props: AppProviderProps) {
  const [state, setState] = createStore<AppState>({
    user: null,
    room: null,
    isLoading: false,
  });

  const store: [
    AppState,
    {
      setUser: (user: User | null) => void;
      setRoom: (room: Room | null) => void;
      setLoading: (val: boolean) => void;
    },
  ] = [
    state,
    {
      setUser: (user: User | null) => setState('user', user),
      setRoom: (room: Room | null) => setState('room', room),
      setLoading: (val: boolean) => setState('isLoading', val),
    },
  ];

  return <AppContext.Provider value={store}>{props.children}</AppContext.Provider>;
}

export function useAppStore() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useAppStore must be used within <AppProvider>');
  return ctx;
}
