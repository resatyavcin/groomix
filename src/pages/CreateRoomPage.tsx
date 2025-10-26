import { createSignal } from 'solid-js';
import GenericFormComponent from '../components/GenericFormComponent';
import { Center } from '@hope-ui/solid';
import { useAppStore } from '../store';
import type { Room, User } from '../store/appStore';
import { useNavigate } from '@solidjs/router';

const CreateRoomPage = () => {
  const [state, { setRoom, setUser }] = useAppStore();
  const [userName, setUserName] = createSignal('');
  const [roomName, setRoomName] = createSignal('');
  const navigate = useNavigate();

  const handleRouteToRoom = (id: string) => {
    navigate(`/room/${id}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUserId = crypto.randomUUID();
    const newRoomId = crypto.randomUUID();
    const newDeviceId = crypto.randomUUID();
    const newDate = new Date();
    const newRoom: Room = { id: newRoomId, name: roomName(), createdAt: newDate };
    const newUser: User = {
      ...state.user,
      id: newUserId,
      name: userName(),
      isAdmin: true,
      createdAt: newDate,
      deviceId: state.user?.deviceId ?? newDeviceId,
    };

    setRoom(newRoom);
    setUser(newUser);
    handleRouteToRoom(newRoomId);
  };

  const handleUserNameOnChange = (e: any) => {
    setUserName(e.target.value);
  };

  const handleRoomNameOnChange = (e: any) => {
    setRoomName(e.target.value);
  };

  return (
    <Center class="h-screen flex justify-center items-center">
      <GenericFormComponent
        fields={[
          {
            id: 'user-name',
            label: 'Kullanıcı Adı',
            value: userName(),
            onChange: handleUserNameOnChange,
            type: 'text',
            required: true,
          },
          {
            id: 'room-name',
            label: 'Oda Adı',
            value: roomName(),
            type: 'text',
            helperText: 'Oda adınızı giriniz',
            required: true,
            onChange: handleRoomNameOnChange,
          },
        ]}
        buttonText="Gönder"
        onSubmit={handleSubmit}
      />
    </Center>
  );
};

export default CreateRoomPage;
