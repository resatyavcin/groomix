import { Button, FormControl, FormLabel, FormHelperText, Input, Flex, Center, Box } from '@hope-ui/solid';

const CreateRoom = () => {
  return (
    <div style={{ height: '100vh' }}>
      <Box w="400px" mx="auto" my="auto">
        <Flex color="white" direction="column" gap="$4" mb="$4" mt="$4">
          <Center w="400px">
            <FormControl required>
              <FormLabel for="email">Adınız</FormLabel>
              <Input id="email" type="email" />
              <FormHelperText>Takım arkadaşlarınız da isminizi görebilecekler.</FormHelperText>
            </FormControl>
          </Center>
          <Center w="400px">
            <Button colorScheme="accent" style={{ width: '100%' }}>
              Oda Oluştur
            </Button>
          </Center>
        </Flex>
      </Box>
    </div>
  );
};

export default CreateRoom;
