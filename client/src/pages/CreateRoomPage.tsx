import { createSignal, createMemo, type Component } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Center, RadioGroup, Radio } from '@hope-ui/solid';

import GenericFormComponent from '@/components/ReusableInputFormComponent';
import { useAppStore } from '@/store';
import type { Room, User } from '@/store/appStore';
import { ROOM_TYPE } from '@/constants/RoomType';

type RoomType = 'planning' | 'retrospective';

const DEFAULT_SCORE = { score: null, scoreId: null };

interface RoomTypeRadioProps {
  value: RoomType;
  label: string;
  isActive: boolean;
  onChange: (e: InputEvent) => void;
}

const RoomTypeRadio: Component<RoomTypeRadioProps> = ({ value, label, isActive, onChange }) => {
  const radioStyles = createMemo(() => {
    const baseStyles = 'border! flex-1 h-full p-4 rounded-md text-lg!';
    const activeStyles = 'bg-blue-50 border-blue-400! text-blue-400';
    const inactiveStyles = 'bg-gray-100 border-gray-200!';
    return `${baseStyles} ${isActive ? activeStyles : inactiveStyles}`;
  });

  return (
    <Radio onChange={onChange} value={value} class={radioStyles()}>
      {label}
    </Radio>
  );
};

const CreateRoomPage = () => {
  const [state, actions] = useAppStore();
  const navigate = useNavigate();

  const [userName, setUserName] = createSignal('');
  const [roomName, setRoomName] = createSignal('');
  const [roomType, setRoomType] = createSignal<RoomType>('planning');

  const createNewRoom = (): Room => ({
    id: crypto.randomUUID(),
    name: roomName(),
    createdAt: new Date(),
    isPublicVote: false,
    type: roomType(),
  });

  const createNewUser = (): User => ({
    ...state.user,
    id: crypto.randomUUID(),
    name: userName(),
    isAdmin: true,
    createdAt: new Date(),
    deviceId: state.user?.deviceId ?? crypto.randomUUID(),
    selectedScore: DEFAULT_SCORE,
  });

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();

    const newRoom = createNewRoom();
    const newUser = createNewUser();

    actions.setRoom(newRoom);
    actions.setUser(newUser);

    navigate(`/room/${newRoom.id}?type=${roomType()}`);
  };

  const handleRoomTypeChange = (e: InputEvent) => {
    const value = (e.target as HTMLInputElement).value as RoomType;
    setRoomType(value);
  };

  const formFields = createMemo(() => [
    {
      id: 'user-name',
      label: 'Kullanıcı Adı',
      value: userName(),
      onChange: (e: InputEvent) => setUserName((e.target as HTMLInputElement).value),
      type: 'text' as const,
      required: true,
    },
    {
      id: 'room-name',
      label: 'Oda Adı',
      value: roomName(),
      type: 'text' as const,
      helperText: 'Oda adınızı giriniz',
      required: true,
      onChange: (e: InputEvent) => setRoomName((e.target as HTMLInputElement).value),
    },
  ]);

  return (
    <Center class="h-screen flex flex-col justify-center items-center">
      <RadioGroup
        class="flex justify-between items-center w-100 gap-3 min-h-36"
        defaultValue="planning"
      >
        <RoomTypeRadio
          value="planning"
          label="Planning"
          isActive={roomType() === ROOM_TYPE.PLANNING}
          onChange={handleRoomTypeChange}
        />
        <RoomTypeRadio
          value="retrospective"
          label="Retrospective"
          isActive={roomType() === ROOM_TYPE.RETROSPECTIVE}
          onChange={handleRoomTypeChange}
        />
      </RadioGroup>

      <GenericFormComponent
        fields={formFields()}
        buttonText="Odayı Oluştur"
        onSubmit={handleSubmit}
      />
    </Center>
  );
};

export default CreateRoomPage;
