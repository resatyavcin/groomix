import { JSX, For } from 'solid-js';

interface GifItem {
  type: 'gif';
  url: string;
}

interface Props {
  items: (string | GifItem)[];
}

export default function RetrospectiveCardListComponent(props: Props): JSX.Element {
  return (
    <div class="mt-2! flex flex-col gap-3">
      <For each={props.items}>
        {(item) => {
          if (typeof item === 'string') {
            // Satırlara göre ayır (text ve gif URL)
            const lines = item
              .split('\n')
              .map((l) => l.trim())
              .filter(Boolean);
            const text = lines.find((l) => !l.startsWith('http'));
            const gifUrl = lines.find((l) => l.startsWith('http'));

            return (
              <div class="p-3 border! border-gray-100 rounded-md bg-blue-50 whitespace-pre-wrap break-words text-sm leading-snug">
                {text && <p class="mb-2">{text}</p>}
                {gifUrl && (
                  <div class="flex justify-center">
                    <img src={gifUrl} alt="gif" class="max-h-40 rounded object-contain" loading="lazy" />
                  </div>
                )}
              </div>
            );
          }

          return (
            <div class="p-2 border rounded-md shadow-sm bg-gray-50 flex justify-center items-center">
              <img src={item.url} alt="GIF" class="max-h-40 rounded object-contain" loading="lazy" />
            </div>
          );
        }}
      </For>
    </div>
  );
}
