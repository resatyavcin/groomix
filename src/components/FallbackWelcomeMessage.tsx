import { VStack, Skeleton } from "@hope-ui/solid";

const FallbackWelcomeMessage = () => {
  return (
    <VStack alignItems="stretch" spacing="$2">
      <Skeleton height="10px" width="100%" />
      <Skeleton height="10px" width="100%" />
    </VStack>
  );
};

export default FallbackWelcomeMessage;
