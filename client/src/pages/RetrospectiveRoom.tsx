import { batch, createSignal, Index } from 'solid-js';
import TextareaBlockComponent from '@/components/TextAreaBlockComponent';
import RetrospectiveCardList from '@/components/retrospective/RetrospectiveCardList';

export type RetrospectiveItem =
  | string
  | {
      type: 'gif';
      url: string;
      text?: string;
    };

export type ColumnKey = 'good' | 'improve' | 'action';

interface Column {
  title: string;
  keyName: ColumnKey;
}

// Kolonları const olarak dışarıya taşı
const COLUMNS: readonly Column[] = [
  { title: 'Neleri İyi Yaptık', keyName: 'good' },
  { title: 'Neleri Geliştirebiliriz', keyName: 'improve' },
  { title: 'Aksiyonlar', keyName: 'action' },
] as const;

export default function RetrospectiveRoom() {
  const [items, setItems] = createSignal<Record<ColumnKey, RetrospectiveItem[]>>({
    good: [],
    improve: [],
    action: [],
  });

  const [inputValues, setInputValues] = createSignal<Record<ColumnKey, string>>({
    good: '',
    improve: '',
    action: '',
  });

  const handleChange = (key: ColumnKey, value: string) => {
    setInputValues((prev) => ({ ...prev, [key]: value }));
  };

  const createItem = (text?: string, gif?: string): RetrospectiveItem | null => {
    if (!text && !gif) return null;

    if (gif && text) return { type: 'gif', url: gif, text };
    if (gif) return { type: 'gif', url: gif };
    if (text) return text;
    return null;
  };

  const handleSend = (key: ColumnKey, payload?: { text?: string; gif?: string }) => {
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
    <div class="min-h-screen p-4">
      <div class="max-w-7xl mx-auto">
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
    </div>
  );
}
