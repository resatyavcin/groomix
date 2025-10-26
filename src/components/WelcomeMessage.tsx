import { createSignal, Match, onCleanup, onMount, Show, Switch } from 'solid-js';
import { useAppStore } from '../store';
import { Wifi, WifiOff } from 'lucide-solid';

//components
import FallbackWelcomeMessage from './FallbackWelcomeMessage';

//hope-ui
import { Text } from '@hope-ui/solid';

const OfflineIcon = <WifiOff color="#df0707" />;
const OnlineIcon = <Wifi color="#159e1e" />;
const WelcomeMessage = () => {
  const [state] = useAppStore();
  const [isOnline, setIsOnline] = createSignal(navigator.onLine);

  onMount(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener('online', goOnline);
    window.addEventListener('offline', goOffline);

    onCleanup(() => {
      window.removeEventListener('online', goOnline);
      window.removeEventListener('offline', goOffline);
    });
  });

  onMount(() => {
    console.log(state.user);
  });
  return (
    <Show when={!state.isLoading} fallback={<FallbackWelcomeMessage />}>
      {isOnline() ? OnlineIcon : OfflineIcon}
      <Switch>
        <Match when={!state.user?.isAdmin}>
          <Text>
            Hoş geldin, <strong>{state.user?.name}</strong> (Misafir)
          </Text>
        </Match>
        <Match when={state.user?.isAdmin}>
          <Text>
            Hoş geldin, <strong>{state.user?.name}</strong> (Admin)
          </Text>
        </Match>
      </Switch>
    </Show>
  );
};

export default WelcomeMessage;
