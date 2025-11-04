import { JSX, For } from 'solid-js';
import RetrospectiveTextCard from '@/components/retrospective/RetrospectiveTextCard';
import RetrospectiveGifCard from '@/components/retrospective/RetrospectiveGifCard';
import { RetrospectiveItem } from '@/types';

interface Props {
  items: RetrospectiveItem[];
}

export default function RetrospectiveCardList(props: Props): JSX.Element {
  return (
    <div class="mt-2 flex flex-col gap-3">
      <For each={props.items}>
        {(item) => {
          if (typeof item === 'string') {
            return <RetrospectiveTextCard text={item} />;
          }

          if (item.text) {
            return (
              <div class="p-3 border border-gray-100 rounded-md bg-blue-50 flex flex-col gap-2">
                <p class="whitespace-pre-wrap wrap-break-word text-sm leading-snug">{item.text}</p>
                <div class="flex justify-center">
                  <img src={item.url} alt="GIF" class="max-h-40 rounded object-contain" loading="lazy" />
                </div>
              </div>
            );
          }

          return <RetrospectiveGifCard url={item.url} />;
        }}
      </For>
    </div>
  );
}
