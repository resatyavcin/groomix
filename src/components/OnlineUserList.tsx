import { For, Match, Show, Switch } from 'solid-js';
import { Tag, Skeleton } from '@hope-ui/solid';
import { useAppStore } from '../store';
import type { User } from '../store/appStore';

const OnlineUserList = () => {
  const [state] = useAppStore();

  return (
    <div class="flex flex-wrap gap-4 justify-center mt-6">
      <Show when={state.onlineUsers} fallback={<Skeleton height="20px" />}>
        <For each={state.onlineUsers}>
          {(user: User) => (
            <Switch>
              <Match when={user.selectedScore?.scoreId}>
                <Tag variant="solid" dotPlacement="start" colorScheme="success">
                  {user.name}
                </Tag>
              </Match>
              <Match when={!user.selectedScore?.scoreId}>
                <Tag variant="solid" dotPlacement="start" colorScheme="neutral">
                  {user.name}
                </Tag>
              </Match>
            </Switch>
          )}
        </For>
      </Show>
    </div>
  );
};

export default OnlineUserList;
