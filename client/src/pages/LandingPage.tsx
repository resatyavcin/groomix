import { Box, Button, Center, Heading, Text } from '@hope-ui/solid';
import { useNavigate } from '@solidjs/router';

export default function LandingPage() {
  const navigate = useNavigate();

  const handleRouteToCreateRoom = () => {
    navigate('/create-room');
  };

  return (
    <Center class="h-screen flex justify-center items-center">
      <Box w="400px">
        <Heading size="xl">Hoş Geldiniz</Heading>

        <Text>
          Beta sürümündeyiz ve şu an tamamen <strong>Ücretsiz!</strong> Bu sürümde yeni özellikleri test edebilirsiniz.
        </Text>

        <Button w="100%" colorScheme="accent" mt="$4" onClick={handleRouteToCreateRoom}>
          Oda Oluştur
        </Button>
      </Box>
    </Center>
  );
}
