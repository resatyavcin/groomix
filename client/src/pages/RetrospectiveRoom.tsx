import { batch, createSignal, Index } from 'solid-js';
import TextareaBlockComponent from '@/components/retrospective/TextAreaBlockComponent';
import RetrospectiveCardList from '@/components/retrospective/RetrospectiveCardList';
import { RetrospectiveColumn, RetrospectiveColumnKey, RetrospectiveItem } from '@/types';

const COLUMNS: readonly RetrospectiveColumn[] = [
  { title: 'Neleri İyi Yaptık', keyName: 'good' },
  { title: 'Neleri Geliştirebiliriz', keyName: 'improve' },
  { title: 'Aksiyonlar', keyName: 'action' },
] as const;

export default function RetrospectiveRoom() {
  const [items, setItems] = createSignal<Record<RetrospectiveColumnKey, RetrospectiveItem[]>>({
    good: [],
    improve: [],
    action: [],
  });

  const [inputValues, setInputValues] = createSignal<Record<RetrospectiveColumnKey, string>>({
    good: '',
    improve: '',
    action: '',
  });

  const handleChange = (key: RetrospectiveColumnKey, value: string) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const createItem = (text?: string, gif?: string): RetrospectiveItem | null => {
    if (!text && !gif) return null;

    if (gif && text) return { type: 'gif', url: gif, text };
    if (gif) return { type: 'gif', url: gif };
    if (text) return text;
    return null;
  };

  const handleSend = (key: RetrospectiveColumnKey, payload?: { text?: string; gif?: string }) => {
    const item = createItem(payload?.text?.trim(), payload?.gif);
    if (!item) return;

    batch(() => {
      setItems((prev) => ({
        ...prev,
        [key]: [...prev[key], item],
      }));
      setInputValues((prev) => ({ ...prev, [key]: '' }));
    });
  };

  return (
    <div class="min-h-screen max-w-7xl mx-auto p-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Index each={COLUMNS}>
          {(column) => {
            const key = column().keyName;
            return (
              <div class="flex flex-col h-full">
                <TextareaBlockComponent
                  title={column().title}
                  keyName={key}
                  value={inputValues()[key]}
                  onChange={handleChange}
                  onSend={handleSend}
                />
                <RetrospectiveCardList items={items()[key]} />
              </div>
            );
          }}
        </Index>
      </div>
    </div>
  );
}
