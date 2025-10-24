//components
import TooltipForBadgeColorGrouping from '../components/TooltipForBadgeColorGrouping';
import { Heading, Skeleton, Tag } from '@hope-ui/solid';
import GroomingCard from '../components/GroomingCard';
import { useAppStore } from '../store';
import { useSocket, type SocketHandlers } from '../hooks/useSocket';
import { createSignal, For, Match, onMount, Show, Switch } from 'solid-js';
import type { User } from '../store/appStore';
import { GroomingCardContentList } from '../../constants/GroomingCardContentList';

const RoomPage = () => {
  const [state] = useAppStore();
  const [userList, setUserList] = createSignal<User[]>();

  onMount(() => {
    const user = state.user;
    const room = state.room;
    const setHandlers: SocketHandlers = {
      onUsers: (users: User[]) => {
        setUserList(users);
      },
      onScoreUpdate: (data) => {
        const updatedUser = data.user;
        setUserList((prev) => prev?.map((u) => (u.id === updatedUser.id ? { ...u, ...updatedUser } : u)));
      },
    };
    if (user && room) useSocket({ user, room, setHandlers });
  });

  return (
    <div class="flex flex-col items-center gap-y-6 ">
      <TooltipForBadgeColorGrouping />
      <Heading size="4xl">TEXAS Groomix Planlama</Heading>

      <div class="flex flex-wrap gap-4 justify-center mt-6">
        <Show when={userList()} fallback={<Skeleton height="20px" />}>
          <For each={userList()}>
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

      <div class="flex items-center justify-center flex-wrap  gap-4 w-2/6">
        {GroomingCardContentList.map((content, _) => (
          <GroomingCard scoreId={content.scoreId} score={content.score} scoreComponent={content.scoreComponent} />
        ))}
      </div>
    </div>
  );
};

export default RoomPage;
