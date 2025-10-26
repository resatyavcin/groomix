import { For, Match, Show, Switch } from 'solid-js';
import { Tag, Skeleton, TagLeftIcon } from '@hope-ui/solid';
import { useAppStore } from '../store';
import type { User } from '../store/appStore';
import { Wifi, WifiOff, WifiPen } from 'lucide-solid';

const OnlineUserList = () => {
  const [state] = useAppStore();

  console.log(state.onlineUsers);
  return (
    <div class="flex flex-wrap gap-4 justify-center mt-6">
      <Show when={state.onlineUsers} fallback={<Skeleton height="20px" />}>
        <For each={state.onlineUsers}>
          {(user: User) => (
            <Switch>
              <Match when={user.selectedScore?.scoreId}>
                <div>
                  <Tag variant="solid" colorScheme={!user.isOnline ? 'danger' : 'success'}>
                    <Show when={!user.isOnline}>
                      <TagLeftIcon as={WifiOff} />
                    </Show>
                    {user.name}
                  </Tag>
                </div>
              </Match>
              <Match when={!user.selectedScore?.scoreId}>
                <Tag variant="subtle" colorScheme={!user.isOnline ? 'danger' : 'success'}>
                  <Show when={!user.isOnline}>
                    <TagLeftIcon as={WifiOff} />
                  </Show>
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
