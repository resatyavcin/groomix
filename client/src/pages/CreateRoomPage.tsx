import { createSignal, createMemo } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { Center } from '@hope-ui/solid';
import { Github as GithubIcon } from 'lucide-solid';

import GenericFormComponent from '@/components/ReusableInputFormComponent';
import { useAppStore } from '@/store';
import type { Room, User } from '@/store/appStore';
import { ROOM_TYPE } from '@/constants/RoomType';

type RoomType = 'planning' | 'retrospective';

const DEFAULT_SCORE = { score: null, scoreId: null };

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
      <div class="flex justify-between items-center w-100 gap-3 min-h-36">
        <button
          class={`border! flex-1 h-full p-4 rounded-md text-lg! cursor-pointer transition-all ${roomType() === ROOM_TYPE.PLANNING ? 'bg-blue-50 border-blue-400! text-blue-400' : 'bg-gray-100 border-gray-200!'}`}
          onClick={() => setRoomType('planning')}
        >
          Planning
        </button>
        <button
          class={`border! flex-1 h-full p-4 rounded-md text-lg! cursor-pointer transition-all relative flex items-center justify-center ${roomType() === ROOM_TYPE.RETROSPECTIVE ? 'bg-blue-50 border-blue-400! text-blue-400' : 'bg-gray-100 border-gray-200!'}`}
          onClick={() => setRoomType('retrospective')}
        >
          <span class="absolute top-2 left-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded">
            Beta
          </span>
          Retrospective
        </button>
      </div>

      <GenericFormComponent
        fields={formFields()}
        buttonText="Odayı Oluştur"
        onSubmit={handleSubmit}
      />

      <div class="flex gap-3 mt-6">
        <a
          href="https://github.com/resatyavcin/groomix/issues/new?title=Retrospective%20Feature%20Feedback"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-gray-800 hover:bg-gray-900 text-white font-bold py-2 px-4 rounded-md flex items-center gap-2"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <GithubIcon size={18} />
          Report Issue
        </a>
        <a
          href="https://github.com/resatyavcin/groomix"
          target="_blank"
          rel="noopener noreferrer"
          class="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-md flex items-center gap-2"
          style={{ transition: "background-color 0.3s ease" }}
        >
          <GithubIcon size={18} />
          Star
        </a>
      </div>
    </Center>
  );
};

export default CreateRoomPage;
