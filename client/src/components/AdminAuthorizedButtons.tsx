import { HStack, Button } from '@hope-ui/solid';
import { Show } from 'solid-js';
import { useAppStore } from '@/store';
import { emitEvent, emitEventWithoutPayload } from '@/socketService';
import { SOCKET_EVENTS } from '@/socketEvents';

const AdminAuthorizedButtons = () => {
  const [state, { setSelectedScore }] = useAppStore();
  const handleShowVotes = () => {
    emitEvent(SOCKET_EVENTS.SHOW_ALL_SCORES, { show: !state.room?.isPublicVote });
  };

  const handleResetVotes = () => {
    emitEventWithoutPayload(SOCKET_EVENTS.RESET_SCORES);
    setSelectedScore({ score: null, scoreId: null });
  };
  return (
    <HStack spacing="$4">
      <Show when={state.user?.isAdmin}>
        <Button colorScheme="primary" size="sm" onClick={handleShowVotes}>
          {state.room?.isPublicVote ? 'Gizle' : 'Göster'}
        </Button>
        <Button colorScheme="primary" variant="subtle" size="sm" onClick={handleResetVotes}>
          Sıfırla
        </Button>
      </Show>
    </HStack>
  );
};

export default AdminAuthorizedButtons;
