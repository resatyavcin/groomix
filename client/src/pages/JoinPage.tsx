import { createSignal } from 'solid-js';
import GenericFormComponent from '../components/ReusableInputFormComponent';
import { Center } from '@hope-ui/solid';
import { useLocation, useNavigate, useParams } from '@solidjs/router';
import type { Room, User } from '../store/appStore';
import { useAppStore } from '../store';

const JoinPage = () => {
  const [state, { setRoom, setUser }] = useAppStore();
  const [userName, setUserName] = createSignal('');

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!params.id) return;

    const roomType = (location.query.type as Room['type']) || 'planning';
    const newDate = new Date();
    const newUserId = crypto.randomUUID();
    const newDeviceId = crypto.randomUUID();

    //TODO: 'isPublicVote' alanı güncel olarak ne ise o alınmalıdır. Şimdilik false geçildi.
    const joinRoom: Room = { id: params.id, type: roomType, isPublicVote: false };
    const newUser: User = {
      id: state.user?.id ?? newUserId,
      name: userName(),
      isAdmin: false,
      deviceId: state.user?.deviceId ?? newDeviceId,
      createdAt: newDate,
      selectedScore: { score: null, scoreId: null },
    };

    setUser(newUser);
    setRoom(joinRoom);
    navigate(`/room/${params.id}?type=${roomType}`);
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
