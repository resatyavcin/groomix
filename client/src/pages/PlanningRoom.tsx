import { onMount, Show, type Component } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';
import { Crown } from 'lucide-solid';
import { Heading } from '@hope-ui/solid';

import GroomingCardList from '@/components/GroomingCardList';
import OnlineUserList from '@/components/OnlineUserList';
import ResultChart from '@/components/ResultChartComponent';
import { useAppStore } from '@/store';
import type { CalculateScore, User } from '@/store/appStore';
import { useSocket, type SocketHandlers } from '@/hooks/useSocket';

const DEFAULT_SCORE = { score: null, scoreId: null };

interface WinnerScoreProps {
  score: string | number;
}

const WinnerScore: Component<WinnerScoreProps> = ({ score }) => (
  <Heading size="4xl" class="text-center flex font-bold">
    <Crown color="#c97908" /> {score}
  </Heading>
);

const PlanningRoom = () => {
  const [state, actions] = useAppStore();
  const navigate = useNavigate();
  const params = useParams();

  const initializeRoom = () => {
    const { user, room } = state;

    if (!user || params.id !== room?.id) {
      navigate(`/join/${params.id}`);
      return false;
    }

    if (room) {
      actions.setRoom({ ...room, isPublicVote: false });
    }

    return true;
  };

  const createSocketHandlers = (): SocketHandlers => ({
    onUsers: (users: User[]) => actions.setOnlineUsers(users),

    onScoreUpdate: (data: { user: User; calculateScore: CalculateScore }) => {
      if (!data.user) return;
      actions.setCalculateScore(data.calculateScore);
      actions.updateUserScore(data.user);
    },

    onIsReset: (shouldReset: boolean) => {
      if (shouldReset && state.user) {
        actions.setUser({ ...state.user, selectedScore: DEFAULT_SCORE });
      }
    },

    onShowAllScores: (isPublic: boolean) => {
      if (state.room) {
        actions.setRoom({ ...state.room, isPublicVote: isPublic });
      }
    },
  });

  onMount(() => {
    const isInitialized = initializeRoom();
    const { user, room } = state;

    if (isInitialized && user && room) {
      useSocket({ user, room, setHandlers: createSocketHandlers() });
    }
  });

  return (
    <div class="flex flex-col gap-y-6 min-h-screen">
      <Heading size="4xl" class="text-center">
        Groomix Planlama
      </Heading>

      <OnlineUserList />

      <div class="flex gap-8 flex-wrap">
        <div class="flex-2">
          <GroomingCardList />
        </div>

        <Show when={state.room?.isPublicVote}>
          <div class="flex flex-col justify-center flex-1 min-w-[400px]">
            <Show when={state.calculateScore?.winnerScore}>
              {(score) => <WinnerScore score={score()} />}
            </Show>
            <ResultChart />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default PlanningRoom;
