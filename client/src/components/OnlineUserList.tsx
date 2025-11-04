import { For, Show, createMemo } from 'solid-js';
import { Tag, Skeleton, TagLeftIcon } from '@hope-ui/solid';
import { useAppStore } from '@/store';
import type { User } from '@/store/appStore';
import { WifiOff } from 'lucide-solid';

interface UserTagProps {
  user: User;
  isPublicVote: boolean;
}

const UserTag = ({ user, isPublicVote }: UserTagProps) => {
  const hasSelectedScore = () => !!user.selectedScore?.scoreId;
  const tagVariant = () => (hasSelectedScore() ? 'solid' : 'subtle');
  const colorScheme = () => (user.isOnline ? 'success' : 'danger');

  return (
    <>
      <Show when={isPublicVote}>
        <span class="font-bold">{user?.selectedScore?.score}</span>
      </Show>
      <Tag variant={tagVariant()} colorScheme={colorScheme()}>
        <Show when={!user.isOnline}>
          <TagLeftIcon as={WifiOff} />
        </Show>
        {user.name}
      </Tag>
    </>
  );
};

const OnlineUserList = () => {
  const [state] = useAppStore();

  const isPublicVote = createMemo(() => state.room?.isPublicVote ?? false);

  return (
    <div class="flex items-center flex-wrap gap-4 justify-center mt-6">
      <Show when={state.onlineUsers} fallback={<Skeleton height="20px" />}>
        <For each={state.onlineUsers}>
          {(user) => <UserTag user={user} isPublicVote={isPublicVote()} />}
        </For>
      </Show>
    </div>
  );
};

export default OnlineUserList;
