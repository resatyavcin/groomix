import { Match, Show, Switch } from 'solid-js';
import { useAppStore } from '../store';
import { Wifi, WifiOff } from 'lucide-solid';

//components
import FallbackWelcomeMessage from './FallbackWelcomeMessage';

//hope-ui
import { Text } from '@hope-ui/solid';

const WelcomeMessage = () => {
  const [state] = useAppStore();

  return (
    <Show when={!state.isLoading} fallback={<FallbackWelcomeMessage />}>
      <Wifi color="#159e1e" />
      <WifiOff color="#df0707" />
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
