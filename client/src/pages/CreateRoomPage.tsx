import { createSignal } from 'solid-js';
import GenericFormComponent from '../components/GenericFormComponent';
import { Center, RadioGroup, Radio } from '@hope-ui/solid';
import { useAppStore } from '../store';
import type { Room, User } from '../store/appStore';
import { useNavigate } from '@solidjs/router';

const CreateRoomPage = () => {
  const [state, { setRoom, setUser }] = useAppStore();
  const [userName, setUserName] = createSignal('');
  const [roomName, setRoomName] = createSignal('');
  const [appType, setAppType] = createSignal<{ type: 'planning' | 'retrospective' }>({ type: 'planning' });
  const navigate = useNavigate();

  const handleRouteToRoom = (id: string) => {
    navigate(`/room/${id}?type=${appType().type}`);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const newUserId = crypto.randomUUID();
    const newRoomId = crypto.randomUUID();
    const newDeviceId = crypto.randomUUID();
    const newDate = new Date();
    const newRoom: Room = {
      id: newRoomId,
      name: roomName(),
      createdAt: newDate,
      isPublicVote: false,
      type: appType().type,
    };
    const newUser: User = {
      ...state.user,
      id: newUserId,
      name: userName(),
      isAdmin: true,
      createdAt: newDate,
      deviceId: state.user?.deviceId ?? newDeviceId,
      selectedScore: { score: null, scoreId: null },
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

  const handleRadioButton = (e: any) => {
    const value: 'planning' | 'retrospective' = e.target.value;
    setAppType({ type: value });
  };

  //TODO:RadioGroup DefaultCheck Sync değil state ile
  return (
    <Center class="h-screen flex flex-col justify-center items-center">
      <RadioGroup class="flex justify-between items-center w-100 gap-3 min-h-36" defaultValue="planning">
        <Radio
          onChange={handleRadioButton}
          value="planning"
          class={`border! ${appType().type === 'planning' ? 'bg-blue-50 border-blue-400! text-blue-400' : 'bg-gray-100 border-gray-200!'} flex-1 h-full p-4 rounded-md text-lg!`}
        >
          Planning
        </Radio>
        <Radio
          onChange={handleRadioButton}
          value="retrospective"
          class={`border! ${appType().type === 'retrospective' ? 'bg-blue-50 border-blue-400! text-blue-400' : 'bg-gray-100 border-gray-200!'} flex-1 h-full p-4 rounded-md text-lg!`}
        >
          Retrospective
        </Radio>
      </RadioGroup>
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
        buttonText="Odayı Oluştur"
        onSubmit={handleSubmit}
      />
    </Center>
  );
};

export default CreateRoomPage;
