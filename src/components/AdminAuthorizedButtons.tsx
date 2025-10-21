import { HStack, Button } from "@hope-ui/solid";

const AdminAuthorizedButtons = () => {
  const handleShowVotes = () => {
    // Göster butonuna tıklanınca yapılacak işlemler
  };

  const handleResetVotes = () => {
    // Sıfırla butonuna tıklanınca yapılacak işlemler
  };
  return (
    <HStack spacing="$4">
      <Button colorScheme="primary" size="sm" onClick={handleShowVotes}>
        Göster
      </Button>
      <Button
        colorScheme="primary"
        variant="subtle"
        size="sm"
        onClick={handleResetVotes}
      >
        Sıfırla
      </Button>
    </HStack>
  );
};

export default AdminAuthorizedButtons;
