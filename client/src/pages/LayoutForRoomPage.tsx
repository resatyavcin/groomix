import AdminAuthorizedButtons from '@/components/AdminAuthorizedButtons';
import WelcomeMessage from '@/components/WelcomeMessage';

export default function LayoutForRoomPage(props: any) {
  //TODO: Burada roomtype a göre değişecek aksiyonlar olacak.
  return (
    <div class="min-h-screen flex flex-col">
      <div class="flex flex-col gap-3 py-6 self-end">
        <WelcomeMessage />
        <AdminAuthorizedButtons />
      </div>
      {props.children}
    </div>
  );
}
