import { For } from 'solid-js';
import { GroomingCardContentList } from '@/constants/GroomingCardContentList';
import GroomingCard from '@/components/GroomingCard';

const GroomingCardList = () => {
  return (
    <div class="flex justify-center flex-wrap gap-4">
      <For each={GroomingCardContentList}>
        {(content) => <GroomingCard {...content} />}
      </For>
    </div>
  );
};

export default GroomingCardList;
