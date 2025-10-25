import { createSignal } from 'solid-js';
import GenericFormComponent from '../components/GenericFormComponent';
import { Center } from '@hope-ui/solid';
import { useNavigate, useParams } from '@solidjs/router';
import type { Room, User } from '../store/appStore';
import { useAppStore } from '../store';

const JoinPage = () => {
  const [state, { setRoom, setUser }] = useAppStore();
  const [userName, setUserName] = createSignal('');

  const navigate = useNavigate();
  const params = useParams();
  const handleRouteToRoom = (id: string | undefined) => {
    if (id) navigate(`/room/${id}`);
    else navigate('create-room');
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!params.id) return;
    const newDate = new Date();
    const newUserId = crypto.randomUUID();
    const newDeviceId = crypto.randomUUID();

    const joinRoom: Room = { id: params.id };
    const newUser: User = {
      id: state.user?.id ?? newUserId,
      name: userName(),
      isAdmin: false,
      deviceId: state.user?.deviceId ?? newDeviceId,
      createdAt: newDate,
    };

    setRoom(joinRoom);
    setUser(newUser);
    handleRouteToRoom(params.id);
  };

  const handleUserNameOnChange = (e: any) => {
    setUserName(e.target.value);
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
        ]}
        buttonText="Gönder"
        onSubmit={handleSubmit}
      />
    </Center>
  );
};

export default JoinPage;
