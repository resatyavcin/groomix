//components
import TooltipForBadgeColorGrouping from "../components/TooltipForBadgeColorGrouping";
import { Heading } from "@hope-ui/solid";
import { Tag } from "@hope-ui/solid";
import Card from "../components/ui/Card";

const Room = () => {
  return (
    <div class="flex flex-col items-center gap-y-6 ">
      <TooltipForBadgeColorGrouping />
      <Heading size="4xl">TEXAS Groomix Planlama</Heading>

      <div class="flex flex-wrap gap-4 justify-center mt-6">
        <Tag variant="solid" dotPlacement="start" colorScheme="success">
          Reşat Yavçin
        </Tag>
        <Tag variant="dot" dotPlacement="start" colorScheme="success">
          Reşat Yavçin
        </Tag>
        <Tag variant="dot" dotPlacement="start" colorScheme="success">
          Reşat Yavçin
        </Tag>
        <Tag variant="dot" dotPlacement="start" colorScheme="success">
          Reşat Yavçin
        </Tag>
        <Tag variant="solid" dotPlacement="start" colorScheme="neutral">
          Reşat Yavçin
        </Tag>
        <Tag variant="dot" dotPlacement="start" colorScheme="success">
          Reşat Yavçin
        </Tag>
      </div>

      <div class="flex items-center justify-center flex-wrap  gap-4 w-2/6">
        {Array.from({ length: 9 }).map((_, i) => (
          <Card value={i + 1} />
        ))}
      </div>
    </div>
  );
};

export default Room;
