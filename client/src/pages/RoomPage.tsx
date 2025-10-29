import { onMount, Show } from 'solid-js';
import { useNavigate, useParams } from '@solidjs/router';

//components
import GroomingCardList from '../components/GroomingCardList';
import OnlineUserList from '../components/OnlineUserList';
import ResultChart from '../components/ResultChart';

import { Crown } from 'lucide-solid';
import { Heading } from '@hope-ui/solid';
import { useAppStore } from '../store';
import type { CalculateScore, User } from '../store/appStore';
import { useSocket, type SocketHandlers } from '../hooks/useSocket';

const RoomPage = () => {
  const [state, { setOnlineUsers, setUser, updateUserScore, setRoom, setCalculateScore }] = useAppStore();
  const navigate = useNavigate();
  const params = useParams();

  onMount(() => {
    const user = state.user;
    const room = state.room;
    if (!user || params.id !== state.room?.id) {
      navigate(`/join/${params.id}`);
    }
    if (state.room) setRoom({ ...state.room, isPublicVote: false });

    const setHandlers: SocketHandlers = {
      onUsers: (users: User[]) => {
        setOnlineUsers(users);
      },
      onScoreUpdate: (data: { user: User; calculateScore: CalculateScore }) => {
        if (!data.user) return;
        setCalculateScore(data?.calculateScore);
        updateUserScore(data.user);
      },
      onIsReset: (data: boolean) => {
        if (data && state.user) {
          setUser({ ...state.user, selectedScore: { score: null, scoreId: null } });
        }
      },
      onShowAllScores(data: boolean) {
        if (state.room) setRoom({ ...state.room, isPublicVote: data });
      },
    };
    if (user && room) useSocket({ user, room, setHandlers });
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
              <Heading size="4xl" class="text-center flex font-bold">
                <Crown color="#c97908" /> {state.calculateScore?.winnerScore}
              </Heading>
            </Show>
            <ResultChart />
          </div>
        </Show>
      </div>
    </div>
  );
};

export default RoomPage;
