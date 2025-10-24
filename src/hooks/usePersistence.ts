import { onMount, createEffect } from 'solid-js';
import { useAppStore } from '../store';

export function usePersistence() {
  const [state, { setUser, setRoom, setLoading }] = useAppStore();

  onMount(() => {
    try {
      setLoading(true);

      const savedUser = localStorage.getItem('user');
      const savedRoom = localStorage.getItem('room');

      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        setUser(null);
      }

      if (savedRoom) {
        setRoom(JSON.parse(savedRoom));
      } else {
        setRoom(null);
      }
    } catch (err) {
      console.error('LocalStorage yükleme hatası:', err);
      setUser(null);
      setRoom(null);
    } finally {
      setLoading(false);
    }
  });

  createEffect(() => {
    const user = state.user;
    if (user) localStorage.setItem('user', JSON.stringify(user));
    else localStorage.removeItem('user');
  });

  createEffect(() => {
    const room = state.room;
    if (room) localStorage.setItem('room', JSON.stringify(room));
    else localStorage.removeItem('room');
  });
}
