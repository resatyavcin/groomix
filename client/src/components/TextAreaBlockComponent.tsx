import { ArrowUpFromLine, ImagePlay, X } from 'lucide-solid';
import { createSignal, JSX, Show } from 'solid-js';

interface Props {
  title: string;
  keyName: 'good' | 'action' | 'improve';
  value: string;
  onChange: (key: 'good' | 'action' | 'improve', value: string) => void;
  onSend: (key: 'good' | 'action' | 'improve', payload?: { text?: string; gif?: string }) => void;
}

export default function TextAreaBlockComponent(props: Props): JSX.Element {
  const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal<any[]>([]);
  const [showGifModal, setShowGifModal] = createSignal(false);
  const [selectedGif, setSelectedGif] = createSignal<string | null>(null);

  const searchGifs = async () => {
    if (!query()) return;
    const res = await fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(query())}&limit=9`
    );
    const data = await res.json();
    setResults(data.data);
  };

  const handleGifSelect = (url: string) => {
    setSelectedGif(url);
    setShowGifModal(false);
  };

  const handleSendClick = () => {
    const text = props.value.trim();
    const gif = selectedGif() || undefined;
    if (!text && !gif) return;

    props.onSend(props.keyName, { text, gif });
    setSelectedGif(null);
  };

  return (
    <div class="relative flex flex-col">
      <h2 class="font-bold text-xl mb-2">{props.title}</h2>

      <div class="relative">
        <div class="w-full bg-gray-50 border rounded p-2 flex flex-col gap-2">
          <Show when={selectedGif()}>
            <div class="w-full flex justify-center">
              <div class="relative">
                <img src={selectedGif()!} alt="selected gif" class="max-h-32 rounded object-contain" />
                <button
                  class="absolute top-1 right-1 bg-white/70 hover:bg-white text-black rounded-full p-1"
                  onClick={() => setSelectedGif(null)}
                >
                  <X size={14} />
                </button>
              </div>
            </div>
          </Show>

          <textarea
            class="w-full bg-transparent resize-none overflow-y-auto text-sm focus:outline-none h-32"
            placeholder="Yaz..."
            value={props.value}
            onInput={(e) => props.onChange(props.keyName, e.currentTarget.value)}
          />
        </div>

        <button
          class="absolute bottom-2 right-12 bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full shadow transition flex items-center justify-center"
          onClick={() => setShowGifModal(true)}
          title="GIF ekle"
        >
          <ImagePlay size={16} color="#ffffff" />
        </button>

        <button
          class="absolute bottom-2 right-2 bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full shadow transition flex items-center justify-center"
          onClick={handleSendClick}
        >
          <ArrowUpFromLine size={16} color="#ffffff" />
        </button>
      </div>

      <Show when={showGifModal()}>
        <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg p-4 w-96 relative">
            <button
              class="absolute top-2 right-2 text-gray-600 hover:text-black"
              onClick={() => setShowGifModal(false)}
            >
              <X size={18} />
            </button>

            <input
              type="text"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="GIF ara..."
              class="border p-2 rounded w-full"
            />
            <button class="bg-blue-500 text-white px-4 py-2 mt-2 rounded w-full" onClick={searchGifs}>
              Ara
            </button>

            <div class="grid grid-cols-3 gap-2 mt-4 max-h-64 overflow-y-auto">
              {results().map((gif) => (
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  class="rounded cursor-pointer hover:opacity-80 transition"
                  onClick={() => handleGifSelect(gif.images.fixed_height.url)}
                />
              ))}
            </div>
          </div>
        </div>
      </Show>
    </div>
  );
}
