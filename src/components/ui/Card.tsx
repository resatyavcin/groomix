import { createSignal } from "solid-js";
import { Box, Center } from "@hope-ui/solid";
const Card = (props: { value: number }) => {
  const [isActive, setIsActive] = createSignal(false);

  const toggle = () => {
    setIsActive(!isActive());
  };
  return (
    <div class="flex items-center justify-center rounded-sm basis-20 h-28 font-bold hover:cursor-pointer bg-blue-400">
      {props.value}
    </div>
  );
};

export default Card;
