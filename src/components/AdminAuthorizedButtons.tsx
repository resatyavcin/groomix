import { HStack, Button } from '@hope-ui/solid';
import { Show } from 'solid-js';
import { useAppStore } from '../store';

const AdminAuthorizedButtons = () => {
  const [state] = useAppStore();
  const handleShowVotes = () => {
    // Göster butonuna tıklanınca yapılacak işlemler
  };

  const handleResetVotes = () => {
    // Sıfırla butonuna tıklanınca yapılacak işlemler
  };
  return (
    <HStack spacing="$4">
      <Show when={state.user?.isAdmin}>
        <Button colorScheme="primary" size="sm" onClick={handleShowVotes}>
          Göster
        </Button>
        <Button colorScheme="primary" variant="subtle" size="sm" onClick={handleResetVotes}>
          Sıfırla
        </Button>
      </Show>
    </HStack>
  );
};

export default AdminAuthorizedButtons;
