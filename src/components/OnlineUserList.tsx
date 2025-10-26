import { For, Match, Show, Switch } from 'solid-js';
import { Tag, Skeleton, TagLeftIcon } from '@hope-ui/solid';
import { useAppStore } from '../store';
import type { User } from '../store/appStore';
import { WifiOff } from 'lucide-solid';
import TooltipForBadgeColorGrouping from '../components/TooltipForBadgeColorGrouping';

const OnlineUserList = () => {
  const [state] = useAppStore();

  return (
    <div class="flex items-center flex-wrap gap-4 justify-center mt-6">
      <Show when={state.onlineUsers} fallback={<Skeleton height="20px" />}>
        <For each={state.onlineUsers}>
          {(user: User) => (
            <Switch>
              <Match when={user.selectedScore?.scoreId}>
                <Show when={state.room?.isPublicVote}>
                  <span class="font-bold">{user?.selectedScore?.score}</span>
                </Show>
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
                <Show when={state.room?.isPublicVote}>
                  <span class="font-bold">{user?.selectedScore?.score}</span>
                </Show>

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
        <TooltipForBadgeColorGrouping />
      </Show>
    </div>
  );
};

export default OnlineUserList;
