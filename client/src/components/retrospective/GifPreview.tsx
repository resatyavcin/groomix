import { X } from 'lucide-solid';
import { JSX, Show } from 'solid-js';

interface Props {
  gifUrl: string | null;
  onRemove: () => void;
}

export default function GifPreview(props: Props): JSX.Element {
  return (
    <Show when={props.gifUrl}>
      <div class="w-full flex justify-center">
        <div class="relative">
          <img src={props.gifUrl!} alt="Seçilen GIF" class="max-h-32 rounded object-contain" />
          <button
            class="absolute top-1 right-1 bg-white/70 hover:bg-white text-black rounded-full p-1 transition"
            onClick={props.onRemove}
            title="GIF'i kaldır"
            aria-label="GIF'i kaldır"
          >
            <X size={14} />
          </button>
        </div>
      </div>
    </Show>
  );
}
