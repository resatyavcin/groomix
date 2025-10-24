import { Match, Show, Switch } from 'solid-js';
import { useAppStore } from '../store';

//components
import FallbackWelcomeMessage from './FallbackWelcomeMessage';

//hope-ui
import { Text } from '@hope-ui/solid';

const WelcomeMessage = () => {
  const [state] = useAppStore();

  return (
    <Show when={!state.isLoading} fallback={<FallbackWelcomeMessage />}>
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
