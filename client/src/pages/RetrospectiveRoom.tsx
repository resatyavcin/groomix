import { createSignal, For } from 'solid-js';
import TextareaBlockComponent from '@/components/TextAreaBlockComponent';
import RetrospectiveCardList from '@/components/RetrospectiveCardListComponent';

const RetrospectiveRoom = () => {
  const [goodThings, setGoodThings] = createSignal<(string | { type: 'gif'; url: string })[]>([]);
  const [actions, setActions] = createSignal<(string | { type: 'gif'; url: string })[]>([]);
  const [improvements, setImprovements] = createSignal<(string | { type: 'gif'; url: string })[]>([]);

  const [inputValues, setInputValues] = createSignal({
    good: '',
    action: '',
    improve: '',
  });

  const handleChange = (key: string, value: string) => {
    setInputValues({ ...inputValues(), [key]: value });
  };

  const handleSend = (key: string) => {
    console.log('handleSend tetiklendi');
    const val = inputValues()[key as keyof ReturnType<typeof inputValues>].trim();
    if (!val) return;

    if (key === 'good') setGoodThings([...goodThings(), val]);
    if (key === 'action') setActions([...actions(), val]);
    if (key === 'improve') setImprovements([...improvements(), val]);

    setInputValues({ ...inputValues(), [key]: '' });
  };

  const handleGifSelect = (key: string, gifUrl: string) => {
    const gifItem = { type: 'gif' as const, url: gifUrl };

    if (key === 'good') setGoodThings([...goodThings(), gifItem]);
    if (key === 'action') setActions([...actions(), gifItem]);
    if (key === 'improve') setImprovements([...improvements(), gifItem]);
  };

  type RetrospectiveColumnType = {
    title: string;
    keyName: 'good' | 'action' | 'improve';
    value: string;
    items: (string | { type: 'gif'; url: string })[];
  };

  const RetrospectiveColumn: RetrospectiveColumnType[] = [
    {
      title: 'Neleri İyi Yaptık',
      keyName: 'good',
      value: inputValues().good,
      items: goodThings(),
    },
    {
      title: 'Neleri Geliştirebiliriz',
      keyName: 'improve',
      value: inputValues().improve,
      items: improvements(),
    },
    {
      title: 'Aksiyonlar',
      keyName: 'action',
      value: inputValues().action,
      items: actions(),
    },
  ];

  return (
    <div class="p-4 grid grid-cols-1 md:grid-cols-3 gap-6 bg-white">
      <For each={RetrospectiveColumn}>
        {(col: RetrospectiveColumnType) => (
          <div>
            <TextareaBlockComponent
              title={col.title}
              keyName={col.keyName}
              value={col.value}
              onChange={handleChange}
              onSend={handleSend}
              onGifSelect={handleGifSelect}
            />
            <RetrospectiveCardList items={col.items} />
          </div>
        )}
      </For>
    </div>
  );
};

export default RetrospectiveRoom;
