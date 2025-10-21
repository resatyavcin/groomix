import AdminAuthorizedButtons from "../components/AdminAuthorizedButtons";
import WelcomeMessage from "../components/WelcomeMessage";

export default function LayoutForRoomPage(props: any) {
  return (
    <div class="min-h-screen flex flex-col">
      <div class="px-12 py-6 self-end">
        <WelcomeMessage />
        <AdminAuthorizedButtons />
      </div>

      {props.children}
    </div>
  );
}
