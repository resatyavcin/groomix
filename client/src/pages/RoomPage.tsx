import { useNavigate, useLocation } from '@solidjs/router';
import type { Room } from '@/store/appStore';
import { onMount, Show } from 'solid-js';
import { ROOM_TYPE } from '@/constants/RoomType';

//pages
import PlanningRoom from './PlanningRoom';
import RetrospectiveRoom from './RetrospectiveRoom';

const RoomPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const roomType = location.query.type as Room['type'];

  const ComponentMap = {
    [ROOM_TYPE.PLANNING]: PlanningRoom,
    [ROOM_TYPE.RETROSPECTIVE]: RetrospectiveRoom,
  } as const;

  const SelectedRoom = roomType && ComponentMap[roomType];

  const handleRouteToBack = () => {
    navigate(`/create-room`);
  };

  onMount(() => {
    if (!SelectedRoom) handleRouteToBack();
  });

  return (
    <Show when={SelectedRoom}>
      <SelectedRoom />
    </Show>
  );
};

export default RoomPage;
