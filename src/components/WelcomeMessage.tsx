import { Match, Show, Switch } from "solid-js";
import { useAppStore } from "../store";

//components
import FallbackWelcomeMessage from "./FallbackWelcomeMessage";

//hope-ui
import { Text } from "@hope-ui/solid";

const WelcomeMessage = () => {
  const [state] = useAppStore();
  useAppStore();

  const { name, isAdmin } = state.user || { name: "Misafir", isAdmin: false };
  return (
    <Show when={!state.isLoading} fallback={<FallbackWelcomeMessage />}>
      <Switch>
        <Match when={!isAdmin}>
          <Text>
            Hoş geldin, <strong>{name}</strong> (Misafir)
          </Text>
        </Match>
        <Match when={isAdmin}>
          <Text>
            Hoş geldin, <strong>{name}</strong> (Admin)
          </Text>
        </Match>
      </Switch>
    </Show>
  );
};

export default WelcomeMessage;
