import type { GroomingCardContentType } from '../../constants/GroomingCardContentList';
import { SOCKET_EVENTS } from '../socketEvents';
import { emitEvent } from '../socketService';
import { useAppStore } from '../store';

const GroomingCard = (props: GroomingCardContentType) => {
  const [state, { setUser }] = useAppStore();

  const handleGroomingCard = () => {
    if (!state.user) return;
    const current = state.user.selectedScore ?? { scoreId: null, score: null };
    const next =
      current.scoreId === props.scoreId
        ? { scoreId: null, score: null }
        : { scoreId: props.scoreId, score: props.score };

    setUser({ ...state.user, selectedScore: next });
    emitEvent(SOCKET_EVENTS.SEND_SCORE, { ...next, userId: state.user.id });
  };

  const isActive = () => state.user?.selectedScore?.scoreId === props.scoreId;

  return (
    <div
      onClick={handleGroomingCard}
      class={`flex items-center justify-center rounded-sm basis-20 h-28 font-bold hover:cursor-pointer 
        ${isActive() ? 'bg-gray-800 text-gray-50' : 'bg-gray-50 text-gray-800'} border! border-gray-200`}
    >
      {props.scoreComponent}
    </div>
  );
};

export default GroomingCard;
