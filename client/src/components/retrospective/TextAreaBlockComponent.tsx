import { ArrowUpFromLine, ImagePlay } from 'lucide-solid';
import { createSignal, JSX } from 'solid-js';
import GifPreview from './GifPreview';
import GifSearchModal from './GifSearchModal';

interface Props {
  title: string;
  keyName: 'good' | 'action' | 'improve';
  value: string;
  onChange: (key: 'good' | 'action' | 'improve', value: string) => void;
  onSend: (key: 'good' | 'action' | 'improve', payload?: { text?: string; gif?: string }) => void;
}

export default function TextAreaBlockComponent(props: Props): JSX.Element {
  const [showGifModal, setShowGifModal] = createSignal(false);
  const [selectedGif, setSelectedGif] = createSignal<string | null>(null);

  const handleGifSelect = (url: string) => {
    setSelectedGif(url);
  };

  const handleGifRemove = () => {
    setSelectedGif(null);
  };

  const handleSendClick = () => {
    const text = props.value.trim();
    const gif = selectedGif() || undefined;

    if (!text && !gif) return;

    props.onSend(props.keyName, { text, gif });
    setSelectedGif(null);
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendClick();
    }
  };

  return (
    <div class="relative flex flex-col">
      <h2 class="font-bold text-xl mb-2">{props.title}</h2>

      <div class="relative">
        <div class="w-full bg-gray-50 border rounded p-2 flex flex-col gap-2">
          {/* GIF Preview */}
          <GifPreview gifUrl={selectedGif()} onRemove={handleGifRemove} />

          {/* Textarea */}
          <textarea
            class="w-full bg-transparent resize-none overflow-y-auto text-sm focus:outline-none h-32"
            placeholder="Yaz..."
            value={props.value}
            onInput={(e) => props.onChange(props.keyName, e.currentTarget.value)}
            onKeyPress={handleKeyPress}
          />
        </div>

        {/* Action Buttons */}
        <div class="absolute bottom-2 right-2 flex gap-2">
          <button
            class="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full shadow transition flex items-center justify-center"
            onClick={() => setShowGifModal(true)}
            title="GIF ekle"
            aria-label="GIF ekle"
          >
            <ImagePlay size={16} />
          </button>

          <button
            class="bg-blue-500 hover:bg-blue-600 text-white w-8 h-8 rounded-full shadow transition flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={handleSendClick}
            disabled={!props.value.trim() && !selectedGif()}
            title="Gönder"
            aria-label="Gönder"
          >
            <ArrowUpFromLine size={16} />
          </button>
        </div>
      </div>

      {/* GIF Search Modal */}
      <GifSearchModal show={showGifModal()} onClose={() => setShowGifModal(false)} onSelect={handleGifSelect} />
    </div>
  );
}
