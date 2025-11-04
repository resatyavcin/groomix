import { X } from 'lucide-solid';
import { createSignal, JSX, Show } from 'solid-js';
import { GiphyGif } from '../../types/gif';

interface Props {
  show: boolean;
  onClose: () => void;
  onSelect: (url: string) => void;
}

export default function GifSearchModal(props: Props): JSX.Element {
  const GIPHY_API_KEY = import.meta.env.VITE_GIPHY_API_KEY;
  const [query, setQuery] = createSignal('');
  const [results, setResults] = createSignal<GiphyGif[]>([]);
  const [isSearching, setIsSearching] = createSignal(false);

  const searchGifs = async () => {
    const searchQuery = query().trim();
    if (!searchQuery) return;

    setIsSearching(true);
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${encodeURIComponent(searchQuery)}&limit=9`
      );
      const data = await response.json();
      setResults(data.data || []);
    } catch (error) {
      console.error('GIF arama hatası:', error);
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleClose = () => {
    setQuery('');
    setResults([]);
    props.onClose();
  };

  const handleSelect = (url: string) => {
    props.onSelect(url);
    handleClose();
  };

  return (
    <Show when={props.show}>
      <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={handleClose}>
        <div class="bg-white rounded-lg p-4 w-96 max-w-[90vw] relative" onClick={(e) => e.stopPropagation()}>
          <button
            class="absolute top-2 right-2 text-gray-600 hover:text-black transition"
            onClick={handleClose}
            aria-label="Modalı kapat"
          >
            <X size={18} />
          </button>

          <h3 class="font-semibold text-lg mb-3">GIF Ara</h3>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              searchGifs();
            }}
            class="flex flex-col gap-2"
          >
            <input
              type="text"
              value={query()}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="GIF ara..."
              class="border border-gray-300 p-2 rounded w-full focus:outline-none focus:border-blue-500 transition"
            />
            <button
              type="submit"
              class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded w-full transition disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!query().trim() || isSearching()}
            >
              {isSearching() ? 'Aranıyor...' : 'Ara'}
            </button>
          </form>

          <Show when={results().length > 0}>
            <div class="grid grid-cols-3 gap-2 mt-4 max-h-64 overflow-y-auto">
              {results().map((gif) => (
                <img
                  src={gif.images.fixed_height.url}
                  alt={gif.title}
                  class="rounded cursor-pointer hover:opacity-80 hover:scale-105 transition"
                  onClick={() => handleSelect(gif.images.fixed_height.url)}
                />
              ))}
            </div>
          </Show>

          <Show when={!isSearching() && query().trim() && results().length === 0}>
            <p class="text-center text-gray-500 mt-4">Sonuç bulunamadı</p>
          </Show>
        </div>
      </div>
    </Show>
  );
}
