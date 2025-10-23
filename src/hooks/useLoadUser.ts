import { onMount } from 'solid-js';
import { useAppStore } from '../store/index.tsx';

export function useLoadUser() {
  const [_, { setUser, setLoading }] = useAppStore();

  onMount(() => {
    try {
      // Yüklenme başlıyor
      setLoading(true);

      const saved = localStorage.getItem('user');
      if (saved) {
        const user = JSON.parse(saved);
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (err) {
      console.error("LocalStorage'dan kullanıcı yüklenemedi:", err);
      setUser(null);
    } finally {
      setLoading(false);
    }
  });
}
