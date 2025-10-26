//components
import TooltipForBadgeColorGrouping from '../components/TooltipForBadgeColorGrouping';
import { Heading } from '@hope-ui/solid';
import { useAppStore } from '../store';
import { useSocket, type SocketHandlers } from '../hooks/useSocket';
import { onMount } from 'solid-js';
import type { User } from '../store/appStore';
import { useNavigate, useParams } from '@solidjs/router';
import GroomingCardList from '../components/GroomingCardList';
import OnlineUserList from '../components/OnlineUserList';

const RoomPage = () => {
  const [state, { setOnlineUsers, setUser, updateUserScore, setRoom }] = useAppStore();
  const navigate = useNavigate();
  const params = useParams();

  onMount(() => {
    const user = state.user;
    const room = state.room;
    if (!user || params.id !== state.room?.id) {
      navigate(`/join/${params.id}`);
    }
    const setHandlers: SocketHandlers = {
      onUsers: (users: User[]) => {
        setOnlineUsers(users);
      },
      onScoreUpdate: (data: { user: User }) => {
        if (!data.user) return;
        console.log(data);
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
    <div class="flex flex-col items-center gap-y-6 ">
      <TooltipForBadgeColorGrouping />
      <Heading size="4xl">Groomix Planlama</Heading>
      <OnlineUserList />
      <GroomingCardList />
    </div>
  );
};

export default RoomPage;
