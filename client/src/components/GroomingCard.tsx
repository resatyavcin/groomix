import { createMemo } from 'solid-js';
import type { GroomingCardContentType } from '@/constants/GroomingCardContentList';
import { SOCKET_EVENTS } from '@/socketEvents';
import { emitEvent } from '@/socketService';
import { useAppStore } from '@/store';

const DEFAULT_SCORE = { scoreId: null, score: null };

const GroomingCard = ({ scoreId, score, scoreComponent }: GroomingCardContentType) => {
  const [state, { setUser }] = useAppStore();

  const currentScore = () => state.user?.selectedScore;
  const isActive = createMemo(() => currentScore()?.scoreId === scoreId);

  const toggleScore = (currentScoreId: number | null) => {
    return currentScoreId === scoreId ? DEFAULT_SCORE : { scoreId, score };
  };

  const handleGroomingCard = () => {
    if (!state.user) return;

    const nextScore = toggleScore(currentScore()?.scoreId ?? null);

    setUser({ ...state.user, selectedScore: nextScore });
    emitEvent(SOCKET_EVENTS.SEND_SCORE, { ...nextScore, userId: state.user.id });
  };

  const cardStyles = createMemo(() => {
    const baseStyles = 'flex items-center justify-center rounded-sm basis-20 h-28 font-bold hover:cursor-pointer border! border-gray-200';
    const themeStyles = isActive() ? 'bg-gray-800 text-gray-50' : 'bg-gray-50 text-gray-800';
    return `${baseStyles} ${themeStyles}`;
  });

  return (
    <div onClick={handleGroomingCard} class={cardStyles()}>
      {scoreComponent()}
    </div>
  );
};

export default GroomingCard;
